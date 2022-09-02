/*Script Gabriel*/


/*--------------Variáveis globais-----------------*/

let tituloDoQuizz;
let urlImagemQuizz;
let quantidadePerguntasQuizz;
let niveisQuizz;


const listaPerguntas = [];
/*-----------------------------------------------*/


function prosseguirTelaPerguntas(botaoProsseguirPerguntas) {
    tituloDoQuizz = document.querySelector('.tituloDoQuizz').value;
    urlImagemQuizz = document.querySelector('.urlImagemQuizz').value;
    quantidadePerguntasQuizz = document.querySelector('.quantidadeDePerguntas').value;
    niveisQuizz = document.querySelector('.quantidadeDeNiveis').value;

    function urlValidar() {
        try {
            let url = new URL(urlImagemQuizz);
            return true;
        } catch (err) {
            return false;
        }
    }

    if (tituloDoQuizz.length > 20 && urlValidar() && quantidadePerguntasQuizz >= 3 && niveisQuizz >= 2) {

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
            <ion-icon name="create-outline"></ion-icon>
        </li>
        `
    }
}

function prosseguirParaNiveis(botaoProsseguirNiveis) {
    alert('está funcionando');
}



/*Fim do script Gabriel*/