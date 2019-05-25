var inquirer = require("inquirer");
var fs = require("fs");
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
// var chalkAnimation = require("chalk-animation");

// function a() {
var options = {
  type: "list",
  name: "options",
  message: "What do you want To Do?",
  choices: ["Add To Do", "View All To Do", "Search", "Delete"]
};

function main() {
  console.log(
    chalk.bold(
      chalk.cyan(
        figlet.textSync("** To Do **", {
          font: "ghost",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    )
  );
  console.log(chalk.red("Welcome to To Do App -Designed with efficiency:D"));
  main_menu();
}

function main_menu() {
  inquirer.prompt(options).then(answers => {
    console.log(answers);
    if (answers.options === "Add To Do") {
      subject();
    }
    if (answers.options === "View All To Do") {
      view();
    }
    if (answers.options === "Search") {
      search();
    }
    if (answers.options === "Delete") {
      method_delte();
    }
    // else {
    //   console.log("You cannot go that way. Try again");
    //   exitHouse();
    // }
  });
}

function subject() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "subject",
        message: "?Subject?"
      },
      { type: "input", name: "task", message: "?Task?" }
    ])
    .then(answers => {
      console.log(answers);

      var data = fs.readFileSync("data.json");

      var data_1 = JSON.parse(data);
      // console.log(data_1);

      data_1.push(answers);
      // console.log(data_1);

      data_2 = JSON.stringify(data_1);

      fs.writeFileSync("data.json", data_2, () => {});

      clear();
      main();
    });
}

function view() {
  var data = fs.readFileSync("data.json");
  // console.log(data);

  var data_1 = JSON.parse(data);
  // console.log(data_1);

  var empty = [];

  empty = data_1;
  console.log(empty);

  inquirer
    .prompt([
      {
        type: "list",
        name: "back",
        message: "",
        choices: ["Back"]
      }
    ])
    .then(answers => {
      if (answers.back == "Back") {
        clear();
        main();
      }
    });
}

function search() {
  console.log(
    chalk.black(chalk.bgRed("Searching is Case Sensitive so be careful!!"))
  );
  inquirer
    .prompt([
      {
        type: "input",
        name: "subject",
        message: "?Enter Subject of to do you want to search?"
      }
    ])
    .then(answers => {
      // console.log(answers.subject);

      var data = fs.readFileSync("data.json");
      // console.log(data);

      var data_1 = JSON.parse(data);
      // console.log(data_1);

      var empty = [];

      empty = data_1;
      // console.log(empty);

      var j = empty.length;

      // console.log(j);

      // console.log(answers.subject);
      // console.log(empty[2].subject);

      // console.log(typeof answers.subject);
      // console.log(typeof empty[0].subject);

      for (var i = 0; i <= j; i++) {
        if (answers.subject == empty[i].subject) {
          console.log(empty[i]);
          // } else {
          //   console.log("Not Found");
        }
      }
      elseif(i == j);
      inquirer
        .prompt([
          {
            type: "list",
            name: "back",
            message: "",
            choices: ["Back"]
          }
        ])
        .then(answers => {
          if (answers.back == "Back") {
            clear();
            main();
          }
        });
    })
    .catch(function() {
      // console.log("Promise Rejected");
    });
}

function method_delte() {
  console.log(
    chalk.black(chalk.bgRed("Deleting is Case Sensitive so be careful!!"))
  );
  inquirer
    .prompt([
      {
        type: "input",
        name: "subject",
        message: "?Enter Subject of to do you want to delete?"
      }
    ])
    .then(answers => {
      // console.log(answers.subject);

      var data = fs.readFileSync("data.json");
      // console.log(data);

      var data_1 = JSON.parse(data);
      // console.log(data_1);

      var empty = [];

      empty = data_1;
      // console.log(empty);

      var j = empty.length;
      // console.log(answers.subject);
      // console.log(empty[0].subject);

      // console.log(typeof answers.subject);
      // console.log(typeof empty[0].subject);

      var new_array = [];
      var delete_value = [];

      for (var i = 0; i < j; i++) {
        if (answers.subject != empty[i].subject) {
          new_array.push(empty[i]);
        } else {
          delete_value.push(empty[i]);
          console.log("Task Deleted!");
        }
      }
      console.log(new_array);

      var data = fs.readFileSync("data.json");

      var data_1 = JSON.parse(data);
      // console.log(data_1);

      data_1 = new_array;
      // console.log(data_1);

      data_2 = JSON.stringify(data_1);

      fs.writeFileSync("data.json", data_2, () => {});

      clear();

      inquirer
        .prompt([
          {
            type: "list",
            name: "back",
            message: "",
            choices: ["Back"]
          }
        ])
        .then(answers => {
          if (answers.back == "Back") {
            clear();
            main();
          }
        });
    });
}
main();
// }

// module.exports.a = a;
