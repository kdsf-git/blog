const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	database: "db",
	username: "app",
	password: "dbpassword",
	options: {
		host: "192.168.0.12",
		dialect: "mysql",
		define: {
			freezeTableNames: true
		}
	}
);

sequelize.authenticate().then(() => {
	console.log("Database connection established");
}).catch((error) => {
	console.error("Failed to establish database connection");
});

module.exports = sequelize;
