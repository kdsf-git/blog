# blog
This application is an example blog.

## Requirements
- An SQL server (MySQL for deployment as-is, see "Database requirements")
- node.js
- npm

## Installing
1. Clone the repository
2. run `npm install` in the project directory
3. run `npm start` in the project directory

## Database requirements
In its current state, the application requires an external MySQL database. The access information is to be replaced in models/dbConnector.js.
The type of database can be changed by modifying models/dbConnector.js.
The necessary tables will be created automatically by the application, if they do not yet exist.
