var express = require('express');
var path = require('path');
var opn = require('opn');

var app = express();

function server() {
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
        console.log('opening http://localhost:5000');
        opn('http://localhost:5000');
    });
}

module.exports = {
    server: server
};