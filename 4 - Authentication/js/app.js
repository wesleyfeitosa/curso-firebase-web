function logout() {
    // faço um logout do meu usuário, ou seja, saio da aplicação
    firebase.auth().signOut().then(() => {
        console.log('Usuário deslogou!');
    })
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    // nova instância do firebase ui
    var ui = firebaseui.auth.AuthUI(firebase.auth());
    // configurações do firebase ui
    var config = {
        callbacks : {
            signInSuccessWithAuthResult: function(authResult){
                console.log('authResult', authResult);
                return false;
            }
        },
    signInOptions : [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInFlow: 'popup'
    };

    // inicializa o firebase ui
    ui.start('#firebaseui-auth', config);
})