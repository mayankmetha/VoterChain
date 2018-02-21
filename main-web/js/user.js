var conid;
var count = 0;
var ele;
$(document).ready(function () {
    getUserName();
    getElections();
    getConid();
});

function getConid() {
    $.ajax({
        dataType: "json",
        url: "/conid",
        type: "GET",
        success: function (data) {
            conid = data;
        }
    });
}

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

function getElections() {
    $.ajax({
        dataType: "json",
        url: "/getElections",
        type: "GET",
        success: function (data) {
            ele = data;
            for(var i = 0; i < data.length; i++) {
                var eleid = data[i].value;
                voteExist(eleid);
            }
        }
    });
}

function getCandidates(eleid) {
    $.ajax({
        dataType: "json",
        url: "/getcandidate/"+eleid,
        type: "GET",
        success: function (data) {
            generateForm(eleid, data);
        }
    });
}

function generateForm(eleid, data) {
    var url = "https://localhost"+window.location.pathname+"/"+conid+"/"+eleid;
    var html = "<form id="+eleid+" class=votecard method=POST action="+url+">";
    html += "<div class=h4>"+eleid+"</div><div class=radio>";
    for(var i = 0; i < data.length; i++) {
        if(i == 0) {
            html += "<label><input type=radio name=parid value="+data[i].key+" checked />"+data[i].value+"</label>";
        } else {
            html += "<label><input type=radio name=parid value="+data[i].key+" />"+data[i].value+"</label>";
        }
    }
    html += "</div><div class=submit><input type=submit value=submit /></div></form>";
    $('#elections').append(html);
}

function voteExist(eleid) {
    var result = $.ajax({
        dataType: "json",
        url: "/blk/"+eleid,
        type: "GET",
    });

    result.then(function (data) {
        if(data == false) getCandidates(eleid);
        else count++;
        if(count == ele.length) {
            $('#elections').append("<div class=h3>NO ACTIVE ELECTION</div>")
        }
    });
}