$(document).ready(function () {   
    getElection();
});

function getElection() {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'https://localhost/cal/4',
        success: function (data) {
            var str = "";
            $("#eleMenu").text('');
            for (var i = 0; i < data.length; i++) {
                str += "<a href=# onclick=getElectionData('"+data[i].key+"','"+data[i].value+"')>"+data[i].key+"</div>";
            }
            $("#eleMenu").append(str);
            if(sessionStorage.getItem('currentEle') == null) {
                getElectionData(data[data.length - 1].key,data[data.length - 1].value);
            } else {
                getElectionData(sessionStorage.getItem('currentEle'),sessionStorage.getItem('currentWinner'));
            }
        }
    });
    setTimeout(getElection,5000);
}

function getElectionData(ele, winner) {
    sessionStorage.setItem('currentEle',ele);
    sessionStorage.setItem('currentWinner',winner);
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
            $("#chart").text('');
            drawGraph(ele, winner, label, value, color);
        }
    });
}

function drawGraph(ele, winner, label, value, color) {
    $('#chart').append("<canvas id=" + ele + "></canvas>");
    var title = ["ELECTION:"+ele,"WINNER:"+winner];
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
                position: 'bottom',
            },
            title: {
                display: true,
                text: title,
                fontSize: 24
            },
            maintainAspectRatio : false,
            responsive: true
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