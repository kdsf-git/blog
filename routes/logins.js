const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configure Passport.js for user authentication
passport.use(new LocalStrategy(
    (username, password, done) => {
        // Replace this with your actual user authentication logic
        // Check if the username and password are valid
        if (username === 'user' && password === 'password') {
            return done(null, { username: 'user' });
        }
        return done(null, false, { message: 'Invalid username or password' });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    // Fetch the user from the database based on username
    // Replace this with your actual user retrieval logic
    if (username === 'user') {
        done(null, { username: 'user' });
    } else {
        done(null, false);
    }
});

// Login Page
router.get('/', (req, res) => {
    res.render('login', { message: req.flash('error') });
});

// Handle Login (form submission)
router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;