//on document ready
$(document).ready(function () {
    sessionStorage.clear();
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
    analysis();
    $("#blocks").click(function () {
        window.location.href = "/blocks";
    });
    $("#eleTable").click(function () {
        window.location.href = "/results";
    });
});

//on window resize
$(window).resize(function () {
    var width = $(window).width();
    var height = $(window).height();
    if (width <= 640) {
        //mobile screen
        mobile();
    } else {
        //desktop screen
        desktop();
    }
    if (width == 640) {
        $.scrollify.instantMove("#1");
    }
});

//mobile device screen scrolling
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

//desktop device screen scrolling
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

//get block count
function getCount() {
    $.ajax({
        dataType: "json",
        url: "/countHome",
        type: "GET",
        success: function (data) {
            var des = "Technology that was first<br />used by Bitcoin which<br />is a public ledger of<br />transactions.";
            var str = des + "<br /><br/>Block count<br />" + data;
            $("#counter").html(str);
        }
    });
    setTimeout(getCount, 1000);
}

//get blocks
function getBlock() {
    $.ajax({
        dataType: "json",
        url: "/blockHome",
        type: "GET",
        success: function (data) {
            $("#blocks").text("");
            drawBlockTable(data);
        }
    });
    setTimeout(getBlock, 1000);
}

//draw tables
function drawBlockTable(data) {
    var rows = data.length - 1;
    var limit;
    if (rows <= 9) {
        limit = 0;
    } else {
        limit = data.length - 10;
    }
    var str = "<table><thead><td>TIME</td><td>HASH</td></thead><tbody>";
    for (var i = rows; i >= limit; i--) {
        var hash = data[i].hash;
        var row = "<tr><td>" + data[i].time + "</td><td>" + hash.substr(0, 7) + "..." + "</td></tr>";
        str += row;
    }
    str += "</tbody></table>";
    $("#blocks").append(str);
}

//get election counter
function analysis() {
    $.ajax({
        dataType: "json",
        url: "/cal/4",
        type: "GET",
        success: function (data) {
            $("#eleSummary").text("");
            var des = "Get the live results<br />as and when votes<br />are casted.<br /><br />";
            var str = des + data.length + " elections<br>have been recorded."
            $("#eleSummary").html(str);
            $("#eleTable").text("");
            drawEleTable(data);
        }
    });
    setTimeout(analysis,1000);
}

//draw election table
function drawEleTable(data) {
    var rows = data.length - 1;
    var limit;
    if (rows <= 9) {
        limit = 0;
    } else {
        limit = data.length - 10;
    }
    var str = "<table><thead><td>ELECTION</td><td>LEADING</td></thead><tbody>";
    for (var i = rows; i >= limit; i--) {
        var row = "<tr><td>" + data[i].key + "</td><td>" + data[i].value + "</td></tr>";
        str += row;
    }
    str += "</tbody></table>";
    $("#eleTable").append(str);
}