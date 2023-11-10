// Sample code structure for the backend
const express = require('express');
const session = require('express-session');

const app = express();

// Middlewares, configurations, and routes setup
app.set("view engine", 'ejs');

// Implement the key features with routes, controllers, models, and views
// Define routes
const indexRoutes = require('./routes/index');
const postsRoutes = require('./routes/posts');
const loginsRoutes = require('./routes/logins');
const profilesRoutes = require('./routes/profiles');
const registersRoutes = require('./routes/registers');
const usersRoutes = require('./routes/users');

app.use("/",indexRoutes);
app.use("/post",postsRoutes);
app.use("/login",loginsRoutes);
app.use("/profile",profilesRoutes);
app.use("/register",registersRoutes);
app.use("/user",usersRoutes);


// Implement user authentication, post creation, comments, likes, search, etc.

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
