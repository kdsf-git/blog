const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbConnector");

// Define the Session model
const Session = sequelize.define('Session', {
    id: {
	type: DataTypes.INTEGER,
	allowNull: false,
	unique: true,
	autoIncrement: true,
	primaryKey: true
    },
    username: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    date: {
	type: DataTypes.DATE,
	allowNull: false
    }
},
{
	tableName: 'Session',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

// Create the Session table in the database if it doesn't exist
sequelize.sync()
    .then(() => {
        console.log('Session table created (if not exists)');
    })
    .catch((error) => {
        console.error('Error creating Session table:', error);
    });

module.exports = Session;
