//ds for map to json
function ds(key, value) {
    this.key = key;
    this.value = value;
}

//concat json content
function concatDS(key, value) {
    return new ds(key, value);
}

//convert to json
function map2json(map) {
    var temp = [];
    map.forEach(function(value,key) {
        temp.push(concatDS(key,value));
    });
    return JSON.stringify(temp);
}

//export
module.exports = {
    map2json: map2json
};