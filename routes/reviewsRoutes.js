const express = require('express');
const router = express.Router({ mergeParams: true }); 
const { createReview, destroyReview } = require('../controllers/reviewController');
const { validateReview, isLoggedIn,isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview ,createReview); 

router.delete('/:reviewId', isLoggedIn,isReviewAuthor, destroyReview);

module.exports = router;
