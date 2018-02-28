$(document).ready(function () {
    getElection();
});

function getElection() {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'https://localhost/cal/4',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                getElectionData(data[i].key);
            }
        }
    });
}

function getElectionData(ele) {
    var label = [];
    var value = [];
    var color = [];
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'https://localhost/cal/3',
        success: function (childData) {
            for (var j = 0; j < childData.length; j++) {
                var temp = childData[j].key;
                if (temp.startsWith(ele)) {
                    label.push(temp.replace(ele, ''));
                    value.push(childData[j].value);
                    color.push(generateRandColorsWithoutBW());
                }
            }
            drawGraph(ele, label, value, color);
        }
    });
}

function drawGraph(ele, label, value, color) {
    $('#chart').append("<canvas id=" + ele + "></canvas><br /><br />");
    var chart = new Chart(document.getElementById(ele).getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                backgroundColor: color,
                data: value,
                borderWidth: 0
            }]
        },
        options: {
            legend: {
                display: true,
                position: 'bottom'
            },
            title: {
                display: true,
                text: ele,
                fontSize: 24
            }
        }
    });
}

function generateRandColorsWithoutBW() {
    var color;
    do {
        color = generateRandColors();
    }while(color == '#FFFFFF' || color == '#000000');
    return color;
}

function generateRandColors() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}