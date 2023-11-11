const express = require('express');
const router = express.Router();


// Login Page
router.get('/', (req, res) => {
    const error = req.query.error;
    res.render('login', { error });
});

// Handle Login (form submission)
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Implement your custom logic here to check if the username and password are valid
    // You can replace this with your own authentication logic

    if (username === 'exampleUser' && password === 'password123') {
        // Redirect to a success page or the user's profile
        res.redirect('/success');
    } else {
        // Redirect back to the login page with an error message
        res.redirect('/login?error=1');
    }
});

module.exports = router;
