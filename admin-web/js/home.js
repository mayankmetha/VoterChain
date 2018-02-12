//variables
var admin;
var db;
var userid;

//main
function main() {
    //reset forms
    resetAddUserForm();
    resetmodconidForm();
    resetpwdusr();
    resetrmusr();
    resetAddCanForm();
    resetModCanForm();
    resetrmCanForm();
    resetStartEleForm();
    resetStopEleForm();
    //get login status
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = "Sign Out " + user.displayName;
            document.getElementById('logoutBtn').textContent = displayName;
            admin = firebase.auth().currentUser;
            db = firebase.database();
        } else {
            // User is signed out.
            admin = null;
            db = null;
            window.location = "/";
        }
    }, function (error) {
        console.log(error);
    });
}

//logout
function logout() {
    if (admin != null) {
        firebase.auth().signOut();
    }
}

//add users form
function addusr() {
    var userFlag = false, pwdFlag = false, pwd2Flag = false, pwdEqual = false, conidFlag = false;
    var user = document.getElementById('adduser').value;
    var uid = CryptoJS.SHA512(user).toString();
    var pwd = document.getElementById('addpwd').value;
    var pwd2 = document.getElementById('addpwd2').value;
    var conid = document.getElementById('addconid').value;
    if (user === "") {
        document.getElementById('adduser').classList.remove('w3-text-blue');
        document.getElementById('adduser').classList.add('w3-text-red');
        document.getElementById('adduser-label').style.visibility = '';
        userFlag = false;
    } else {
        document.getElementById('adduser').classList.add('w3-text-blue');
        document.getElementById('adduser').classList.remove('w3-text-red');
        document.getElementById('adduser-label').style.visibility = 'hidden';
        userFlag = true;
    }
    if (pwd === "") {
        document.getElementById('addpwd').classList.remove('w3-text-blue');
        document.getElementById('addpwd').classList.add('w3-text-red');
        document.getElementById('addpwd-label').style.visibility = '';
        pwdFlag = false;
    } else {
        document.getElementById('addpwd').classList.add('w3-text-blue');
        document.getElementById('addpwd').classList.remove('w3-text-red');
        document.getElementById('addpwd-label').style.visibility = 'hidden';
        pwdFlag = true;
    }
    if (pwd2 === "") {
        document.getElementById('addpwd2').classList.remove('w3-text-blue');
        document.getElementById('addpwd2').classList.add('w3-text-red');
        document.getElementById('addpwd2-label').style.visibility = '';
        pwd2Flag = false;
    } else {
        document.getElementById('addpwd2').classList.add('w3-text-blue');
        document.getElementById('addpwd2').classList.remove('w3-text-red');
        document.getElementById('addpwd2-label').style.visibility = 'hidden';
        pwd2Flag = true;
    }
    if (conid === "") {
        document.getElementById('addconid').classList.remove('w3-text-blue');
        document.getElementById('addconid').classList.add('w3-text-red');
        document.getElementById('addconid-label').style.visibility = '';
        conidFlag = false;
    } else {
        document.getElementById('addconid').classList.add('w3-text-blue');
        document.getElementById('addconid').classList.remove('w3-text-red');
        document.getElementById('addconid-label').style.visibility = 'hidden';
        conidFlag = true;
    }
    if (pwdFlag == true && pwd2Flag == true && pwd === pwd2) {
        document.getElementById('addpwd').classList.add('w3-text-blue');
        document.getElementById('addpwd').classList.remove('w3-text-red');
        document.getElementById('addpwd2').classList.add('w3-text-blue');
        document.getElementById('addpwd2').classList.remove('w3-text-red');
        document.getElementById('addpwd-label').style.visibility = 'hidden';
        document.getElementById('addpwd2-label').style.visibility = 'hidden';
        pwdEqual = true;
    } else {
        document.getElementById('addpwd').classList.remove('w3-text-blue');
        document.getElementById('addpwd').classList.add('w3-text-red');
        document.getElementById('addpwd2').classList.remove('w3-text-blue');
        document.getElementById('addpwd2').classList.add('w3-text-red');
        document.getElementById('addpwd-label').style.visibility = '';
        document.getElementById('addpwd2-label').style.visibility = '';
        pwdEqual = false;
    }
    if (admin != null && userFlag == true && conidFlag == true && pwdEqual == true) {
        pwd = CryptoJS.SHA512(pwd).toString();
        db.ref('users/' + user).set({
            uid: uid,
            pwd: pwd,
            conid: conid,
            falseAttempt: 0
        });
        document.getElementById('addUserModal').style.display = 'none';
        resetAddUserForm();
    }
}

