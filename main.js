var blockchain = require('./js/blockchain');
var admin = require('./js/admin');
var client = require('./js/client');
var express = require('express');
var bodyParser = require('body-parser');
var os = require('os');

console.log('Checking OS Platform...');
if(os.platform() !== "linux") {
    console.log(os.platform()+' not supported...');
    process.exit(1);
}
console.log(os.platform()+' supported...');

if (process.argv[2] === "admin") {
    var browser;
    if(process.argv[3] === "chrome") {
        browser = "google-chrome";
    } else if(process.argv[3] === "firefox") {
        browser = "firefox";
    } else {
        console.log('Browser supported are chrome or firefox...');
        process.exit(2);
    }
    admin.server(browser);
    admin.cleanUp();
} else if (process.argv[2] === "client") {
    var browser;
    if(process.argv[3] === "chrome") {
        browser = "google-chrome";
    } else if(process.argv[3] === "firefox") {
        browser = "firefox";
    } else {
        console.log('Browser supported are chrome or firefox...');
        process.exit(2);
    }
    client.server(browser);
    client.cleanUp();
} else {
    var app = express();
    app.use(bodyParser.json());
    app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain.getChain())));
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
    app.post('/addPeer', (req, res) => {
        blockchain.connectToPeer(req.body.peer);
        res.send();
    });
    app.listen(process.argv[2], () => console.log('Listening http on port: ' + process.argv[2]));
    blockchain.server('127.0.0.1', process.argv[3]);
}
