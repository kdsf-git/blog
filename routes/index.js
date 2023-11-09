const express = require('express');
const app = express();
const mongoose = require('mongoose'); // If you're using MongoDB
// const sequelize = require('./db'); // If you're using Sequelize with MySQL
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Connect to your database (e.g., MongoDB or MySQL)
mongoose.connect('mongodb://localhost/blogDB', { useNewUrlParser: true, useUnifiedTopology: true }); // If you're using MongoDB
// sequelize.sync(); // If you're using Sequelize with MySQL

// Middleware and configurations
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Set up Passport.js for authentication (for email/password login)
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    // Implement your user authentication logic here
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Fetch user by ID and pass it to done
    // Implement your user retrieval logic here
});

// Define routes
const indexRoutes = require('./routes/index');
const postsRoutes = require('./routes/posts');

app.use('/', indexRoutes);
app.use('/posts', postsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});