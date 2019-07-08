function loginGoogle() {
// Cria uma nova instância do provedor de login do facebook
var provider = firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(resposta => {
    console.log('usuário: ', resposta.user);
    console.log('token: ', resposta.credential.accessToken);
})
.catch(error => {
    console.log(error);
})
}