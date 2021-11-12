const connection = require("../db/connection");

class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  };

  // viewAllDepartments() {
  //   const sql = `SELECT * FROM departments`;
  //   connection.promise().query(sql, (err, res) => {
  //     if (err) throw err;
  //   })
    
  // };
};

module.exports = Department;