//reset users form
function resetAddUserForm() {
    document.getElementById('adduserForm').reset();
    document.getElementById('adduser').classList.add('w3-text-blue');
    document.getElementById('adduser').classList.remove('w3-text-red');
    document.getElementById('addpwd').classList.add('w3-text-blue');
    document.getElementById('addpwd').classList.remove('w3-text-red');
    document.getElementById('addpwd2').classList.add('w3-text-blue');
    document.getElementById('addpwd2').classList.remove('w3-text-red');
    document.getElementById('addconid').classList.add('w3-text-blue');
    document.getElementById('addconid').classList.remove('w3-text-red');
    document.getElementById('adduser-label').style.visibility = 'hidden';
    document.getElementById('addpwd-label').style.visibility = 'hidden';
    document.getElementById('addpwd2-label').style.visibility = 'hidden';
    document.getElementById('addconid-label').style.visibility = 'hidden';
}

//modify user login form
function modLoginConidusr() {
    var userFlag = false, pwdFlag = false;
    var user = document.getElementById('modconiduser').value;
    var pwd = document.getElementById('modconidpwd').value;
    if (user === "") {
        document.getElementById('modconiduser-label').style.visibility = '';
        document.getElementById('modconiduser').classList.remove('w3-text-blue');
        document.getElementById('modconiduser').classList.add('w3-text-red');
        userFlag = false;
    } else {
        document.getElementById('modconiduser-label').style.visibility = 'hidden';
        document.getElementById('modconiduser').classList.add('w3-text-blue');
        document.getElementById('modconiduser').classList.remove('w3-text-red');
        userFlag = true;
    }
    if (pwd === "") {
        document.getElementById('modconidpwd-label').style.visibility = '';
        document.getElementById('modconidpwd').classList.remove('w3-text-blue');
        document.getElementById('modconidpwd').classList.add('w3-text-red');
        pwdFlag = false;
    } else {
        document.getElementById('modconidpwd-label').style.visibility = 'hidden';
        document.getElementById('modconidpwd').classList.add('w3-text-blue');
        document.getElementById('modconidpwd').classList.remove('w3-text-red');
        pwdFlag = true;
    }
    if (admin != null && userFlag == true && pwdFlag == true) {
        pwd = CryptoJS.SHA512(pwd).toString();
        db.ref('users/' + user).on('value', function (snapshot) {
            if (pwd === snapshot.val().pwd) {
                document.getElementById('modconidpwd-label').style.visibility = 'hidden';
                document.getElementById('modconidpwd').classList.add('w3-text-blue');
                document.getElementById('modconidpwd').classList.remove('w3-text-red');
                document.getElementById('modloginconidForm').style.display = 'none';
                document.getElementById('modconidForm').style.display = 'block';
                userid = user;
            } else {
                document.getElementById('modconidpwd-label').style.visibility = '';
                document.getElementById('modconidpwd').classList.remove('w3-text-blue');
                document.getElementById('modconidpwd').classList.add('w3-text-red');
            }
        });
    }
}

