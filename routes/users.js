const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model

// Register Page
router.get('/register', (req, res) => {
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
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login (form submission)

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/profile',
//         failureRedirect: '/login',
//         failureFlash: true
//     })(req, res, next);
// });

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