var temp = [];
function ds(key, value) {
    this.key = key;
    this.value = value;
}

function concatDS(key, value) {
    return new ds(key, value);
}

function map2json(map) {
    map.forEach(function(value,key) {
        temp.push(concatDS(key,value));
    });
    return JSON.stringify(temp);
}

module.exports = {
    map2json: map2json
};