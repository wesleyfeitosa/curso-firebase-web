function logout() {
    // faço um logout do meu usuário, ou seja, saio da aplicação
    firebase.auth().signOut().then(() => {
        console.log('Usuário deslogou!');
    })
}