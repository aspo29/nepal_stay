// controllers/accommodationController.js
const { accommodationSchema } = require('../schema');
const Accommodation = require('../models/accommodations');
const ExpressError = require('../utils/ExpressError.js');
const wrapAsync = require("../utils/wrapAsync.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { config, geocoding } = require('@maptiler/client');
// Configure MapTiler API key and fetch
config.apiKey = process.env.MAP_KEY;
config.fetch = fetch;
// Create a new accommodation, wrapped with wrapAsync
exports.createAccommodation = wrapAsync(async (req, res) => {
    // const { error } = accommodationSchema.validate(req.body);
    // if (error) {
    //     const message = error.details.map(el => el.message).join(', ');
    //     throw new ExpressError(400, message);
    // }
    const response = await geocoding.forward(req.body.accommodation.location);
    // Get the first feature's geometry (latitude, longitude)
    const geometry = response.features[0].geometry;
    let url = req.file.path;
    let filename = req.file.filename;
    const newAccommodation = new Accommodation(req.body.accommodation);
    newAccommodation.owner = req.user._id;
    newAccommodation.image = { url, filename };
    newAccommodation.geometry = geometry;
    await newAccommodation.save();
    req.flash('success', 'New accommodation created successfully!');
    res.redirect('/accommodations/');
});

// Controller to get all accommodations
exports.getAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.render('Accommodations/accommodations', { data: accommodations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching accommodations", error });
    }
};

// Get a single accommodation by ID
exports.getAccommodationById = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id).populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        }).populate("owner");
        if (!accommodation) {
            req.flash("error", "accommodation you requested for does not exist")
            return res.redirect("/accommodations");
        }
        res.render('Accommodations/showAccommodations', { accommodation });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching accommodation", error });
    }
};

// Get a single update accommodation by ID
exports.editAccommodationById = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            req.flash("error", "accommdation you requested for does not exist")
            return res.redirect("/accommodations");
        }
        let originalUrl = accommodation.image.url;
        const transformation = 'h_300,w_250'; // Specify your transformations here
        const cloudinaryUrl = originalUrl.replace(/(https:\/\/res\.cloudinary\.com\/)(.+?)(\/image\/upload)(\/v\d+\/)/, `$1${process.env.CLOUD_NAME}$3/${transformation}$4`);
        res.render('Accommodations/editAccommodation', { accommodation, newAccommodationImageUrl: cloudinaryUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching accommodation", error });
    }
};

// Update an accommodation by ID
exports.updateAccommodation = wrapAsync(async (req, res) => {
    try {
        // Check if the accommodation exists
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ success: false, message: "Accommodation not found" });
        }

        // Update fields from the form data
        Object.assign(accommodation, req.body.accommodation);

        // If a new image is uploaded, update the image field
        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;
            accommodation.image = { url, filename }; // Update the image field with new image info
        }

        // Save the updated accommodation
        await accommodation.save();
        req.flash("success", "accommodation Updated!!");
        // Redirect to the accommodation detail page
        res.redirect(`/accommodations/${req.params.id}`);
    } catch (error) {
        console.error('Error updating accommodation:', error);
        res.status(500).json({ success: false, message: "Error updating accommodation", error });
    }
});

// Delete an accommodation by ID
exports.deleteAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ success: false, message: "Accommodation not found" });
        }
        req.flash("success", "accommdation deleted");
        res.redirect('/accommodations');  // Redirect to the list of accommodations
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting accommodation", error });
    }
};