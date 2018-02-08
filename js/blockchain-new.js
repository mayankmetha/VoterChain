//external modules
var CryptoJS = require('crypto-js');
var webSocket = require('ws');
var hex2bin = require('./hex2bin');

/*
    block
*/
//block of blockchain
function block(index, prevHash, time, data, hash, difficulty, nonce) {
    this.index = index;
    this.prevHash = prevHash;
    this.time = time;
    this.data = data;
    this.hash = hash;
    this.difficulty = difficulty;
    this.nonce = nonce;
}

/*
    block data
*/
//data for block of blockchain
function blockData(uid, eleid, conid, parid) {
    this.uid = uid;
    this.eleid = eleid;
    this.conid = conid;
    this.parid = parid;
}

/*
    blockchain
*/
//calculate hash of block
function blockHash(block) {
    return genHash(block.data);
}

//generate Hash of block
function genHash(data) {
    return CryptoJS.SHA256(data.uid + data.eleid).toString();
}

//block 0
function setGenBlock() {
    return new block(0, "0", 0, "genesis block", CryptoJS.SHA256("0").toString(), 0, 0);
}

//variable
var blockchain = [setGenBlock()];
var BLOCK_GENERATION_INTERVAL = 10;
var DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

//get difficulty
function getDifficulty(block) {
    if (block.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && block.index !== 0) {
        return getAdjustedDifficulty(block);
    } else {
        return block.difficulty;
    }
}

//adjust difficulty
function getAdjustedDifficulty(block) {
    var prevAdjustmentBlock = blockchain[blockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
    var timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
    var timeTaken = block.time - prevAdjustmentBlock.time;
    if (timeTaken < timeExpected / 2) {
        return prevAdjustmentBlock.difficulty + 1;
    } else if (timeTaken > timeExpected * 2) {
        return prevAdjustmentBlock.difficulty - 1;
    } else {
        return prevAdjustmentBlock.difficulty;
    }
}

//current time
function getCurrentTime() {
    return new Date().getTime();
}

//get last blocks
function getLastBlock() {
    return blockchain[blockchain.length - 1];
}

//generate blocks
function genBlocks(uid, eleid, conid, parid) {
    var index = getLastBlock().index + 1;
    var prevHash = getLastBlock().hash;
    var time = getCurrentTime();
    var data = new blockData(uid, eleid, conid, parid);
    //var hash = genHash(data);
    var difficulty = getDifficulty(getLastBlock());
    return findBlock(index, prevHash, time, data, difficulty);
    //return new block(index, prevHash, time, data, hash, difficulty, nonce);
}

//find block
function findBlock(index, prevHash, time, data, difficulty) {
    var nonce = 0;
    while(true) {
        var hash = genHash(data);
        if(hashMatchesDifficulty(hash, difficulty)) {
            return new block(index, prevHash, time, data, hash, difficulty, nonce);
        }
        nonce++;
    }
}

//validate block added to blockchain
function isValidBlock(newBlock, prevBlock) {
    if (prevBlock.index + 1 !== newBlock.index) {
        console.log("indexNotMatchError");
        return false;
    } else if (prevBlock.hash !== newBlock.prevHash) {
        console.log("prevHashNotMatchError");
        return false;
    } else if(!isValidTimestamp(newBlock,prevBlock)) {
        console.log("newBlockTimestampError");
        return false;
    }else if (!hasValidHash(newBlock)) {
        console.log("hashMismatchError");
        return false;
    }
    return true;
}

//validate timestamp 
function isValidTimestamp(newBlock, prevBlock) {
    return (prevBlock.time-1000 < newBlock.time) && (newBlock.time-1000 < getCurrentTime());
}

//is hash valid
function hasValidHash(block) {
    if(!hashMatchBlockContent(block)) {
        console.log("Invalid hash");
        return false;
    }
    if(!hashMatchesDifficulty(block.hash,block.difficulty)) {
        console.log("Block difficulty error");
        return false;
    }
    return true;
}

//hashMatchBlockContent
function hashMatchBlockContent(block) {
    return blockHash(block) === block.hash;
}

//hashMatchesDifficulty
function hashMatchesDifficulty(hash, difficulty) {
    var hashInBin = hex2bin.hex2bin(hash);
    var reqPrefix = '0'.repeat(difficulty);
    return hashInBin.startsWith(reqPrefix);
}

//check if hash has repeated
function isHashRepeated(newBlock) {
    for (var i = 1; i < blockchain.length; i++) {
        if (blockchain[i].hash === newBlock.hash) {
            return false;
        }
    }
    return true;
}

//add block to blockchain
function addBlock(newBlock) {
    if (isValidBlock(newBlock, getLastBlock()) && isHashRepeated(newBlock)) {
        blockchain.push(newBlock);
        return true;
    }
    return false;
}

//validate chain
function isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(setGenBlock())) {
        return false;
    }
    var tempChain = [chain[0]];
    for (var i = 1; i < chain.length; i++) {
        if (isValidBlock(chain[i], tempChain[i - 1])) {
            tempChain.push(chain[i]);
        } else {
            return false;
        }
    }
    return true;
}

