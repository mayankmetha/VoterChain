var conid;
var count = 0;
var ele;
var path = "https://localhost"+window.location.pathname+"";
$(document).ready(function () {
    getUserName();
    getElections();
    getConid();
    $("#logout").on('click', function() {
        window.location.href = path + "/logout";
    });
});

function getConid() {
    var url = path + "/conid";
    $.ajax({
        dataType: "json",
        url: url,
        type: "GET",
        success: function (data) {
            conid = data;
        }
    });
}

function getUserName() {
    var url = path + "/username";
    $.ajax({
        dataType: "json",
        url: url,
        type: "GET",
        success: function (data) {
            $("#user").html(""+data+"<br />MAKE YOUR VOTE COUNT");
        }
    });
}

function getElections() {
    var url = path + "/getelections";
    $.ajax({
        dataType: "json",
        url: url,
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
    var url = path + "/getcandidate/" + eleid;
    $.ajax({
        dataType: "json",
        url: url,
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
            html += "<input type=radio name=parid id="+eleid+data[i].key+" value="+data[i].key+" checked />";
            html += "<label for="+eleid+data[i].key+">"+data[i].value+"</label>";
        } else {
            html += "<input type=radio name=parid id="+eleid+data[i].key+" value="+data[i].key+" />";
            html += "<label for="+eleid+data[i].key+">"+data[i].value+"</label>";
        }
        
    }
    html += "</div><div class=submit><input type=submit value=VOTE /></div></form>";
    $('#elections').append(html);
}

function voteExist(eleid) {
    var url = path + "/blk/" + eleid;
    var result = $.ajax({
        dataType: "json",
        url: url,
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