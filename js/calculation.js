//get eleid
function genEleMap(chain) {
    var ele = new Map();
    for (var i = 1; i < chain.length; i++) {
        if (!ele.has(chain[i].data.eleid)) {
            ele.set(chain[i].data.eleid, chain[i].data.eleid);
        }
    }
    return ele;
}

//get conid
function genConMap(chain) {
    var con = new Map();
    for (var i = 1; i < chain.length; i++) {
        if (!con.has(chain[i].data.conid)) {
            con.set(chain[i].data.conid, chain[i].data.conid);
        }
    }
    return con;
}

//get parid
function genParMap(chain) {
    var par = new Map();
    for (var i = 1; i < chain.length; i++) {
        if (!par.has(chain[i].data.parid)) {
            par.set(chain[i].data.parid, chain[i].data.parid);
        }
    }
    return par;
}

//compute no of eleid+conid+parid in map
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

//get parid for eleid+conid of max(eleid+conid+parid)
function computePartyMax(chain) {
    var ele = genEleMap(chain);
    var con = genConMap(chain);
    var par = genParMap(chain);
    var eleConParMap = genMap(chain);
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

//get count of conid for eleid+parid
function computeNumberOfConstituency(chain) {
    var ele = genEleMap(chain);
    var con = genConMap(chain);
    var par = genParMap(chain);
    var eleConMap = computePartyMax(chain);
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

//get parid of max(conid) for eleid
function computeConstituencyMax(chain) {
    var ele = genEleMap(chain);
    var con = genConMap(chain);
    var par = genParMap(chain);
    var eleParMap = computeNumberOfConstituency(chain);
    var eleMap = new Map();
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

//exports
module.exports = {
    genMap: genMap,
    computePartyMax: computePartyMax,
    computeNumberOfConstituency: computeNumberOfConstituency,
    computeConstituencyMax: computeConstituencyMax
};