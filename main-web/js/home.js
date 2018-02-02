$(document).ready(function () {
    var width = $(window).width();
    var height = $(window).height();
    if (width <= 640) {
        //mobile screen
        mobile();
    } else {
        //desktop screen
        desktop();
    }
    getCount();
    getBlock();
});
$(window).resize(function () {
    var width = $(window).width();
    var height = $(window).height();
    $.scrollify.instantMove("#1");
    if (width <= 640) {
        //mobile screen
        mobile();
    } else {
        //desktop screen
        desktop();
    }
});

function mobile() {
    $.scrollify({
        section: ".mobile",
        scrollSpeed: 1100,
        offset: 0,
        scrollbars: true,
        touchScroll: true,
        updateHash: false,
        setHeights: false,
        easing: "easeOutExpo"
    });
}

function desktop() {
    $.scrollify({
        section: ".desktop",
        scrollSpeed: 1100,
        offset: 0,
        scrollbars: true,
        touchScroll: true,
        updateHash: false,
        setHeights: false,
        easing: 'easeOutExpo'
    });
}

function getCount() {
    $.ajax({
        dataType: "json",
        url: "/count",
        type: "GET",
        success: function (data) {
            var str = "Block count: " + data;
            $("#counter").text(str);
        }
    });
    setTimeout(getCount, 1000);
}

function getBlock() {
    $.ajax({
        dataType: "json",
        url: "/blocks",
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
    var limit;
    if (rows <= 9) {
        limit = 0;
    } else {
        limit = data.length - 10;
    }
    var str = "<table><thead><td>Block</td><td>Time</td><td>Hash</td></thead><tbody>";
    for (var i = rows; i >= limit; i--) {
        var hash = data[i].hash;
        var row = "<tr><td>"+data[i].index + "</td><td>" + data[i].time + "</td><td>" + hash.substr(0, 10) + "..." + "</td></tr>";
        str += row;
    }
    str += "</tbody></table>";
    $("#blocks").append(str);
}


