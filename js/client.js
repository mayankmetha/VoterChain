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
var wait = require('wait-for-stuff');
var firebaseConfig = require('./config');
var blockchain = require('./blockchain');
var calculation = require('./calculation');
var map2json = require('./map2json');

var app = express();
var key = fs.readFileSync(path.join(__dirname + '/../ssl/private.key'));
var cert = fs.readFileSync(path.join(__dirname + '/../ssl/private.crt'));
var options = {
    key: key,
    cert: cert
};
var isAnonymous;
var uidAnonymous;
var user;
var invalid = 0;
var falseAttempt;
var password;
var uid;

firebase.initializeApp(firebaseConfig.config);

var db = firebase.database();

var myip = ip.address();

//disable https and forceSsl in terminal test mode
function server(browser) {
    https.createServer(options, app).listen(443);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(forceSsl);
    //TODO: test code   
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
    app.get('/cal/:options', function (req, res) {
        var chain = blockchain.getChain();
        switch (req.params.options) {
            case "1":
                res.send(map2json.map2json(calculation.genMap(chain)));
                break;
            case "2":
                res.send(map2json.map2json(calculation.computePartyMax(chain)));
                break;
            case "3":
                res.send(map2json.map2json(calculation.computeNumberOfConstituency(chain)));
                break;
            case "4":
                res.send(map2json.map2json(calculation.computeConstituencyMax(chain)));
                break;
        }
    });
    app.get('/blk/:eleid', function (req, res) {
        var blk = blockchain.genBlocks(uid, req.params.eleid, 0, 0);
        res.send(JSON.stringify(blockchain.isHashRepeated(blk)));
    });
    app.get('/user.css', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/css/user.css'));
    });
    app.get('/user.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/user.js'));
    });
    app.get('/username', function (req, res) {
        res.send(JSON.stringify(user));
    });
    app.get('/conid', function (req, res) {
        db.ref('users/' + user).once('value', function (snapshot) {
            if (snapshot.exists()) {
                res.send(JSON.stringify(snapshot.val().conid));
            }
        });
    });
    app.get('/getelections', function (req, res) {
        var conid;
        var conRegex;
        var eMap = new Map();
        var index = 0;
        if (uidAnonymous != null) {
            db.ref('users/' + user).once('value', function (snapshot) {
                if (snapshot.exists()) {
                    conid = snapshot.val().conid;
                }
                db.ref('election/').once('value', function (snapshot) {
                    snapshot.forEach(function (electionSnapshot) {
                        conRegex = electionSnapshot.val().conRegex;
                        if (conid.startsWith(conRegex)) {
                            eMap.set(index, electionSnapshot.key);
                            index = index + 1;
                        }
                    });
                    res.send(map2json.map2json(eMap));
                });
            });
        }
    });
    app.get('/getcandidate/:eleid', function (req, res) {
        var conid;
        if (uidAnonymous != null) {
            db.ref('users/' + user).once('value', function (snapshot) {
                if (snapshot.exists()) {
                    conid = snapshot.val().conid;
                }
                db.ref('candidate/'+req.params.eleid+'/'+conid).once('value', function (snapshot) {
                    var canMap = new Map();
                    snapshot.forEach(function (childSnapshot) {
                        canMap.set(childSnapshot.key, childSnapshot.val());
                    });
                    res.send(map2json.map2json(canMap));
                });
            });
        }
    });
    app.get('/logout', function (req, res) {
        user = "";
        password = "";
        invalid = 0;
        res.redirect('/');
    });
    //message css file
    app.get('/message.css', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/css/message.css'));
    });
    //firebaseAuthCleanUp
    app.get('/close', function (req, res) {
        firebase.auth().currentUser.delete().then(function () {
            res.sendFile(path.join(__dirname + '/../main-web/html/close.html'));
            wait.for.time(5);
            process.exit(0);
        });
    });
    //firebaseAuthLogin
    app.get('/start', function (req, res) {
        firebase.auth().signInAnonymously().catch(function (error) {
            console.log(error.code);
            console.log(error.message);
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
    app.get('/servePeer', function (req, res) {
        blockchain.server(myip, '6000');
        res.redirect('/');
    });
    //3rd party files
    app.get('/jquery.min.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/jquery/jquery.min.js'));
    });
    app.get('/jquery.scrollify.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/jquery/jquery.scrollify.js'));
    });
    app.get('/fontawesome-all.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/fontawesome/fontawesome-all.js'));
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
    app.post('/addPeer', function (req, res) {
        var peer = req.body.peer;
        blockchain.connectToPeer(peer);
        res.sendFile(path.join(__dirname + '/../main-web/html/peerAddDone.html'));
    });
    //home
    app.get('/', function (req, res) {
        if (invalid == 1 || invalid == 2) {
            invalid = 0;
            res.sendFile(path.join(__dirname + '/../main-web/html/homeInvalidLogin.html'));
        } else {
            invalid = 0;
            res.sendFile(path.join(__dirname + '/../main-web/html/home.html'));
        }
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
    app.get('/home1.svg', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/home1.svg'));
    });
    app.get('/home2.svg', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/home2.svg'));
    });
    app.get('/home3.svg', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/assets/home3.svg'));
    });
    app.get('/blockHome', function (req, res) {
        res.send(JSON.stringify(blockchain.getChain()));
    });
    app.get('/countHome', function (req, res) {
        res.send(JSON.stringify(blockchain.getChain().length));
    });
    //invalidateLoginAttempt
    app.get('/invalidLoginAttempt', function (req, res) {
        if (falseAttempt < 5) {
            falseAttempt = falseAttempt + 1;
            db.ref('users/' + user).update({
                falseAttempt: falseAttempt
            });
            res.redirect('/');
        } else {
            res.sendFile(path.join(__dirname + '/../main-web/html/userBlocked.html'));
        }
    });
    //user page
    app.get('/users/:uid', function (req, res) {
        invalid = 0;
        if (uidAnonymous != null) {
            db.ref('users/' + user).once('value', function (snapshot) {
                if (snapshot.exists()) {
                    if (password == snapshot.val().pwd && uid == req.params.uid) {
                        res.sendFile(path.join(__dirname + '/../main-web/html/user.html'));
                    } else {
                        res.redirect('/');
                    }
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    });
    //login
    app.post('/login', function (req, res) {
        user = req.body.user;
        uid = CryptoJS.SHA512(user).toString();
        password = CryptoJS.SHA512(req.body.password).toString();
        if (uidAnonymous !== null) {
            db.ref('users/' + user).once('value', function (snapshot) {
                if (snapshot.exists()) {
                    falseAttempt = snapshot.val().falseAttempt;
                    if (password === snapshot.val().pwd && falseAttempt < 5) {
                        var url = "/users/" + uid;
                        res.redirect(url);
                    } else {
                        invalid = 1;
                        res.redirect('/invalidLoginAttempt');
                    }
                } else {
                    invalid = 2;
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    });
    //blocks
    app.get('/blocks', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/html/blocks.html'));
    });
    app.get('/blocks.css', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/css/blocks.css'));
    });
    app.get('/blocks.js', function (req, res) {
        res.sendFile(path.join(__dirname + '/../main-web/js/blocks.js'));
    });
    //express config
    app.listen(80, function () {
        console.log('Opening VoterChain...\nGoto https://localhost/close to Exit...');
        open("https://localhost/start", browser);
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
