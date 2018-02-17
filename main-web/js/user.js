$(document).ready(function () {
    getUserName();
    getElections();
});

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
        url: "../getElection",
        type: "GET",
        success: function (data) {
        }
    });
}