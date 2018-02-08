function signin() {
    // FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: '/admin',
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                scopes: [
                    'https://www.googleapis.com/auth/plus.login',
                    'https://www.googleapis.com/auth/plus.me',
                    'https://www.googleapis.com/auth/userinfo.email'
                ],
                customParameters: { prompt: 'select_account' }
            }
        ],
        signInFlow:'popup'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
}

//start signin()
window.addEventListener('load', function () {
    signin();
});