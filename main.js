var blockchain = require('./js/blockchain');
var admin = require('./js/admin');
var client = require('./js/client');
var express = require('express');
var bodyParser = require('body-parser');

if (process.argv[2] === "admin") {
    admin.server();
    admin.cleanUp();
} else if (process.argv[2] === "client") {
    client.server();
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
