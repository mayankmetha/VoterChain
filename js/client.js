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

function server() {
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
        res.sendFile(path.join(__dirname + '/../main-web/cryptojs/sha512.js'));
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
        console.log('Opening VoterChain');
        opn('http://localhost:5000/login');
        anonymouslySignIn();
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
