// controllers/accommodationController.js
const { accommodationSchema } = require('../schema');
const Accommodation = require('../models/accommodations');
const ExpressError = require('../utils/ExpressError.js');
const wrapAsync = require("../utils/wrapAsync.js");
// Create a new accommodation, wrapped with wrapAsync
exports.createAccommodation = wrapAsync(async (req, res) => {
    // const { error } = accommodationSchema.validate(req.body);
    // if (error) {
    //     const message = error.details.map(el => el.message).join(', ');
    //     throw new ExpressError(400, message);
    // }
    const newAccommodation = new Accommodation(req.body.accommodation); 
    await newAccommodation.save();
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
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).render('404', { message: "Accommodation not found" });
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
            return res.status(404).render('404', { message: "Accommodation not found" });
        }
        res.render('Accommodations/editAccommodation', { accommodation });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching accommodation", error });
    }
};

// Update an accommodation by ID
exports.updateAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!accommodation) {
            return res.status(404).json({ success: false, message: "Accommodation not found" });
        }
        res.redirect(`/accommodations/${req.params.id}`);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating accommodation", error });
    }
};

// Delete an accommodation by ID
exports.deleteAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ success: false, message: "Accommodation not found" });
        }
        res.redirect('/accommodations');  // Redirect to the list of accommodations
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting accommodation", error });
    }
};