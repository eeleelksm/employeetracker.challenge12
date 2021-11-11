const inquirer = require("inquirer");
const db = require("./db/connection");
const figlet = require("figlet");

// const appHeader = () => {
//   figlet.text('My Employee Tracker', {
//     font: 'banner',
//     horizontalLayout: 'default',
//     verticalLayout: 'fitted',
//     width: 80,
//     whitespaceBreak: true
//   }, function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data);
//   });
// };

const employeeTracker = () => {
  console.log(`
  Business Employee Tracker
  =========================
  `)

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
          "Update an Employee Role"
        ]
      }
    ]);  
}

function startApp() {
  employeeTracker();
};

startApp();
