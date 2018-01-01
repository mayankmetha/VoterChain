var blockchain = require('./js/blockchain');
var admin = require('./js/admin');
var client = require('./js/client');
var express = require('express');
var bodyParser = require('body-parser');
var os = require('os');

console.log('Checking OS Platform...');
if(os.platform() !== "linux" && os.platform() !== "darwin") {
    console.log(os.platform()+' not supported...');
    process.exit(0);
}
var platform = os.platform();
console.log(platform+' supported...');

if (process.argv[2] === "admin") {
    var browser;
    if(process.argv[3] === "chrome") {
        if(platform === "linux") {
            browser = "google-chrome";
        } else {
            browser = "google chrome"
        }
    } else if(process.argv[3] === "firefox") {
        browser = "firefox";
    } else if(process.argv[3] === "safari" && platform === "darwin") {
        browser = "safari";
    } else {
        if(platform === "linux") {
            console.log('Browser supported are chrome or firefox...');
        } else {
            console.log('Browser supported are chrome, safari or firefox...');
        }
        process.exit(0);
    }
    admin.server(browser);
    admin.cleanUp();
} else if (process.argv[2] === "client") {
    var browser;
    if(process.argv[3] === "chrome") {
        if(platform === "linux") {
            browser = "google-chrome";
        } else {
            browser = "google chrome"
        }
    } else if(process.argv[3] === "firefox") {
        browser = "firefox";
    } else if(process.argv[3] === "safari" && platform === "darwin") {
        browser = "safari";
    } else {
        if(platform === "linux") {
            console.log('Browser supported are chrome or firefox...');
        } else {
            console.log('Browser supported are chrome, safari or firefox...');
        }
        process.exit(0);
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
