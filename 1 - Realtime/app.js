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
    ref.push(card).then((snapshot) => {
        // adicionaCardATela(card, snapshot.key);
    })
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    // remove(): remove o nó em que o método é utilizado, remove também todos os nós dentro desse nó removido
    ref.child(id).remove().then(() => {
        var card = document.getElementById(id);
        card.remove();
    })

    // removendo através do método set()
    // ref.child(id).set(null).then(() => {
    //     card.remove();
    // })
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText;
    countNumber = countNumber + 1;

    // set(): Pode ser acessado diretamente o objeto que quer atualizar e passar o valor atualizado
    // ou pode-se passar o objeto completo e atualiza-lo com os novos valores nos campos correspondentes;
    ref.child(id + '/curtidas').set(countNumber).then(() => {
        count.innerText = countNumber;
    });
};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText;
    
    if(countNumber > 0){
        countNumber = countNumber - 1;
        // update(): Recebe um objeto (e apenas um objeto) e atualiza apenas as propriedades desse objeto
        ref.child(id).update({curtidas: countNumber}).then(() => {
            count.innerText = countNumber;
        });
    };
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {

    // once(): retorna os dados lidos de uma URL
    // snapshot: objeto retornado pela leitura
    // ref.once('value').then(snapshot => {

        // // acessa um nó filho
        // console.log('child: ', snapshot.child('Lioz4Va3QkbYtY1WXw2').val());
        // // checa se existe algum nó
        // console.log('existe? ', snapshot.exists());
        // // se existe algum filho na URL passada
        // console.log('hasChild? nome ', snapshot.hasChild('Lioz4Va3QkbYtY1WXw2/nome'));
        // console.log('hasChild? comentario ', snapshot.hasChild('Lioz4Va3QkbYtY1WXw2/comentario'));
        // // se existe algum filho no nó
        // // console.log('hasChildren? ', snapshot.hasChild('Lioz4Va3QkbYtY1WXw2').hasChildren());
        // // número de filhos no snapshot
        // console.log('numChildren: ', snapshot.numChildren());
        // // chave desse snapshot/caminho
        // console.log('chave: ', snapshot.key);

    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key); 
    //     })
    // })

    /**
     * .ON
     */
    // ref.on('value', snapshot => {
    //     snapshot.forEach( value => {
    //         adicionaCardATela(value.val(), value.key); 
    //     } );
    // })

    // ref.on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key); 
    // });

    // ref.on('child_changed', (snapshot, uid) => {
    //     console.log(snapshot.key, uid);
    // });

    // ref.on('child_removed', snapshot => {
    //     console.log('removed', snapshot.key);
    // });

    /**
     * ORDENAÇÃO
     */
    // orderbyChild(): ordena pelo parametro passado na função
    ref.orderByChild('idade').on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(), snapshot.key);
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