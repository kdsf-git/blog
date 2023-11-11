const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbConnector");

// Define the Comment model
const Comment = sequelize.define('Comment', {
    id: {
	type: DataTypes.INTEGER,
	allowNull: false,
	unique: true,
	autoIncrement: true,
	primaryKey: true
    },
    post: {
	type: DataTypes.INTEGER,
	allowNull: false
    },
    username: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    content: {
	type: DataTypes.TEXT,
	allowNull: false
    }
},
{
	tableName: 'Comment',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

// Create the Comment table in the database if it doesn't exist
sequelize.sync()
    .then(() => {
        console.log('Comment table created (if not exists)');
    })
    .catch((error) => {
        console.error('Error creating Comment table:', error);
    });

module.exports = Comment;
