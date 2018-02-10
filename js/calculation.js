function eleMap(chain) {
    var ele = new Map();
    for (var i = 1; i < chain.length; i++) {
        if (!ele.has(chain[i].data.eleid)) {
            ele.set(chain[i].data.eleid, chain[i].data.eleid);
        }
    }
    return ele;
}

function conMap(chain) {
    var con = new Map();
    for (var i = 1; i < chain.length; i++) {
        if (!con.has(chain[i].data.conid)) {
            con.set(chain[i].data.conid, chain[i].data.conid);
        }
    }
    return con;
}

function parMap(chain) {
    var par = new Map();
    for (var i = 1; i < chain.length; i++) {
        if (!par.has(chain[i].data.parid)) {
            par.set(chain[i].data.parid, chain[i].data.parid);
        }
    }
    return par;
}

function genMap(chain) {
    var eleConParMap = new Map();
    for (var i = 1; i < chain.length; i++) {
        var key = chain[i].data.eleid + "" + chain[i].data.conid + "" + chain[i].data.parid;
        if (eleConParMap.has(key)) {
            var val = eleConParMap.get(key);
            val++;
            eleConParMap.set(key, val);
        } else {
            eleConParMap.set(key, 1);
        }
    }
    return eleConParMap;
}

function computePartyMax(eleConParMap, ele, con, par) {
    var eleConMap = new Map();
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
    return eleConMap;
}

function computeNumberOfConstituency(eleConMap, ele, con, par) {
    var eleParMap = new Map();
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
    return eleParMap;
}

function computeConstituencyMax(eleParMap, ele, par) {
    var eleMap = new eleMap();
    ele.forEach(function(eleKey) {
        var party = "";
        var max = -1;
        par.forEach(function(parKey) {
            if(eleParMap.has(eleKey+""+parKey)) {
                if(max < eleParMap.get(eleKey+""+parKey)) {
                    max = eleParMap.get(eleKey+""+parKey);
                    party = parKey;
                }
            }
        });
        if(party !== "") {
            eleMap.set(eleKey,party);
        }
    });
    return eleMap;
}

module.exports = {
    eleMap: eleMap,
    conMap: conMap,
    parMap: parMap,
    genMap: genMap,
    computePartyMax: computePartyMax,
    computeNumberOfConstituency: computeNumberOfConstituency,
    computeConstituencyMax: computeConstituencyMax
};