const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model

// Profile Page (requires authentication)
router.get('/profile', (req, res) => {
    res.render('profile', { user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;