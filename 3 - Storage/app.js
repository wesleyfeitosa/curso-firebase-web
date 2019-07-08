/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');

/**
 * Refetencia para o storage do firebase criando uma pasta com um nome de arquivos.
 */
var ref = firebase.storage().ref('arquivos');

var tarefaDeUpload;

/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
    var arquivo = event.target.files[0];
    var uid = firebase.database().ref().push().key;

    // .child(nome): Acessar o caminho para inserir o arquivo
    // .put(arquivo): Vai inserir o arquivo
    // ref.child(uid).put(arquivo, {
    //     customMetadata: {
    //         nome: 'Curriculo'
    //     }
    // }).then(snapshot => {
    //     console.log('snapshot', snapshot);

    //     // getDownloadURL(): retorna a url para download/apresentação desse arquivo enviado.
    //     ref.child(uid).getDownloadURL().then(url => {
    //         console.log('string para download', url);
    //     })
    // });

    // ref.child(uid).getMetadata().then(metadata => {
    //     console.log('Metadados: ', metadata);
    // })
    // getMetadata(): retorna os metadatas inseridos no arquivo.
    // ref.child('arquivo').getMetadata().then(metadata => {
    //     console.log(metadata);
    // })

    // Atribui a tarefa de upload a variável de tarefaDeUpload e executa essa tarefa ao dar o put()
    tarefaDeUpload = ref.child(uid).put(arquivo);

    // .on(state_changed, Obeservavel_upload(), error(), completou())
    tarefaDeUpload.on('state_changed', upload => {
        console.log('Mudou o estado', upload);

        // .state retorna o estado do upload. Ele pode ser running, paused ou success 
        if(upload.state === 'running'){
            // .bytesTransferred são os bytes transferidos
            // .totalBytes são os bytes totais do arquivo
            var progresso = Math.round((upload.bytesTransferred / upload.totalBytes) * 100);
            console.log(`${progresso}%`)
        }
    }, error => {
        console.log('Ocorreu um erro!', error);
    }, () => {
        console.log('Completou a tarefa');
        ref.child(uid).getDownloadURL().then(url => {
            console.log(url);
        });
    });

    // tarefaDeUpload.then(snapshot => {
    //     console.log('snapshot', snapshot);
    // })
    // .catch(error => {
    //     // pega o erro e no nosso caso o cancelamento da tarefa
    //     console.log('error', error);
    // })
};

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
    var arquivo = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(arquivo);
    reader.onload = function() {
        console.log(reader.result);
        const base64 = reader.result.split('base64,')[1];

        // .putString(string, formato, metadados): salva uma string no firebase e eu posso colocar um formato de
        // imagem para que ele automaticamente converta para um png
        ref.child('imagem').putString(base64, 'base64', { contentType: 'image/png'}).then(snapshot => {
            console.log('snapshot', snapshot);

            ref.child('imagem').getDownloadURL().then(url => {
                console.log('string para download', url);
                
            })
        })
    }
}

// pausa a tarefa de upload
pausar = function(){
    // pausa a tarefa
    tarefaDeUpload.pause();
    console.log('pausou tarefa')
}
// continua a tarefa pausada
continuar = function(){
    // continua a tarefa
    tarefaDeUpload.resume();
    console.log('continuou tarefa')
}
// cancela a tarefa iniciada
cancelar = function(){
    // cancela a tarefa
    tarefaDeUpload.cancel();
    console.log('cancelou tarefa')
}
// deleta um arquivo
deletar = function(){
    ref.child('uid').delete().then(() => {
        console.log('deletou com sucesso!');
    })
    .catch(error => {
        console.log(error);
    })
}