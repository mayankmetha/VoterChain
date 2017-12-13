var blockchain = require('./blockchain');

var chain = blockchain.getChain();

function election() {
    this.constituency = new constituency()[];
    this.constituencySum = [];
    this.result = null;
}

function constituency() {
    this.party = [];
    this.result = null;
}

var election = new election()[];

function calculate() {
    for(var i=1;i<chain.length;i++) {
        var eleid = chain[i].data.eleid;
        var conid = chain[i].data.conid;
        var parid = chain[i].data.parid;
        //get sum of votes per party per constituency per election
        election[eleid].constituency[conid].party[parid]++;
    }
    for(eleid in election) {
        for(conid in election[eleid].constituency) {
            //step1: get key of max value of party in every constituency and store in result
            //step2: get number of constituency a party secured and store in constituencySum
        }
        //step3: get key of max value of constituencySum of every election and store in result
    }
}

//export election[] to display various results

