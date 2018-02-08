//TODO: incomplete and broken
function genMap(chain) {
    var eleMap = new Map();
    var eleKey = 0;
    var conMap = new Map();
    var conKey = 0;
    var parMap = new Map();
    var parKey = 0;

    for(var i = 1; i < chain.length; i++) {
        if(!eleMap.has(chain[i].data.eleid)) {
            eleMap.set(chain[i].data.eleid, eleKey);
            console.log(eleMap.entries());
            eleKey++;
        }
        if(!conMap.has(chain[i].data.conid)) {
            conMap.set(chain[i].data.conid, conKey);
            console.log(conMap.entries());
            conKey++;
        }
        if(!parMap.has(chain[i].data.parid)) {
            parMap.set(chain[i].data.parid, parKey);
            console.log(parMap.entries());
            parKey++;
        }
    }
}

module.exports = {
    genMap: genMap
};