$(document).ready(function () {
    getUserName();
});

function getUserName() {
    $.ajax({
        dataType: "json",
        url: "/username",
        type: "GET",
        success: function (data) {
            $("#user").html(""+data+"<br />MAKE YOUR VOTE COUNT");
        }
    });
}