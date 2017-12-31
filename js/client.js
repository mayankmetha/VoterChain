var firebase = require('firebase');
require('firebase/database');
require('firebase/auth');
var express = require('express');
var open = require('open');
var path = require('path');
var CryptoJS = require('crypto-js');
var bodyParser = require('body-parser');
var fs = require('fs');
var https = require('https');
var forceSsl = require('express-force-ssl');
var firebaseConfig = require('./config');

var app = express();
var key = fs.readFileSync(path.join(__dirname+'/../ssl/private.key'));
var cert = fs.readFileSync(path.join(__dirname+'/../ssl/private.crt'));
var options = {
    key: key,
    cert: cert
};
var isAnonymous;
var uidAnonymous;
var user;

firebase.initializeApp(firebaseConfig.config);

var db = firebase.database();

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
    https.createServer(options,app).listen(443);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(forceSsl);
    //firebaseAuthCleanUp
    app.get('/close', function (req, res) {
        firebase.auth().currentUser.delete().then(function() {
            res.send('Browser is safe to close...');
            process.exit(0);
        });
    });
    //firebaseAuthLogin
    app.get('/start', function (req, res) {
        firebase.auth().signInAnonymously().catch(function (error) {
            var error = error.code;
            var errorMessage = error.message;
        });
        res.redirect('/login');
    });
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
        res.sendFile(path.join(__dirname + '/../main-web/js/cryptojs/sha512.js'));
    });
    app.post('/login', function (req, res) {
        user = req.body.user;
        var password = req.body.password;
        if(uidAnonymous !== null) {
            db.ref('users/' + user).on('value', function (snapshot) {
                if(password === snapshot.val().pwd)  {
                    res.send(snapshot.val().uid+"\n"+snapshot.val().pwd);
                }
            });
        }
    });
    app.listen(80, function () {
        console.log('Opening VoterChain...\nGoto http://localhost/close to Exit...');
        open("http://localhost/start",browser);
    });
}

function cleanUp() {
    process.on('SIGINT', () => {
        console.log('Exiting due to SIGINT signal...');
        process.exit(0);
    });
    process.on('exit', () => {
        console.log('Exited...');
        process.exit(0);
    });
}

module.exports = {
    server: server,
    cleanUp: cleanUp
};
