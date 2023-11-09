const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User'); // Assuming you have a User model
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth'); // Middleware for user authentication

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('register');
});

// Handle Registration (form submission)
router.post('/register', (req, res) => {
    const { username, email, password, bio, profilePicture } = req.body;
    // Implement user registration logic and validation here
    // Hash the password and create a new user record
    // Redirect to the login page or user profile after successful registration
});

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login');
});

// Handle Login (form submission)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// Profile Page (requires authentication)
router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', { user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;