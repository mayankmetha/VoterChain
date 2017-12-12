var express = require('express');
var path = require('path');
var opn = require('opn');

var app = express();

function server(browser) {
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
    
    app.listen(5000, function() {
        if(browser === "chrome") {
            console.log('opening http://localhost:5000 in google chrome');
            opn('http://localhost:5000',{app: "google-chrome"});
        } else if(browser === "firefox") {
            console.log('opening http://localhost:5000 in firefox');
            opn('http://localhost:5000',{app: "firefox"});
        } else {
            console.log('opening http://localhost:5000 in default browser');
            opn('http://localhost:5000');
        }
    });
}

module.exports = {
    server: server
};