const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbConnector");

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
	primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
    }
},
{
	tableName: 'User'
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
