const mysql = require("mysql2");

// Connect database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"KEiaan1005!",
    database:"business"
  },
  console.log("Connected to the business employee database.")
);

module.exports = connection;