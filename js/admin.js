//imports
var express = require('express');
var path = require('path');
var open = require('open');
var fs = require('fs');
var https = require('https');
var forceSsl = require('express-force-ssl');
var wait = require('wait-for-stuff');
var chalk = require('chalk');

//express instance
var app = express();

//ssl
var key = fs.readFileSync(path.join(__dirname+'/../ssl/private.key'));
var cert = fs.readFileSync(path.join(__dirname+'/../ssl/private.crt'));
var options = {
    key: key,
    cert: cert
};

//express server
function server(browser) {
    //https
    https.createServer(options,app).listen(443);
    //force https only
    app.use(forceSsl);
    //firebase
    app.get('/firebase/firebase.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/firebase/firebase.js'));
    });
    //firebase ui
    app.get('/firebaseui/firebaseui.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/firebaseui/firebaseui.js'));
    });
    app.get('/firebaseui/firebaseui.css', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/firebaseui/firebaseui.css'));
    });
    //w3css
    app.get('/w3css/w3.css', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/w3css/w3.css'));
    });
    //fontawesome
    app.get('/fontawesome/fontawesome-all.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/fontawesome/fontawesome-all.js'));
    });
    //crypto js
    app.get('/cryptojs/sha512.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/cryptojs/sha512.js'));
    });
    //firebase config
    app.get('/config.js' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/js/config.js'));
    });
    //login
    app.get('/' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/html/index.html'));
    });
    app.get('/login.js' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/js/login.js'));
    });
    //home
    app.get('/admin' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/html/home.html'));
    });
    app.get('/home.js' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/js/home.js'));
    });
    //shutdown server
    app.get('/exit', function (req, res) {
        res.sendFile(path.join(__dirname + '/../admin-web/html/exit.html'));
        wait.for.time(10);
        process.exit(0);
    });
    //error 404
    app.all('*' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/html/404.html'));
    });
    //express settings
    app.listen(80, function() {
        console.log(chalk.bold.green('Opening VoterChain Admin...'));
        console.log(chalk.bold.red('Goto https://localhost/exit to exit...'));
        open("https://localhost",browser);    
    });
}

//interupt and exit handler
function cleanUp() {
    process.on('SIGINT', () => {
        console.log(chalk.bold.yellow('Exiting due to SIGINT signal...'));
        process.exit(0);
    });
    process.on('exit', () => {
        console.log(chalk.bold.green('Exited...'));
        process.exit(0);
    });
}

//exports
module.exports = {
    server: server,
    cleanUp: cleanUp
};
