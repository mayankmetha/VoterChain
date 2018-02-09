//TODO: incomplete and broken
function calculateInit(chain) {
    var eleConParMap = new Map();
    var eleParMap = new Map();
    var eleConMap = new Map();
    var eleMap = new Map();
    var ele = new Map();
    var con = new Map();
    var par = new Map();
    genMap(chain, eleConParMap, ele, con, par);
    computePartyMax(eleConParMap, eleConMap, ele, con, par);
    computeNumberOfConstituency(eleConMap, eleParMap, ele, con, par);
}

function genMap(chain, eleConParMap, ele, con, par) {
    for (var i = 0; i < chain.length; i++) {
        var key = chain[i].data.eleid + "" + chain[i].data.conid + "" + chain[i].data.parid;
        if (eleConParMap.has(key)) {
            var val = eleConParMap.get(key);
            val++;
            eleConParMap.set(key, val);
        } else {
            eleConParMap.set(key, 1);
        }
        if (!ele.has(chain[i].data.eleid)) {
            ele.set(chain[i].data.eleid, chain[i].data.eleid);
        }
        if (!con.has(chain[i].data.conid)) {
            con.set(chain[i].data.conid, chain[i].data.conid);
        }
        if (!par.has(chain[i].data.parid)) {
            par.set(chain[i].data.parid, chain[i].data.parid);
        }
    }
    console.log(eleConParMap.entries());
}

function computePartyMax(eleConParMap, eleConMap, ele, con, par) {
    ele.forEach(function(eleKey) {
        con.forEach(function(conKey) {
            var str = eleKey+""+conKey;
            var max = -1;
            var party = "";
            par.forEach(function(parKey) {
                if(eleConParMap.has(str+""+parKey)) {
                    if(max < eleConParMap.get(str+""+parKey)) {
                        max = eleConParMap.get(str+""+parKey);
                        party = parKey;
                    }
                }
            });
            if(party !== "") {
                eleConMap.set(str,party);
            }
        });
    });
    console.log(eleConMap.entries());
}

function computeNumberOfConstituency(eleConMap, eleParMap, ele, con, par) {
    ele.forEach(function(eleKey) {
        par.forEach(function(parKey) {
            var count = 0;
            con.forEach(function(conKey) {
                if(eleConMap.has(eleKey+""+conKey) && parKey == eleConMap.get(eleKey+""+conKey)) {
                    count++;
                }
            });
            if(count != 0) {
                eleParMap.set(eleKey+""+parKey,count);
            }
        });
    });
    console.log(eleParMap.entries());
}

function computeConstituencyMax() {}

module.exports = {
    calculateInit: calculateInit
};