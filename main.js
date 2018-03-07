//imports
var admin = require('./js/admin');
var client = require('./js/client');
var os = require('os');
var inquirer = require('inquirer');
var chalk = require('chalk');

//variables
var platform = os.platform();
var choices;
var browser;

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

//if runtime args are given else go to interactive mode
if (process.argv[2] != null) {
    //select mode (admin||user||help)
    if (process.argv[2] === "admin") {
        if(process.argv[3] != null) {
            selectBrowser();
            admin.server(browser);
            admin.cleanUp();
        } else {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'browser',
                    message: 'Which browser do you want to run?',
                    choices: choices
                }
            ]).then(function(answer) {
                admin.server(answer.browser);
                admin.cleanUp();
            });
        }
    } else if (process.argv[2] === "user") {
        if(process.argv[3] != null) {
            selectBrowser();
            client.server(browser);
            client.cleanUp();
        } else {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'browser',
                    message: 'Which browser do you want to run?',
                    choices: choices
                }
            ]).then(function(answer) {
                client.server(answer.browser);
                client.cleanUp();
            });
        }
    } else if (process.argv[2] === "help" || process.argv[2] === "--help" || process.argv[2] === "-h") {
        helpMes();
    } else {
        console.log(chalk.bold.red("Command Usage error...\n"));
        helpMes();
    }
} else {
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
}

//help message
function helpMes() {
    if(platform === "linux") {
        console.log(chalk.bold.yellow("USAGE:\tsudo npm start [client|admin] [firefox|chrome]"));
    } else if(platform === "darwin") {
        console.log(chalk.bold.yellow("USAGE:\tsudo npm start [client|admin] [safari|firefox|chrome]"));
    }
    console.log(chalk.bold.yellow("HELP:\tnpm start help"));
    process.exit(0);
}

//selecting browser(Firefox||Chrome for Linux Firefox||Chrome||Safari for macOS)
function selectBrowser() {
    if(process.argv[3] === "chrome") {
        if(platform === "linux") {
            browser = "google-chrome";
        } else {
            browser = "google chrome"
        }
    } else if(process.argv[3] === "firefox") {
        browser = "firefox";
    } else if(process.argv[3] === "safari" && platform === "darwin") {
        browser = "safari";
    } else {
        console.log(chalk.bold.red("Command Usage error...\n"));
        helpMes();
    }
}