const mysql = require("mysql2");

// Connect database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"KEiaan1005!",
    database:"business"
  }
);

module.exports = connection;