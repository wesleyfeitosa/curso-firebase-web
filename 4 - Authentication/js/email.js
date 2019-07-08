var currentUser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    // Crio o usuário com email e senha
    firebase.auth().createUserWithEmailAndPassword(email, senha).then(user => {
        console.log('usuário', user);
        alert('Usuário criado e logado');
    })
    .catch(error => {
        console.log('error', error); 
    })
}

/**
 * Função para login
 */
function loginEmail() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    // autentico o usuário com email e senha
    firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
        alert('Usuário logado');
    })
    .catch(error => {
        console.log('error', error); 
    })
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    //Observa se há usuários e mudanças na autenticação (login e logout)
    firebase.auth().onAuthStateChanged(usuario => {
        if(usuario){
            console.log('usuário', usuario);
            currentUser = usuario;
            // Mudando o idioma do firebase(autenticação)
            firebase.auth().languageCode = 'pt';
            // Muda o idioma para o idioma padrão do aparelho indereçado o email.
            firebase.auth().useDeviceLanguage();
            if(!usuario.emailVerified){
                // Envia um email para o usuário verificar a conta dele.
                // usuario.sendEmailVerification().then(() => {
                //     alert('email de verificação enviado!');
                // });
            }

            // Envia um email para mundança de senha ao email passado por parâmetro.
            // firebase.auth().sendPasswordResetEmail(usuario.email).then(() => {
            //     alert('Email de reset de senha enviado!');
            // })
        } else {
            console.log('não há usuários logados');
        }
    });

    // vai pegar dados do usário
    currentUser = firebase.auth().currentUser;

    if(currentUser){
        console.log('currentUser', currentUser);
        // Métodos para update de dados do usuário criado no auth()
        currentUser.updateProfile({
            displayName: 'Wesley Feitosa',
            photoURL: ''
        })
        // currentUser.updateEmail('jwesleyfeitosa@gmail.com');
        // currentUser.updatePassword('123456');
        // currentUser.updatePhoneNumber('+5588993200822');
    }
});

function deletaUsuario(){
    if(currentUser){
        currentUser.delete().then(() => {
            alert('Usuário excluído!');
        });
    }
}