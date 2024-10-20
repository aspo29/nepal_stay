// controllers/accommodationController.js
const { accommodationSchema } = require('../schema');
const Accommodation = require('../models/accommodations');
const ExpressError = require('../utils/ExpressError.js');
const wrapAsync = require("../utils/wrapAsync.js");
const upload = require('../utils/multerConfig');

// Create a new accommodation, wrapped with wrapAsync
exports.createAccommodation = wrapAsync(async (req, res) => {
    // const { error } = accommodationSchema.validate(req.body);
    // if (error) {
    //     const message = error.details.map(el => el.message).join(', ');
    //     throw new ExpressError(400, message);
    // }
    const newAccommodation = new Accommodation(req.body.accommodation);
    newAccommodation.owner = req.user._id;
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
        res.render('Accommodations/editAccommodation', { accommodation });
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
            accommodation.image = `/uploads/${req.file.filename}`; // Use multer's file path
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