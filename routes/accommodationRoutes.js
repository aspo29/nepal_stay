const express = require('express');
const router = express.Router();
const { isOwner, isLoggedIn, validateAccommodation } = require('../middleware');
const accommodationController = require('../controllers/accommodationController');
const { storage } = require("../cloudConfig.js");
const multer = require('multer');
const upload = multer({ storage });

// Get all accommodations (view) and create a new accommodation
router.route('/')
    .get(accommodationController.getAccommodations)  // Get all accommodations
    .post(upload.single('accommodation[image]'), validateAccommodation, isLoggedIn, accommodationController.createAccommodation);  // Create a new accommodation

// Create a new accommodation (form view)
router.get('/create', (req, res) => {
    res.render('Accommodations/accommodationForm');
});

// Get and update a single accommodation by ID
router.route('/:id')
    .get(accommodationController.getAccommodationById)  // Get single accommodation (view)
    .put(isLoggedIn, isOwner, upload.single('accommodation[image]'), validateAccommodation, accommodationController.updateAccommodation)  // Update accommodation
    .delete(isLoggedIn, isOwner, accommodationController.deleteAccommodation);  // Delete accommodation

// Get a single accommodation for editing (view)
router.get('/edit/:id', isLoggedIn, isOwner, accommodationController.editAccommodationById);

module.exports = router;