var firebase = require('firebase');
require('firebase/database');
require('firebase/auth');
var express = require('express');
var opn = require('opn');
var path = require('path');
var CryptoJS = require('crypto-js');

var app = express();
var db;
var isAnonymous;
var uidAnonymous;
var user;

var config = {
    apiKey: "AIzaSyA-Kk2mYGuZEFfjJpFJ8H2RU4A31gAMJOg",
    authDomain: "voterchain.firebaseapp.com",
    databaseURL: "https://voterchain.firebaseio.com",
    projectId: "voterchain",
    storageBucket: "",
    messagingSenderId: "182275896456"
};
firebase.initializeApp(config);

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
            db = firebase.database();
        } else {
            isAnonymous = null;
            uid = null;
            db = null;
        }
    });
}

function validateUserLogin(user,password) {
    if(user !== null) {
        //db.ref('users/' + user).on('value', function (snapshot) {
        //    if(password === snapshot.val().pwd) 
        //        return true;
        //});
    }
    return false;
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
    app.post('/login.js', function (req,res) {
        user = req.query.user;
        var password = CryptoJS.SHA512(req.query.password).toString();
        if(validateUserLogin(user, password)) {
            res.send('login success');
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