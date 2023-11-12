// Sample code structure for the backend
const express = require('express');
const session = require('express-session');

//initialize DB ORM
require('./models/makeAssociations.js');

const app = express();

// Middlewares, configurations, and routes setup
app.set("view engine", 'ejs');

app.use(session({
	secret: "not a very good secret"
}));

// Implement the key features with routes, controllers, models, and views
// Define routes
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/post');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const profileRoutes = require('./routes/profile');
const registerRoutes = require('./routes/register');

app.use("/", indexRoutes);
app.use("/post", postRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/user", profileRoutes);
app.use("/register", registerRoutes);


// Implement user authentication, post creation, comments, likes, search, etc.

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
