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
    var str = "<table><tbody>";
    for (var i = rows; i >= 0; i--) {
        var hash = data[i].hash;
        var row = "<tr><td data-column='index'>"+data[i].index+"</td>"+"<td data-column='prevHash'>"+data[i].prevHash+"</td>"+"<td data-column='time'>"+data[i].time+"</td>"+"<td data-column='hash'>"+data[i].hash+"</td><tr>";
        str += row;
    }
    str += "</tbody></table>";
    $("#blocks").append(str);
}