//modify user form
function modUsrConid() {
    var conidFlag = false;
    var conid = document.getElementById('modconid').value;
    if (conid === "") {
        document.getElementById('modconid-label').style.visibility = '';
        document.getElementById('modconid').classList.remove('w3-text-blue');
        document.getElementById('modconid').classList.add('w3-text-red');
        conidFlag = false;
    } else {
        document.getElementById('modconid-label').style.visibility = 'hidden';
        document.getElementById('modconid').classList.add('w3-text-blue');
        document.getElementById('modconid').classList.remove('w3-text-red');
        conidFlag = true;
    }
    if (admin != null && conidFlag == true) {
        db.ref('users/' + userid).update({
            conid: conid
        });
        userid = null;
        document.getElementById('modloginconidForm').style.display = 'block';
        document.getElementById('modconidForm').style.display = 'none';
        document.getElementById('modConIDModal').style.display = 'none';
        resetmodconidForm();
    }
}

//reset modify user form
function resetmodconidForm() {
    userid = "";
    document.getElementById('modconidForm').style.display = 'none';
    document.getElementById('modloginconidForm').style.display = 'block';
    document.getElementById('modconidForm').reset();
    document.getElementById('modloginconidForm').reset();
    document.getElementById('modconiduser-label').style.visibility = 'hidden';
    document.getElementById('modconiduser').classList.add('w3-text-blue');
    document.getElementById('modconiduser').classList.remove('w3-text-red');
    document.getElementById('modconidpwd-label').style.visibility = 'hidden';
    document.getElementById('modconidpwd').classList.add('w3-text-blue');
    document.getElementById('modconidpwd').classList.remove('w3-text-red');
    document.getElementById('modconid-label').style.visibility = 'hidden';
    document.getElementById('modconid').classList.add('w3-text-blue');
    document.getElementById('modconid').classList.remove('w3-text-red');
}

//change user form
function pwdusr() {
    var userFlag = false, pwdFlag = false, pwd2Flag = false, pwdEqual = false;
    var user = document.getElementById('pwduser').value;
    var pwd = document.getElementById('pwdpwd').value;
    var pwd2 = document.getElementById('pwdpwd2').value;
    if (user === "") {
        document.getElementById('pwduser-label').style.visibility = '';
        document.getElementById('pwduser').classList.remove('w3-text-blue');
        document.getElementById('pwduser').classList.add('w3-text-red');
        userFlag = false;
    } else {
        document.getElementById('pwduser-label').style.visibility = 'hidden';
        document.getElementById('pwduser').classList.add('w3-text-blue');
        document.getElementById('pwduser').classList.remove('w3-text-red');
        userFlag = true;
    }
    if (pwd === "") {
        document.getElementById('pwdpwd-label').style.visibility = '';
        document.getElementById('pwdpwd').classList.remove('w3-text-blue');
        document.getElementById('pwdpwd').classList.add('w3-text-red');
        pwdFlag = false;
    } else {
        document.getElementById('pwdpwd-label').style.visibility = 'hidden';
        document.getElementById('pwdpwd').classList.add('w3-text-blue');
        document.getElementById('pwdpwd').classList.remove('w3-text-red');
        pwdFlag = true;
    }
    if (pwd2 === "") {
        document.getElementById('pwdpwd2-label').style.visibility = '';
        document.getElementById('pwdpwd2').classList.remove('w3-text-blue');
        document.getElementById('pwdpwd2').classList.add('w3-text-red');
        pwd2Flag = false;
    } else {
        document.getElementById('pwdpwd2-label').style.visibility = 'hidden';
        document.getElementById('pwdpwd2').classList.add('w3-text-blue');
        document.getElementById('pwdpwd2').classList.remove('w3-text-red');
        pwd2Flag = true;
    }
    if (pwdFlag == true && pwd2Flag == true && pwd === pwd2) {
        document.getElementById('pwdpwd-label').style.visibility = 'hidden';
        document.getElementById('pwdpwd').classList.add('w3-text-blue');
        document.getElementById('pwdpwd').classList.remove('w3-text-red');
        document.getElementById('pwdpwd2-label').style.visibility = 'hidden';
        document.getElementById('pwdpwd2').classList.add('w3-text-blue');
        document.getElementById('pwdpwd2').classList.remove('w3-text-red');
        pwdEqual = true;
    } else {
        document.getElementById('pwdpwd-label').style.visibility = '';
        document.getElementById('pwdpwd').classList.remove('w3-text-blue');
        document.getElementById('pwdpwd').classList.add('w3-text-red');
        document.getElementById('pwdpwd2-label').style.visibility = '';
        document.getElementById('pwdpwd2').classList.remove('w3-text-blue');
        document.getElementById('pwdpwd2').classList.add('w3-text-red');
        pwdEqual = false;
    }
    if (admin != null && userFlag == true && pwdEqual == true) {
        pwd = CryptoJS.SHA512(pwd).toString();
        var tempdb = db;
        db.ref('users/' + user).on('value', function (snapshot) {
            if (CryptoJS.SHA512(user).toString() === snapshot.val().uid) {
                db.ref('users/' + user).update({
                    pwd: pwd
                });
            }
        });
        document.getElementById('pwdModal').style.display = 'none';
        resetpwdusr();
    }
}

