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
    if (choices === "Add an Employee") {
      addEmployee();
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
      name:'role',
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
      name:'salary',
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
    const params = [answer.role, answer.salary];

    // pull information from the departments table
    const sqlDept = `SELECT departments.name, departments.id FROM departments`;

    connection.query(sqlDept, (err, data) => {
      if (err) throw err;

      // variable for the department choices
      const pickDept = data.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
        {
          type:"list",
          name:'pickDept',
          message: "What Department is this role in?",
          choices: pickDept
        }
      ])
      .then(chooseDept => {
        params.push(chooseDept.pickDept);

        const sql = `INSERT INTO roles (title, salary, department_id)
                      VALUES (?,?,?)`;

        connection.query(sql, params, (err, res) => {
          if (err) throw err;
          console.log("The new role, "+ answer.role + ", has been added");
          viewAllRoles();
        })
      })
    });
  });
};

// Add a Employee
const addEmployee = () => {
  inquirer.prompt([
    {
      type:"input",
      name:'firstname',
      message: "What is the first name of the employee?",
      validate: employeeFirstName => {
        if (employeeFirstName) {
          return true;
        } else {
          console.log("Please enter the first name of the employee.");
          return false;
        }
      }
    },
    {
      type:"input",
      name:'lastname',
      message: "What is the last name of the employee?",
      validate: employeeLastName => {
        if (employeeLastName) {
          return true;
        } else {
          console.log("Please enter the last name of the employee.");
          return false;
        }
      }
    }
  ])
  .then(answer => {
    const params = [answer.firstname, answer.lastname];

    // pull information from the roles table
    const sqlRole = `SELECT roles.title, roles.id FROM roles`;

    connection.query(sqlRole, (err, data) => {
      if (err) throw err;

      // variable for the department choices
      const pickRole = data.map(({ title, id }) => ({ name: title, value: id }));

      inquirer.prompt([
        {
          type:"list",
          name:'pickRole',
          message: "What is the employee's role?",
          choices: pickRole
        }
      ])
      .then(chooseRole => {
        params.push(chooseRole.pickRole);
        const sqlManager = `SELECT * FROM employees`;
        connection.query(sqlManager, (err, res) => {
          if (err) throw err;
          const pickManager = data.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name}))
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                      VALUES (?,?,?,?)`;

        connection.query(sql, params, (err, res) => {
          if (err) throw err;
          console.log("The new role, "+ answer.role + ", has been added");
          viewAllRoles();
        })
      })
    });
}