//get blockchain
function getChain() {
    return blockchain;
}

//getAccumulatedDifficulty
function getAccumulatedDifficulty(chain) {
    return chain.map((block) => block.difficulty)
        .map((difficulty) => Math.pow(2,difficulty))
        .reduce((a,b) => a+b);
}

//long chain rule
/*function replaceChain(chain) {
    if (isValidChain(chain) && chain.length > blockchain.length) {
        blockchain = chain;
        console.log("fetchingLongerChain");
        broadcast(responseLatestMsg());
    } else {
        console.log("fetchChainError");
    }
}*/
function replaceChain(chain) {
    if (isValidChain(chain) && getAccumulatedDifficulty(chain) > getAccumulatedDifficulty(getChain())) {
        blockchain = chain;
        console.log("fetchingLongerChain");
        broadcast(responseLatestMsg());
    } else {
        console.log("fetchChainError");
    }
}

/*
    messageType
*/
//constants
const QUERY_LATEST = 0;
const QUERY_ALL = 1;
const RESPONSE_BLOCKCHAIN = 2;

/*
    message
*/
//ask peer for latest block
function queryChainLengthMsg() {
    return {
        'type': QUERY_LATEST
    }
}

//ask peer for entire blockchain
function queryAllMsg() {
    return {
        'type': QUERY_ALL
    }
}

//send peer entire blockchain
function responseChainMsg() {
    return {
        'type': RESPONSE_BLOCKCHAIN,
        'data': JSON.stringify(getChain())
    }
}

//send peer latest block
function responseLatestMsg() {
    return {
        'type': RESPONSE_BLOCKCHAIN,
        'data': JSON.stringify([getLastBlock()])
    }
}

/*
    sockets
*/
//variable
var sockets = [];

//P2P server
function server(ip, ipPort) {
    var server = new webSocket.Server({ port: ipPort, host: ip });
    server.on('connection', ws => initConnection(ws));
    console.log('Your p2p socket is ws://' + ip + ':' + ipPort);
}

//init Connection
function initConnection(ws) {
    sockets.push(ws);
    initMessageHandler(ws);
    initErrorHandler(ws);
    write(ws, queryChainLengthMsg());
}

//connecting peers
function connectToPeer(newPeer) {
    var ws = new webSocket(newPeer);
    ws.on('open', () => initConnection(ws));
    ws.on('error', () => {
        console.log('Peer connection failed!');
    });
}

//write message
function write(ws, msg) {
    ws.send(JSON.stringify(msg));
}

//broadcast message
function broadcast(msg) {
    sockets.forEach(socket => write(socket, msg));
}

//message handler
function initMessageHandler(ws) {
    ws.on('message', (data) => {
        var msg = JSON.parse(data);
        console.log('Incoming Message:' + JSON.stringify(msg));
        switch (msg.type) {
            case QUERY_LATEST:
                write(ws, responseLatestMsg());
                break;
            case QUERY_ALL:
                write(ws, responseChainMsg());
                break;
            case RESPONSE_BLOCKCHAIN:
                handleBlockchainResponse(msg);
                break;
        }
    });
}

//error handler
function initErrorHandler(ws) {
    var closeConnection = (ws) => {
        var peer;
        if (ws.url === undefined) {
            peer = 'Client disconnected';
        } else {
            peer = 'Disconnecting from ' + ws.url;
        }
        console.log(peer);
        sockets.splice(sockets.indexOf(ws), 1);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
}

//handle blockchain response
function handleBlockchainResponse(message) {
    var receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.index - b2.index));
    var latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    var latestBlockHeld = getLastBlock();
    if (latestBlockReceived.index > latestBlockHeld.index) {
        console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
        if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
            console.log("We can append the received block to our chain");
            blockchain.push(latestBlockReceived);
            broadcast(responseLatestMsg());
        } else if (receivedBlocks.length === 1) {
            console.log("We have to query the chain from our peer");
            broadcast(queryAllMsg());
        } else {
            console.log("Received blockchain is longer than current blockchain");
            replaceChain(receivedBlocks);
        }
    } else {
        console.log('received blockchain is not longer than received blockchain. Do nothing');
    }
}

module.exports = {
    block: block,
    blockData: blockData,
    blockHash: blockHash,
    genHash: genHash,
    setGenBlock: setGenBlock,
    getLastBlock: getLastBlock,
    genBlocks: genBlocks,
    isValidBlock: isValidBlock,
    addBlock: addBlock,
    isValidChain: isValidChain,
    getChain: getChain,
    replaceChain: replaceChain,
    queryChainLengthMsg: queryChainLengthMsg,
    queryAllMsg: queryAllMsg,
    responseChainMsg: responseChainMsg,
    responseLatestMsg: responseLatestMsg,
    server: server,
    initConnection: initConnection,
    connectToPeer: connectToPeer,
    write: write,
    broadcast: broadcast,
    initMessageHandler: initMessageHandler,
    initErrorHandler: initErrorHandler,
    isHashRepeated: isHashRepeated
};

