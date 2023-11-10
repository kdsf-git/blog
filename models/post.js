const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbConnector");

// Define the Post model
const Post = sequelize.define('Post', {
    id: {
	type: DataTypes.INTEGER,
	autoIncrement: true,
	allowNull: false,
	primaryKey: true
    },
    username: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    title: {
	type: DataTypes.TEXT,
	allowNull: false
    },
    keywords: {
	type: DataTypes.TEXT
    },
    content: {
	type: DataTypes.TEXT
    },
    views: {
	type: DataTypes.INTEGER
    },
    date: {
	type: DataTypes.DATE,
	allowNull: false
    }
});

// Create the Post table in the database if it doesn't exist
sequelize.sync()
    .then(() => {
        console.log('Post table created (if not exists)');
    })
    .catch((error) => {
        console.error('Error creating Post table:', error);
    });

module.exports = Post;