//reset user form
function resetpwdusr() {
    document.getElementById('pwdForm').reset();
    document.getElementById('pwduser-label').style.visibility = 'hidden';
    document.getElementById('pwduser').classList.add('w3-text-blue');
    document.getElementById('pwduser').classList.remove('w3-text-red');
    document.getElementById('pwdpwd-label').style.visibility = 'hidden';
    document.getElementById('pwdpwd').classList.add('w3-text-blue');
    document.getElementById('pwdpwd').classList.remove('w3-text-red');
    document.getElementById('pwdpwd2-label').style.visibility = 'hidden';
    document.getElementById('pwdpwd2').classList.add('w3-text-blue');
    document.getElementById('pwdpwd2').classList.remove('w3-text-red');
}

//remove user form
function rmusr() {
    var userFlag = false;
    var user = document.getElementById('rmuser').value;
    if (user === "") {
        document.getElementById('rmuser-label').style.visibility = '';
        document.getElementById('rmuser').classList.remove('w3-text-blue');
        document.getElementById('rmuser').classList.add('w3-text-red');
        userFlag = false;
    } else {
        document.getElementById('rmuser-label').style.visibility = 'hidden';
        document.getElementById('rmuser').classList.add('w3-text-blue');
        document.getElementById('rmuser').classList.remove('w3-text-red');
        userFlag = true;
    }
    if (admin != null && userFlag == true) {
        db.ref('users/' + user).remove();
        document.getElementById('rmUserModal').style.display = 'none';
        resetrmusr();
    }
}

//reset remove user form
function resetrmusr() {
    document.getElementById('rmuserForm').reset();
    document.getElementById('rmuser-label').style.visibility = 'hidden';
    document.getElementById('rmuser').classList.add('w3-text-blue');
    document.getElementById('rmuser').classList.remove('w3-text-red');
}

