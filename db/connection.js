const mysql = require("mysql2");

// Connecting to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"KEiaan1005!",
    database:"business"
  }
);

module.exports = connection;