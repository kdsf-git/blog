const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./dbConnector");

// Define the Kudos model
const Kudos = sequelize.define('Kudos', {
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
    post: {
	type: DataTypes.INTEGER,
	allowNull: false
    }
},
{
    tableName: 'Kudos'
});

// Create the Kudos table in the database if it doesn't exist
sequelize.sync()
    .then(() => {
        console.log('Kudos table created (if not exists)');
    })
    .catch((error) => {
        console.error('Error creating Kudos table:', error);
    });

module.exports = Kudos;
