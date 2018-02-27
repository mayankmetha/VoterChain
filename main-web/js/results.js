$(document).ready(function () {   
    getElectionWinner();
    getElectionWinnerData();
});
var path = "https://localhost";
function getElectionWinner() {
    var url = path + "/cal/4";
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: url,
        success: function(data) {

        }
    });
}

function getElectionWinnerData() {
    var url = path + "/cal/3";
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: url,
        success: function(data) {
            console.log(data);
            var key = new Array();
            var value = new Array();
            for (var i = 0; i < data.length; i++) {
                key.push(data[i].key);
                value.push(data[i].value);
            }
            drawChart(key,value);
        }
    });
}
