/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
        idade: Math.floor(Math.random() * 22 + 18),
        curtidas: 0
    };

    /**
     * .collection('coleção'): Referenciar a coleção
     * .doc('documento'): referencia o documento
     * .set({dados}): insere o objeto passado por parametro na referencia
     */
    // firebase.firestore().collection('cards').doc('1').set(card).then(() => {
    //     console.log('dados salvos');
    //     adicionaCardATela(card, 1);
    // });

    /**
     * .add(): Adiciona os dados dentro de um UID gerado automaticamente.
     */
    firebase.firestore().collection('cards').add(card).then(() => {
        console.log('dados salvos');
        adicionaCardATela(card, 1);
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
    firebase.firestore().collection('cards').get().then(snapshot => {
        
        // Os documentos dentro da minha coleção, retorna um objeto e deve-se utilizar um forEach
        // snapshot.docs()

        // Uma propriedade que retorna um booleano se o snapshot estiver vazio 
        // snapshot.empty

        // são os metadados da coleção
        // snapshot.metadado

        // retorna a query utilizada no flltro por esse get
        // snapshot.query

        // retorna o número de documentos dentro dessa coleção
        // snapashot.size

        // retorna um array com as mudanças que essa coleção sofreu desde a última leitura
        // snapshot.docChanges 

        snapshot.docs.forEach(card => {
            // retorna os dados do meu documento
            // card.data()

            // retorna o UID do meu documento 
            // card.id

            // retorna um booleano caso o documento passado seja igual ao documento utilizado (serve para docs e collections) 
            // card.isEqual(doc)
            // adicionaCardATela(card.data(), card.id);
        })
    })

    /**
     * .onSnapshot(): observando em tempo real
     */
    firebase.firestore().collection('cards').onSnapshot(snapshot => {

        // Usar dessa forma é equivalente ao .on('value') do RealTime Database
        // snapshot.docs.forEach();

        // Traz todos os dados com o evento de 'added' na primeira chamada e depois 
        // traz apenas os novos documentos ou documentos que sofreram alterações 
        snapshot.docChanges().forEach(card => {
            if(card.type == 'added'){
                adicionaCardATela(card.doc.data(), card.doc.id);
            };
            if(card.type == 'modified'){
                console.log('modified');
            };
            if(card.type == 'removed'){
                console.log('removed');
            };
        })
    });   
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