var express = require('express');
var path = require('path');
var opn = require('opn');
var fs = require('fs');
var https = require('https');
var forceSsl = require('express-force-ssl');

var app = express();

var key = fs.readFileSync(path.join(__dirname+'/../ssl/private.key'));
var cert = fs.readFileSync(path.join(__dirname+'/../ssl/private.crt'));
var options = {
    key: key,
    cert: cert
};

function server() {
    https.createServer(options,app).listen(443);
    app.use(forceSsl);
    app.get('/firebase/firebase.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/firebase/firebase.js'));
    });
    
    app.get('/firebaseui/firebaseui.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/firebaseui/firebaseui.js'));
    });
    
    app.get('/firebaseui/firebaseui.css', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/firebaseui/firebaseui.css'));
    });
    
    app.get('/w3css/w3.css', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/w3css/w3.css'));
    });
    
    app.get('/fontawesome/fontawesome-all.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/fontawesome/fontawesome-all.js'));
    });
    
    app.get('/cryptojs/sha512.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/cryptojs/sha512.js'));
    });
    
    app.get('/' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/html/index.html'));
    });
    
    app.get('/config.js' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/js/config.js'));
    });
    
    app.get('/login.js' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/js/login.js'));
    });
    
    app.get('/admin' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/html/home.html'));
    });
    
    app.get('/home.js' , function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/js/home.js'));
    });
    
    app.listen(80, function() {
        console.log('Opening VoterChain Admin...\nHit Ctrl+C to exit...');
        opn('http://localhost');
    });
}

function cleanUp() {
    process.on('SIGINT', () => {
        console.log('\nExiting...');
        process.exit(0);
    });
    process.on('SIGTERM', () => {
        console.log('\nExiting...');
        process.exit(0);
    });
}

module.exports = {
    server: server,
    cleanUp: cleanUp
};