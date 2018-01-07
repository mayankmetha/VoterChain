var admin;
var db;
var userid;

function main() {
    resetAddUserForm();
    resetmodconidForm();
    resetpwdusr();
    resetrmusr();
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

function logout() {
    if (admin != null) {
        firebase.auth().signOut();
    }
}

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
            conid: conid
        });
        document.getElementById('addUserModal').style.display = 'none';
        resetAddUserForm();
    }
}

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
    if(admin != null && userFlag == true) {
        db.ref('users/'+user).remove();
        document.getElementById('rmUserModal').style.display = 'none';
        resetrmusr();
    }
}

function resetrmusr() {
    document.getElementById('rmuserForm').reset();
    document.getElementById('rmuser-label').style.visibility = 'hidden';
    document.getElementById('rmuser').classList.add('w3-text-blue');
    document.getElementById('rmuser').classList.remove('w3-text-red');
}
