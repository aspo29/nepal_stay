// routes/accommodationRoutes.js
const express = require('express');
const router = express.Router();
const { validateAccommodation } = require('../middleware');
const accommodationController = require('../controllers/accommodationController');

// Get all accommodations (view)
router.get('/', accommodationController.getAccommodations);

// Create a new accommodation (form view)
router.get('/create', (req, res) => {
    res.render('Accommodations/accommodationForm');
});

// Get single accommodations (view)
router.get('/:id', accommodationController.getAccommodationById);

// Get a single accommodation for editing (view)
router.get('/edit/:id', accommodationController.editAccommodationById);

// Apply validateAccommodation middleware before creating a new accommodation
router.post('/', validateAccommodation, accommodationController.createAccommodation);

// Update an accommodation by ID 
router.put('/:id', validateAccommodation, accommodationController.updateAccommodation);

// Delete an accommodation by ID
router.delete('/:id', accommodationController.deleteAccommodation);

module.exports = router;