//add candidate form
function addCanForm() {
    var parFlag = false, conFlag = false, eleFlag = false, canFlag = false;
    var can = document.getElementById('addcan').value;
    var par = document.getElementById('addpar').value;
    var con = document.getElementById('addcon').value;
    var ele = document.getElementById('addele').value;
    if (can === "") {
        document.getElementById('addcan').classList.remove('w3-text-blue');
        document.getElementById('addcan').classList.add('w3-text-red');
        document.getElementById('addcan-label').style.visibility = '';
        canFlag = false;
    } else {
        document.getElementById('addcan').classList.add('w3-text-blue');
        document.getElementById('addcan').classList.remove('w3-text-red');
        document.getElementById('addcan-label').style.visibility = 'hidden';
        canFlag = true;
    }
    if (par === "") {
        document.getElementById('addpar').classList.remove('w3-text-blue');
        document.getElementById('addpar').classList.add('w3-text-red');
        document.getElementById('addpar-label').style.visibility = '';
        parFlag = false;
    } else {
        document.getElementById('addpar').classList.add('w3-text-blue');
        document.getElementById('addpar').classList.remove('w3-text-red');
        document.getElementById('addpar-label').style.visibility = 'hidden';
        parFlag = true;
    }
    if (con === "") {
        document.getElementById('addcon').classList.remove('w3-text-blue');
        document.getElementById('addcon').classList.add('w3-text-red');
        document.getElementById('addcon-label').style.visibility = '';
        conFlag = false;
    } else {
        document.getElementById('addcon').classList.add('w3-text-blue');
        document.getElementById('addcon').classList.remove('w3-text-red');
        document.getElementById('addcon-label').style.visibility = 'hidden';
        conFlag = true;
    }
    if (ele === "") {
        document.getElementById('addele').classList.remove('w3-text-blue');
        document.getElementById('addele').classList.add('w3-text-red');
        document.getElementById('addele-label').style.visibility = '';
        eleFlag = false;
    } else {
        document.getElementById('addele').classList.add('w3-text-blue');
        document.getElementById('addele').classList.remove('w3-text-red');
        document.getElementById('addele-label').style.visibility = 'hidden';
        eleFlag = true;
    }
    if (admin != null && parFlag == true && conFlag == true && eleFlag == true && canFlag == true) {
        db.ref("candidate/" + ele + "/" + con).update({
            [par]: can
        });
        document.getElementById('addCanModal').style.display = 'none';
        resetAddCanForm();
    }
}

//reset candidate form
function resetAddCanForm() {
    document.getElementById('addCanForm').reset();
    document.getElementById('addcan-label').style.visibility = 'hidden';
    document.getElementById('addcan').classList.add('w3-text-blue');
    document.getElementById('addcan').classList.remove('w3-text-red');
    document.getElementById('addpar-label').style.visibility = 'hidden';
    document.getElementById('addpar').classList.add('w3-text-blue');
    document.getElementById('addpar').classList.remove('w3-text-red');
    document.getElementById('addcon-label').style.visibility = 'hidden';
    document.getElementById('addcon').classList.add('w3-text-blue');
    document.getElementById('addcon').classList.remove('w3-text-red');
    document.getElementById('addele-label').style.visibility = 'hidden';
    document.getElementById('addele').classList.add('w3-text-blue');
    document.getElementById('addele').classList.remove('w3-text-red');
}

//modify candidate form
function modCanForm() {
    var parFlag = false, conFlag = false, eleFlag = false, canFlag = false;
    var can = document.getElementById('modcan').value;
    var par = document.getElementById('modpar').value;
    var con = document.getElementById('modcon').value;
    var ele = document.getElementById('modele').value;
    if (can === "") {
        document.getElementById('modcan').classList.remove('w3-text-blue');
        document.getElementById('modcan').classList.add('w3-text-red');
        document.getElementById('modcan-label').style.visibility = '';
        canFlag = false;
    } else {
        document.getElementById('modcan').classList.add('w3-text-blue');
        document.getElementById('modcan').classList.remove('w3-text-red');
        document.getElementById('modcan-label').style.visibility = 'hidden';
        canFlag = true;
    }
    if (par === "") {
        document.getElementById('modpar').classList.remove('w3-text-blue');
        document.getElementById('modpar').classList.add('w3-text-red');
        document.getElementById('modpar-label').style.visibility = '';
        parFlag = false;
    } else {
        document.getElementById('modpar').classList.add('w3-text-blue');
        document.getElementById('modpar').classList.remove('w3-text-red');
        document.getElementById('modpar-label').style.visibility = 'hidden';
        parFlag = true;
    }
    if (con === "") {
        document.getElementById('modcon').classList.remove('w3-text-blue');
        document.getElementById('modcon').classList.add('w3-text-red');
        document.getElementById('modcon-label').style.visibility = '';
        conFlag = false;
    } else {
        document.getElementById('modcon').classList.add('w3-text-blue');
        document.getElementById('modcon').classList.remove('w3-text-red');
        document.getElementById('modcon-label').style.visibility = 'hidden';
        conFlag = true;
    }
    if (ele === "") {
        document.getElementById('modele').classList.remove('w3-text-blue');
        document.getElementById('modele').classList.add('w3-text-red');
        document.getElementById('modele-label').style.visibility = '';
        eleFlag = false;
    } else {
        document.getElementById('modele').classList.add('w3-text-blue');
        document.getElementById('modele').classList.remove('w3-text-red');
        document.getElementById('modele-label').style.visibility = 'hidden';
        eleFlag = true;
    }
    if (admin != null && parFlag == true && conFlag == true && eleFlag == true && canFlag == true) {
        db.ref("candidate/" + ele + "/" + con).on('value', function (snapshot) {
            if (snapshot.val().par != "") {
                db.ref("candidate/" + ele + "/" + con).update({
                    [par]: can
                });
            }
        });
        document.getElementById('modCanModal').style.display = 'none';
        resetModCanForm();
    }
}

