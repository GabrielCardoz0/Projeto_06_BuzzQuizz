/*Script Gabriel*/


/*--------------Variáveis globais-----------------*/

let tituloDoQuizz;
let urlImagemQuizz;
let quantidadePerguntasQuizz;
let niveisQuizz;


const listaPerguntas = [];
/*-----------------------------------------------*/

function urlValidar(string) {
    try {
        let url = new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}


function prosseguirTelaPerguntas(botaoProsseguirPerguntas) {
    tituloDoQuizz = document.querySelector('.tituloDoQuizz').value;
    urlImagemQuizz = document.querySelector('.urlImagemQuizz').value;
    quantidadePerguntasQuizz = document.querySelector('.quantidadeDePerguntas').value;
    niveisQuizz = document.querySelector('.quantidadeDeNiveis').value;


    if (tituloDoQuizz.length > 20 && urlValidar(urlImagemQuizz) && quantidadePerguntasQuizz >= 3 && niveisQuizz >= 2) {

        botaoProsseguirPerguntas.parentNode.classList.add('escondido');
        document.querySelector('.criePerguntas').classList.remove('escondido');
        carregarPerguntas();

    } else {
        alert('Erro. Favor verifique se os campos abaixo foram preenchidos corretamente.');
    }
}

function carregarPerguntas() {

    const Perguntas = document.querySelector('.ListaCaixaPerguntas');

    for (let i = 0; i < quantidadePerguntasQuizz; i++) {
        Perguntas.innerHTML = Perguntas.innerHTML +
            `
        <li class="perguntaN">
            <span>Pergunta ${i + 1}</span>
            <ion-icon name="create-outline" onclick="editarPergunta(this)"></ion-icon>
        </li>
        `
    }
}



function editarPergunta(item) {
    const numResposta = item.parentNode.querySelector('span');

    item.parentNode.classList.remove('perguntaN');
    item.parentNode.classList.add('conteudoPergunta');
    item.parentNode.innerHTML = `<span>${numResposta.innerHTML}</span>

    <input type="text" placeholder="Texto da pergunta" minlength="20">
    <input type="text" placeholder="Cor de fundo da pergunta (hexadecimal #XXXXXX)">

    <span>Resposta correta</span>
    <input type="text" placeholder="Resposta correta">
    <input type="url" name="" id="" placeholder="URL da imagem">

    <span>Respostas incorretas (ao menos uma)</span>
    <input type="text" placeholder="Resposta incorreta 1">
    <input type="url" name="" id="" placeholder="URL da imagem 1">

    <input type="text" placeholder="Resposta incorreta 2">
    <input type="url" name="" id="" placeholder="URL da imagem 2">

    <input type="text" placeholder="Resposta incorreta 3">
    <input type="url" name="" id="" placeholder="URL da imagem 3">`;

}


let perguntasPreenchidas = 0;
let tudoCerto = false;

function prosseguirParaNiveis(botaoProsseguirNiveis) {
    /*-------------veriricar dados---------------*/

    let ulPai = document.querySelector('.ListaCaixaPerguntas');

    for (let i = 0; i < quantidadePerguntasQuizz; i++) {

        const filhoUl = ulPai.children[i];


        const corFundo = filhoUl.children[2].value != '';

        const textoPergunta1 = filhoUl.children[1].value.length > 20;
        const respostaCorreta1 = filhoUl.children[4].value != '';
        const urlImagemPergunta = urlValidar(filhoUl.children[5].value);
        const respostaIncorreta1 = filhoUl.children[7].value != '';
        const urlIncorreta1 = urlValidar(filhoUl.children[8].value);
        const respostaIncorreta2 = filhoUl.children[9].value != '';
        const urlIncorreta2 = urlValidar(filhoUl.children[10].value);
        const respostaIncorreta3 = filhoUl.children[11].value != '';
        const urlIncorreta3 = urlValidar(filhoUl.children[12].value);

        tudoCerto = textoPergunta1 && respostaCorreta1 && urlImagemPergunta && respostaIncorreta1 && urlIncorreta1 && respostaIncorreta2 && urlIncorreta2 && respostaIncorreta3 && urlIncorreta3;

        if (tudoCerto == true) {
            perguntasPreenchidas = perguntasPreenchidas + 1;
        } else {
            perguntasPreenchidas = 0;
        }
    }
    verificarPerguntasCriadas();
}

const verificarPerguntasCriadas = function () {
    if (perguntasPreenchidas == quantidadePerguntasQuizz) {
        alert('Tudo certo');
    } else if (perguntasPreenchidas != quantidadePerguntasQuizz) {
        alert('Há algo de errado. Por favor verifique se todos os campos estão preenchidos corretamente');
    }
    console.log(perguntasPreenchidas);
    console.log(tudoCerto);
}

/*Fim do script Gabriel*/

