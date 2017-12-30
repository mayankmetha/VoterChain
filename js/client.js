var firebase = require('firebase');
require('firebase/database');
require('firebase/auth');
var express = require('express');
var opn = require('opn');
var path = require('path');
var CryptoJS = require('crypto-js');
var bodyParser = require('body-parser');
var firebaseConfig = require('./config');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var isAnonymous;
var uidAnonymous;
var user;

firebase.initializeApp(firebaseConfig.config);

var db = firebase.database();

function anonymouslySignIn() {
    firebase.auth().signInAnonymously().catch(function (error) {
        var error = error.code;
        var errorMessage = error.message;
    });
}

function auth() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            isAnonymous = user.isAnonymous;
            uidAnonymous = user.uid;
        } else {
            isAnonymous = null;
            uid = null;
            db = null;
        }
    });
}

function server(browser) {
    //login
    app.get('/login', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/html/login.html'));
    });
    app.get('/login.css', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/css/login.css'));
    });
    app.get('/01.jpg', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/01.jpg'));
    });
    app.get('/arrow.png', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/arrow.png'));
    });
    app.get('/cryptojs/sha512.js', function(req,res) {
        res.sendFile(path.join(__dirname + '/../admin-web/cryptojs/sha512.js'));
    });
    app.post('/login', function (req, res) {
        user = req.body.user;
        var password = req.body.password;
        if(uidAnonymous !== null) {
            db.ref('users/' + user).on('value', function (snapshot) {
                if(password === snapshot.val().pwd)  {
                    res.send("success");
                }
            });
        }
    });
    app.listen(5000, function () {
        if (browser === "chrome") {
            console.log('opening http://localhost:5000 in google chrome');
            opn('http://localhost:5000', { app: "google-chrome" });
        } else if (browser === "firefox") {
            console.log('opening http://localhost:5000 in firefox');
            opn('http://localhost:5000', { app: "firefox" });
        } else {
            console.log('opening http://localhost:5000 in default browser');
            opn('http://localhost:5000');
        }
        //anonymouslySignIn();
    });
}

module.exports = {
    server: server
}

//TODO: post browser exit cleanup