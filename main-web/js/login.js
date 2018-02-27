//reset form
function resetForms() {
    document.getElementById('loginForm').reset();
    document.getElementById('user-green').style.display = "none";
    document.getElementById('user-red').style.display = "none";
    document.getElementById('pwd-green').style.display = "none";
    document.getElementById('pwd-red').style.display = "none";
}

//reset invalid form
function resetFormsInvalid() {
    document.getElementById('loginForm').reset();
    document.getElementById('user-green').style.display = "none";
    document.getElementById('user-red').style.display = "block";
    document.getElementById('pwd-green').style.display = "none";
    document.getElementById('pwd-red').style.display = "block";
}

//login validation
function login() {
    var user = document.getElementById('user').value;
    var pwd = document.getElementById('password').value;
    var uFlag = false, pFlag = false;
    if(user === "") {
        document.getElementById('user-green').style.display = "none";
        document.getElementById('user-red').style.display = "block";
        uFlag = false;
    } else {
        document.getElementById('user-green').style.display = "block";
        document.getElementById('user-red').style.display = "none";
        uFlag = true;
    }
    if(pwd === "") {
        document.getElementById('pwd-green').style.display = "none";
        document.getElementById('pwd-red').style.display = "block";
        pFlag = false;
    } else {
        document.getElementById('pwd-green').style.display = "block";
        document.getElementById('pwd-red').style.display = "none";
        pFlag = true;
    }
    if(uFlag == true && pFlag == true) {
       document.getElementById('loginForm').submit();
    }
}