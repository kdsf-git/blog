const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with your database connection details
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
    host: 'your_host',
    dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING,
    },
    profilePicture: {
        type: DataTypes.STRING,
    },
    // Add any other fields you need for the user model
});

// Create the User table in the database if it doesn't exist
sequelize.sync()
    .then(() => {
        console.log('User table created (if not exists)');
    })
    .catch((error) => {
        console.error('Error creating User table:', error);
    });

module.exports = User;