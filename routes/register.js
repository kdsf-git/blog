const express = require('express');
const router = express.Router();

// Register Page
router.get('/', (req, res) => {
    res.render('register');
});

// Handle Registration (form submission)
router.post('/', (req, res) => {
    // Replace this with your actual user registration logic
    const { username, email, password } = req.body;
    // Implement user registration logic, create a new user record, and redirect after successful registration
    // You can also add validation and hashing for password security

    res.redirect('/login'); // Redirect to the login page after successful registration
});

module.exports = router;