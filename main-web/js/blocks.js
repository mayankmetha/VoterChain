$(document).ready(function () {
    getBlock();
});

function getBlock() {
    $.ajax({
        dataType: "json",
        url: "/blockHome",
        type: "GET",
        success: function (data) {
            $("#blocks").text("");
            drawTable(data);
        }
    });
    setTimeout(getBlock, 1000);
}

function drawTable(data) {
    var rows = data.length - 1;
    var str = "";
    for (var i = rows; i >= 0; i--) {
        var style;
        if(i%2==0) {
            style = "odd";
        } else {
            style = "even";
        }
        var row = "<table class="+style+">";
        row += "<tr><td class=header>Index</td><td class=content>"+data[i].index+"</td></tr>";
        row += "<tr><td class=header>Previous Hash</td><td class=content>"+data[i].prevHash+"</td></tr>";
        row += "<tr><td class=header>Time</td><td class=content>"+data[i].time+"</td></tr>";
        row += "<tr><td class=header>User ID</td><td class=content>"+data[i].data.uid+"</td></tr>";
        row += "<tr><td class=header>Election ID</td><td class=content>"+data[i].data.eleid+"</td></tr>";
        row += "<tr><td class=header>Constituency ID</td><td class=content>"+data[i].data.conid+"</td></tr>";
        row += "<tr><td class=header>Party ID</td><td class=content>"+data[i].data.parid+"</td></tr>";
        row += "<tr><td class=header>Hash</td><td class=content>"+data[i].hash+"</td></tr></table>";
        str += row;
    }
    str += "</tbody></table>";
    $("#blocks").append(str);
}