//reset candidate form
function resetModCanForm() {
    document.getElementById('modCanForm').reset();
    document.getElementById('modcan-label').style.visibility = 'hidden';
    document.getElementById('modcan').classList.add('w3-text-blue');
    document.getElementById('modcan').classList.remove('w3-text-red');
    document.getElementById('modpar-label').style.visibility = 'hidden';
    document.getElementById('modpar').classList.add('w3-text-blue');
    document.getElementById('modpar').classList.remove('w3-text-red');
    document.getElementById('modcon-label').style.visibility = 'hidden';
    document.getElementById('modcon').classList.add('w3-text-blue');
    document.getElementById('modcon').classList.remove('w3-text-red');
    document.getElementById('modele-label').style.visibility = 'hidden';
    document.getElementById('modele').classList.add('w3-text-blue');
    document.getElementById('modele').classList.remove('w3-text-red');
}

//remove candidate form
function rmCanForm() {
    var parFlag = false, conFlag = false, eleFlag = false;
    var par = document.getElementById('rmpar').value;
    var con = document.getElementById('rmcon').value;
    var ele = document.getElementById('rmele').value;
    if (par === "") {
        document.getElementById('rmpar').classList.remove('w3-text-blue');
        document.getElementById('rmpar').classList.add('w3-text-red');
        document.getElementById('rmpar-label').style.visibility = '';
        parFlag = false;
    } else {
        document.getElementById('rmpar').classList.add('w3-text-blue');
        document.getElementById('rmpar').classList.remove('w3-text-red');
        document.getElementById('rmpar-label').style.visibility = 'hidden';
        parFlag = true;
    }
    if (con === "") {
        document.getElementById('rmcon').classList.remove('w3-text-blue');
        document.getElementById('rmcon').classList.add('w3-text-red');
        document.getElementById('rmcon-label').style.visibility = '';
        conFlag = false;
    } else {
        document.getElementById('rmcon').classList.add('w3-text-blue');
        document.getElementById('rmcon').classList.remove('w3-text-red');
        document.getElementById('rmcon-label').style.visibility = 'hidden';
        conFlag = true;
    }
    if (ele === "") {
        document.getElementById('rmele').classList.remove('w3-text-blue');
        document.getElementById('rmele').classList.add('w3-text-red');
        document.getElementById('rmele-label').style.visibility = '';
        eleFlag = false;
    } else {
        document.getElementById('rmele').classList.add('w3-text-blue');
        document.getElementById('rmele').classList.remove('w3-text-red');
        document.getElementById('rmele-label').style.visibility = 'hidden';
        eleFlag = true;
    }
    if (admin != null && parFlag == true && conFlag == true && eleFlag == true) {
        db.ref("candidate/" + ele + "/" + con + "/" + par).remove();
        document.getElementById('rmCanModal').style.display = 'none';
        resetrmCanForm();
    }
}

