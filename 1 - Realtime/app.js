/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];
var cards = [];

// firebase: objeto global
// database(): metodo de acesso ao RealTime Database
// ref(): url em string para referência do caminho do banco
var ref = firebase.database().ref(`card/`);

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
        idade: Math.floor(Math.random() * 22 + 18),
        curtidas: 0
    };
    // set(): método que cria dados na url passada
    // firebase.database().ref(`card/`).child(card.nome).set(card).then(() => {
    //     adicionaCardATela(card);
    // })

    // push(): cria um id único e insere os dados dentro desse uid.
    ref.push().set(card).then(() => {
        adicionaCardATela(card);
    })
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {

};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {

};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {

    // once(): retorna os dados lidos de uma URL
    // snapshot: objeto retornado pela leitura
    ref.once('value').then(snapshot => {

        // acessa um nó filho
        console.log('child: ', snapshot.child('Lioz4Va3QkbYtY1WXw2').val());
        // checa se existe algum nó
        console.log('existe? ', snapshot.exists());
        // se existe algum filho na URL passada
        console.log('hasChild? nome ', snapshot.hasChild('Lioz4Va3QkbYtY1WXw2/nome'));
        console.log('hasChild? comentario ', snapshot.hasChild('Lioz4Va3QkbYtY1WXw2/comentario'));
        // se existe algum filho no nó
        // console.log('hasChildren? ', snapshot.hasChild('Lioz4Va3QkbYtY1WXw2').hasChildren());
        // número de filhos no snapshot
        console.log('numChildren: ', snapshot.numChildren());
        // chave desse snapshot/caminho
        console.log('chave: ', snapshot.key);

        snapshot.forEach(value => {
            adicionaCardATela(value.val()); 
        })
    })
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = informacao.nome;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let content = document.createElement("p");
    content.classList.add('card-text');
    content.innerText = informacao.idade + ' anos.';
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')
    // Botão adicionar
    let button_add = document.createElement("button");
    button_add.classList.add('btn', 'btn-link', 'col-3');
    button_add.setAttribute('onclick', "curtir('" + id + "')");
    button_add.innerText = '+';
    inner.appendChild(button_add);

    // Contador de curtidas
    let counter = document.createElement("span");
    counter.innerHTML = informacao.curtidas;
    counter.classList.add('col-3', 'text-center', 'count-number');
    inner.appendChild(counter);

    // Botão de subtrair
    let button_sub = document.createElement("button");
    button_sub.classList.add('btn', 'btn-link', 'col-3');
    button_sub.setAttribute('onclick', "descurtir('" + id + "')");
    button_sub.innerText = '-';
    inner.appendChild(button_sub);
    // ===================================

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(content);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}