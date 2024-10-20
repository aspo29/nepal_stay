const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const { renderSignupForm, signup, renderLoginForm, login, logout } = require('../controllers/userController.js');
const wrapAsync = require('../utils/wrapAsync');

// Signup route
router.route('/signup').get(renderSignupForm).post(wrapAsync(signup));

// // Login route
router.route('/login').get(renderLoginForm).post(saveRedirectUrl, passport.authenticate('local', {
failureRedirect: '/login',failureFlash: true,}),login);

// Logout route
router.get('/logout', logout);

module.exports = router;