//reser remove candidate form
function resetrmCanForm() {
    document.getElementById('rmCanForm').reset();
    document.getElementById('rmpar-label').style.visibility = 'hidden';
    document.getElementById('rmpar').classList.add('w3-text-blue');
    document.getElementById('rmpar').classList.remove('w3-text-red');
    document.getElementById('rmcon-label').style.visibility = 'hidden';
    document.getElementById('rmcon').classList.add('w3-text-blue');
    document.getElementById('rmcon').classList.remove('w3-text-red');
    document.getElementById('rmele-label').style.visibility = 'hidden';
    document.getElementById('rmele').classList.add('w3-text-blue');
    document.getElementById('rmele').classList.remove('w3-text-red');
}

//start election form
function startEleForm() {
    var flag = false, regexFlag = false;
    var startEle = document.getElementById('startele').value;
    var conRegex = document.getElementById('starteleConRegex').value;
    if (startEle === "") {
        document.getElementById('startele').classList.remove('w3-text-blue');
        document.getElementById('startele').classList.add('w3-text-red');
        document.getElementById('startele-label').style.visibility = '';
        flag = false;
    } else {
        document.getElementById('startele').classList.add('w3-text-blue');
        document.getElementById('startele').classList.remove('w3-text-red');
        document.getElementById('startele-label').style.visibility = 'hidden';
        flag = true;
    }
    if (conRegex === "") {
        document.getElementById('starteleConRegex').classList.remove('w3-text-blue');
        document.getElementById('starteleConRegex').classList.add('w3-text-red');
        document.getElementById('starteleConRegex-label').style.visibility = '';
        regexFlag = false;
    } else {
        document.getElementById('starteleConRegex').classList.add('w3-text-blue');
        document.getElementById('starteleConRegex').classList.remove('w3-text-red');
        document.getElementById('starteleConRegex-label').style.visibility = 'hidden';
        regexFlag = true;
    }
    if (admin != null && flag == true && regexFlag == true) {
        var time = Math.round(new Date().getTime()/1000);
        db.ref("election/" + startEle).update({
            conRegex: conRegex,
            start: time,
            stop: "NAN"
        });
        document.getElementById('startEleModal').style.display = 'none';
        resetStartEleForm();
    }
}

//reset start election form
function resetStartEleForm() {
    document.getElementById('startEleForm').reset();
    document.getElementById('startele-label').style.visibility = 'hidden';
    document.getElementById('startele').classList.add('w3-text-blue');
    document.getElementById('startele').classList.remove('w3-text-red');
}

//stop election form
function stopEleForm() {
    var flag = false;
    var stopEle = document.getElementById('stopele').value;
    if (stopEle === "") {
        document.getElementById('stopele').classList.remove('w3-text-blue');
        document.getElementById('stopele').classList.add('w3-text-red');
        document.getElementById('stopele-label').style.visibility = '';
        flag = false;
    } else {
        document.getElementById('stopele').classList.add('w3-text-blue');
        document.getElementById('stopele').classList.remove('w3-text-red');
        document.getElementById('stopele-label').style.visibility = 'hidden';
        flag = true;
    }
    if (admin != null && flag == true) {
        db.ref("election/" + stopEle).on('value', function (snapshot) {
            if (snapshot.val().start > 0) {
                var time = Math.round(new Date().getTime()/1000);
                db.ref("election/" + stopEle).update({
                    stop: time
                });
            }
        });
        document.getElementById('stopEleModal').style.display = 'none';
        resetStopEleForm();
    }
}

//reset stop election form
function resetStopEleForm() {
    document.getElementById('stopEleForm').reset();
    document.getElementById('stopele-label').style.visibility = 'hidden';
    document.getElementById('stopele').classList.add('w3-text-blue');
    document.getElementById('stopele').classList.remove('w3-text-red');
}