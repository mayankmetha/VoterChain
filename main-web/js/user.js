$(document).ready(function () {
    getUserName();
    getElections();
});

var election;

function getUserName() {
    $.ajax({
        dataType: "json",
        url: "../username",
        type: "GET",
        success: function (data) {
            $("#user").html(""+data+"<br />MAKE YOUR VOTE COUNT");
        }
    });
}

function getElections() {
    $.ajax({
        dataType: "json",
        url: "../getElections",
        type: "GET",
        success: function (data) {
            election = data;
            var str = "";
            for(var i = 0; i < data.length; i++) {
                str += data[i].value + "<br />";
            }
            $("#elections").html(str);
            console.log(election);
        }
    });
}