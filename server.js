const inquirer = require("inquirer");
const figlet = require("figlet");
const consoleTable = require("console.table");
const connection = require("./db/connection");
const { connect } = require("./db/connection");

// Connect with database and display application header
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
      message: "Please select from the following options:",
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
      viewAllEmployees();
    }
    if (choices === "Add a Department") {
      addDepartment();
    }
    if (choices === "Add a Role") {
      addRole();
    }
    if (choices === "Exit Employee Tracker") {
      connection.end();
    }
  })
};

///////////////////////// SQL Table Functions ////////////////////////////

// View all Departments
const viewAllDepartments = () => { 
  const sql = `SELECT departments.id AS ID,
               departments.name AS Department FROM departments`;
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
  const sql = `SELECT roles.id AS ID,
               roles.title AS Title, 
               roles.salary AS Salary,
               departments.name AS Department
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
  const sql = `SELECT employees.id AS ID,
               employees.first_name AS First_Name,
               employees.last_name AS Last_Name,
               departments.name AS Department,
               roles.title AS Title,
               roles.salary AS Salary,
               CONCAT(manager.first_name, " ", manager.last_name) AS Manager
               FROM employees
               LEFT JOIN roles ON employees.role_id = roles.id
               LEFT JOIN departments ON roles.department_id = departments.id
               LEFT JOIN employees manager on employees.manager_id = manager.id`;
               
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("")
    console.log("-----------------  All Employees  -----------------");
    console.log("")
    console.table(res);
    console.log("---------------------------------------------------");
    employeeTracker();
  });
};

// Add a Department
const addDepartment = () => {
  inquirer.prompt([
    {
      type:"input",
      name:'addDept',
      message: "What is the name of the Department you'd like to add?",
      validate: addDept => {
        if (addDept) {
          return true;
        } else {
          console.log("Please enter the name of the Department you'd like to add.");
          return false;
        }
      }
    }
  ])
  .then(answer => {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    connection.query(sql, answer.addDept, (err, res) => {
      if (err) throw err;
      console.log(answer.addDept + " has been added to Departments.");
      viewAllDepartments();
    });
  });
}

// Add a Role
const addRole = () => {
  inquirer.prompt([
    {
      type:"input",
      name:'roleName',
      message: "What is the name of the Role you'd like to add?",
      validate: roleName => {
        if (roleName) {
          return true;
        } else {
          console.log("Please enter the name of the Role you'd like to add.");
          return false;
        }
      }
    },
    {
      type:"input",
      name:'roleSalary',
      message: "What is the salary of the Role you'd like to add?",
      validate: roleSalary => {
        if (roleSalary) {
          return true;
        } else {
          console.log("Please enter the Salary of the Role.");
          return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.roleName, answer.roleSalary];

      // pull information from the departments table
      const sqlRole = `SELECT name, id FROM departments`;

      connection.query(sqlRole, (err, data) => {
        if (err) throw err;

        inquirer.prompt([
          {
            type:"list",
            name:'choicesDept',
            message: "What Department is this role in?",
            choices: sqlRole
          }
        ])
        .then(choiceDept => {
        })
      });
  });
};