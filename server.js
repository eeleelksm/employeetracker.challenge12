const inquirer = require("inquirer");
const db = require("./db/connection");
const figlet = require("figlet");

const appHeader = () => {
  figlet.text('My Employee Tracker', {
    font: 'banner',
    horizontalLayout: 'default',
    verticalLayout: 'fitted',
    width: 80,
    whitespaceBreak: true
  }, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
  });
};

const employeeTracker = () => {

  return inquirer.prompt([
      {
        name:"user_name",
        type: "input",
        message: "what's your name"
      }
    ]);  
}

function startApp() {
  employeeTracker();
};

startApp();

