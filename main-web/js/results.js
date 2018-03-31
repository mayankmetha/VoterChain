$(document).ready( function() {
    if(sessionStorage.getItem('type') == null) {
        sessionStorage.setItem('type','0');
    }
    getElections();
});

function getElections() {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'https://localhost/cal/4',
        success: function (data) {
            var str = "";
            $("#eleMenu").text('');
            for (var i = 0; i < data.length; i++) {
                str += "<a href='' onclick=getElectionData('"+data[i].key+"','"+data[i].value+"')>"+data[i].key+"</a>";
            }
            $("#eleMenu").append(str); 
            if(sessionStorage.getItem('ele') == null) {
                sessionStorage.setItem('ele',data[0].key);
                sessionStorage.setItem('eleWin',data[0].value);
            }
            getConstituency(sessionStorage.getItem('ele'),sessionStorage.getItem('eleWin'));
            if (sessionStorage.getItem('type') == '0') {
                getElectionData(sessionStorage.getItem('ele'),sessionStorage.getItem('eleWin'));
            }
        }
    });
    setTimeout(getElections,5000);
}

function getConstituency(ele, win) {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'https://localhost/cal/2',
        success: function (data) {
            $("#conMenu").text('');
            var str = "<a href='' onclick=getElectionData('"+ele+"','"+win+"')>"+ele+"</div>";
            for (var i = 0; i < data.length; i++) {
                var temp = data[i].key;
                if (temp.startsWith(ele)) {
                    str += "<a href='' onclick=getConstituencyData('"+temp.replace(ele,'')+"','"+data[i].value+"')>"+temp.replace(ele,'')+"</a>";
                }
            }
            $("#conMenu").append(str);
            if(sessionStorage.getItem('con') == null) {
                sessionStorage.setItem('con',data[0].key);
                sessionStorage.setItem('conWin',data[0].value);
            }
            if (sessionStorage.getItem('type') == '1') {
                getConstituencyData(sessionStorage.getItem('con'),sessionStorage.getItem('conWin'));
            }
        }
    });
}

function getElectionData(ele, win) {
    sessionStorage.setItem('ele',ele);
    sessionStorage.setItem('eleWin',win);
    sessionStorage.setItem('type','0');
    var title = ["ELECTION: "+ele,"LEADING: "+win];
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
            drawGraph(title, label, value, color);
        }
    });
}

function getConstituencyData(con, win) {
    sessionStorage.setItem('con',con);
    sessionStorage.setItem('conWin',win);
    sessionStorage.setItem('type','1');
    var title = ["ELECTION: "+sessionStorage.getItem('ele'),"CONSTITUENCY: "+con,"LEADING: "+win];
    var label = [];
    var value = [];
    var color = [];
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'https://localhost/cal/1',
        success: function (childData) {
            for (var j = 0; j < childData.length; j++) {
                var temp = childData[j].key;
                var startFilter = sessionStorage.getItem('ele') + con;
                if (temp.startsWith(startFilter)) {
                    label.push(temp.replace(startFilter, ''));
                    value.push(childData[j].value);
                    color.push(generateRandColorsWithoutBW());
                }
            }
            $("#chart").text('');
            drawGraph(title, label, value, color);
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

function drawGraph(title, label, value, color) {
    $('#chart').append("<canvas id=graph></canvas>");
    var title = title;
    var chart = new Chart(document.getElementById('graph').getContext('2d'), {
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