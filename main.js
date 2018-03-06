//imports
var admin = require('./js/admin');
var client = require('./js/client');
var os = require('os');
var inquirer = require('inquirer');

//variables
var platform = os.platform();
var choices;

//check OS (Linux||macOS)
if (platform !== "linux" && platform !== "darwin") {
    console.log(chalk.bold.red(os.platform() + ' not supported...'));
    process.exit(0);
}

//generate browser list for OS
if (platform === "darwin") {
    choices = ["safari", "google chrome", "firefox"];
} else if (platform === "linux") {
    choices = ["google-chrome", "firefox"];
}

//menu
inquirer.prompt([
    {
        type: 'list',
        name: 'mode',
        message: 'Which mode do you want to run?',
        choices: [
            'admin',
            'user'
        ]
    },
    {
        type: 'list',
        name: 'browser',
        message: 'Which browser do you want to run?',
        choices: choices
    }
]).then(function (answer) {
    if (answer.mode === "admin") {
        admin.server(answer.browser);
        admin.cleanUp();
    } else if (answer.mode === "user") {
        client.server(answer.browser);
        client.cleanUp();
    }
});