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

function drawChart(key,value) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: key,
            datasets: [{
                label: "Votes",
                backgroundColor: ['rgb(255, 99, 132)','rgb(255, 99, 0)'],
                borderColor: ['rgb(255, 99, 132)','rgb(255, 99, 0)'],
                data: value,
            }]
        },
    });
}