const inquirer = require("inquirer");
const figlet = require("figlet");
const consoleTable = require("console.table");
const connection = require("./db/connection");

connection.connect((err) => {
  if (err) throw err;
  console.log(figlet.textSync("Employee Tracker", "banner"));
  employeeTracker();
});


const employeeTracker = () => {

  inquirer.prompt([
    {
      type:"list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Exit Employee Tracker"
      ]
    }
  ]) 
  .then((userPick) => {
    const { choices } = userPick;
    if (choices === "View All Departments") {
      viewAllDepartments();
    }
    if (choices === "View All Roles") {
      viewAllRoles();
    }
    if (choices === "View All Employees") {
      viewAllRoles();
    }
  })
};

///////////////////////// SQL Table Functions ////////////////////////////

// View all Departments
const viewAllDepartments = () => { 
  const sql = `SELECT departments.id AS ID, departments.name AS Department FROM departments`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("")
    console.log("----------------  All Departments  ----------------");
    console.log("")
    console.table(res);
    console.log("---------------------------------------------------");
    employeeTracker();
  });
};

// View all Roles
const viewAllRoles = () => { 
  const sql = `SELECT roles.id AS ID, roles.title AS Title, departments.name AS Department
               FROM roles
               LEFT JOIN departments ON roles.department_id = departments.id`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("")
    console.log("-------------------  All Roles  -------------------");
    console.log("")
    console.table(res);
    console.log("---------------------------------------------------");
    employeeTracker();
  });
};

// View all Employees
const viewAllEmployees = () => { 
  const sql = `SELECT roles.id AS ID, roles.title AS Title, departments.name AS Department
               FROM roles
               LEFT JOIN departments ON roles.department_id = departments.id`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("")
    console.log("-------------------  All Roles  -------------------");
    console.log("")
    console.table(res);
    console.log("---------------------------------------------------");
    employeeTracker();
  });
};

