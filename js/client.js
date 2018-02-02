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
var ip = require('ip');
var forceSsl = require('express-force-ssl');
var firebaseConfig = require('./config');
var blockchain = require('./blockchain-new');

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

var myip = ip.address();

function server(browser) {
    //https.createServer(options,app).listen(443);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    //app.use(forceSsl);
    //test code
    //TODO: test mining of blocks
    app.post('/mineBlock', (req, res) => {
        var newBlock = blockchain.genBlocks(req.body.uid, req.body.eleid, req.body.conid, req.body.parid);
        if (blockchain.addBlock(newBlock)) {
            blockchain.broadcast(blockchain.responseLatestMsg());
            console.log('block added: ' + JSON.stringify(newBlock));
        } else {
            console.log('cannot add illegal block!');
        }
        res.send();
    });
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
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                isAnonymous = user.isAnonymous;
                uidAnonymous = user.uid;
            }
        });
        res.redirect('/servePeer');
    });
    //start peer server
    app.get('/servePeer', function(req,res) {
        blockchain.server(myip,'6000');
        res.redirect('/');
    });
    //add peer
    app.get('/addPeer', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/html/peer.html'));
    });
    app.get('/peer.css', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/css/peer.css'));
    });
    app.get('/cogs.svg', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/cogs.svg'));
    });
    app.post('/addPeer', function(req,res) {
        var peer = req.body.peer;
        blockchain.connectToPeer(peer);
        res.send(peer+" has been added");
    });
    //home
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/html/home.html'));
    });
    app.get('/home.css', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/css/home.css'));
    });
    app.get('/home.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/home.js'));
    });
    app.get('/login.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/login.js'));
    });
    app.get('/jquery.min.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/jquery/jquery.min.js'));
    });
    app.get('/jquery.scrollify.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/jquery/jquery.scrollify.js'));
    });
    app.get('/fontawesome-all.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/fontawesome/fontawesome-all.js'));
    });
    app.get('/home1.svg', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/home1.svg'));
    });
    app.get('/home2.svg', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/home2.svg'));
    });
    app.get('/home3.svg', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/home3.svg'));
    });
    app.get('/blocks', function(req,res) {
        res.send(JSON.stringify(blockchain.getChain()));
    });
    app.get('/count', function(req,res) {
        res.send(JSON.stringify(blockchain.getChain().length));
    });
    //login
    app.post('/login', function (req, res) {
        user = req.body.user;
        var password = CryptoJS.SHA512(req.body.password).toString();
        if(uidAnonymous !== null) {
            db.ref('users/' + user).on('value', function (snapshot) {
                if(password === snapshot.val().pwd)  {
                    res.send("UID: "+snapshot.val().uid+"\nPWD: "+snapshot.val().pwd+"\nCONID: "+snapshot.val().conid);
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
        console.log('Report uid to admin: ' + uidAnonymous);
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
