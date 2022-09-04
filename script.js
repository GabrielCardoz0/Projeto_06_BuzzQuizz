// script Ana

function carregarQuizzes() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(renderizarQuizzes);

}


function renderizarQuizzes(resposta) {
    console.log(resposta.data);

    const todosQuizzes = resposta.data;

    const ul = document.querySelector(".box-quizzes");

    for (let i = 0; i < todosQuizzes.length; i++) {
        ul.innerHTML += `
                    <li class="caixa-quizz">
                        <div class="gradient"></div>
                        <img src="${todosQuizzes[i].image}" />
                        <span>${todosQuizzes[i].title}</span>
                    </li>
        `;


    }



}

carregarQuizzes();

// fim script Ana







/* inicio Script Gabriel*/

/*--------------Variáveis globais-----------------*/
let tituloDoQuizz;
let urlImagemQuizz;
let quantidadePerguntasQuizz;
let niveisQuizz;
let perguntasPreenchidas = 0;
let quantidadeDeNiveisCompletos = 0;
const listaPerguntas = [];
let ObjetoQuizz = {
    title: '',
    image: '',
    questions: [

    ],
    levels: [
        {
            title: "Título do nível 1",
            image: "https://http.cat/411.jpg",
            text: "Descrição do nível 1",
            minValue: 0
        },
        {
            title: "Título do nível 2",
            image: "https://http.cat/412.jpg",
            text: "Descrição do nível 2",
            minValue: 50
        }
    ]
}
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
        ObjetoQuizz.title = tituloDoQuizz;
        ObjetoQuizz.image = urlImagemQuizz;
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
    <input type="color" placeholder="Cor de fundo da pergunta (hexadecimal #XXXXXX)">

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



function prosseguirParaNiveis(botaoProsseguirNiveis) {

    const ulPai = document.querySelector('.ListaCaixaPerguntas');
    let tudoCerto = false;
    for (let i = 0; i < quantidadePerguntasQuizz; i++) {
        const filhoUl = ulPai.children[i];

        const textoPergunta1 = filhoUl.children[1].value.length > 20;
        const corFundo = filhoUl.children[2].value;

        const respostaCorreta1 = filhoUl.children[4].value != '';
        const urlImagemPergunta = urlValidar(filhoUl.children[5].value);

        const respostaIncorreta1 = filhoUl.children[7].value != '';
        const urlIncorreta1 = urlValidar(filhoUl.children[8].value);

        const respostaIncorreta2 = filhoUl.children[9].value != '';
        const urlIncorreta2 = urlValidar(filhoUl.children[10].value);

        const respostaIncorreta3 = filhoUl.children[11].value != '';
        const urlIncorreta3 = urlValidar(filhoUl.children[12].value);

        tudoCerto = (textoPergunta1 && respostaCorreta1 && urlImagemPergunta) && ((respostaIncorreta1 && urlIncorreta1) || (respostaIncorreta2 && urlIncorreta2) || (respostaIncorreta3 && urlIncorreta3));

        if (tudoCerto == true) {
            perguntasPreenchidas = perguntasPreenchidas + 1;

            ObjetoQuizz.questions.push({
                title: filhoUl.children[1].value,
                color: corFundo,
                answers: [
                    {
                        text: filhoUl.children[4].value,
                        image: filhoUl.children[5].value,
                        isCorrectAnswer: true
                    },
                    {
                        text: filhoUl.children[7].value,
                        image: filhoUl.children[8].value,
                        isCorrectAnswer: false
                    },
                    {
                        text: filhoUl.children[9].value,
                        image: filhoUl.children[10].value,
                        isCorrectAnswer: false
                    },
                    {
                        text: filhoUl.children[11].value,
                        image: filhoUl.children[12].value,
                        isCorrectAnswer: false
                    }
                ]
            });

        }
    }
    verificarPerguntasCriadas();
}

const verificarPerguntasCriadas = function () {
    if (perguntasPreenchidas == quantidadePerguntasQuizz) {
        const telaCriarPerguntas = document.querySelector('.criePerguntas');
        const telaCriarNiveis = document.querySelector('.decidaNiveis');
        telaCriarPerguntas.classList.add('escondido');
        telaCriarNiveis.classList.remove('escondido');
        adicionarNiveisTela();
    } else if (perguntasPreenchidas != quantidadePerguntasQuizz) {
        alert('Há algo de errado. Por favor verifique se todos os campos estão preenchidos corretamente');
    }
    perguntasPreenchidas = 0;
}



function adicionarNiveisTela() {
    ulPaiNiveis = document.querySelector('.listaDeNiveis');
    for (let i = 0; i < niveisQuizz; i++) {
        ulPaiNiveis.innerHTML +=
            `<div class="nivelN">
        <span>Nivel ${i + 1}</span>
        <ion-icon name="create-outline" onclick="editarNível(this)"></ion-icon>
    </div>`
    }
}

function editarNível(elemento) {
    elemento.parentNode.classList.remove('nivelN');
    elemento.parentNode.classList.add('conteudoNivel');
    elemento.parentNode.innerHTML = `<span>${elemento.parentNode.querySelector('span').innerHTML}</span>
    <input type="text" placeholder="Título do nível (mín 10 caracteres)">
    <input type="text" placeholder="% de acerto mínima (entre 0 e 100%)" maxlength = 3>
    <input type="url" name="" id="" placeholder="URL da imagem do nível">
    <textarea cols="10" rows="4" placeholder="Descrição do nível (mín 30 caracteres)"></textarea>`;
}

function verificarInformacoes() {
    let tudoCertinho = false;

    let ulNiveis = document.querySelector('.listaDeNiveis');

    for (let i = 0; i <= niveisQuizz; i++) {

        const filho = ulNiveis.children[i];
        const classe = filho.className;

        if (classe != 'nivelN') {
            const tituloDoNivel = filho.children[1].value.length > 10;
            const porcentagemDeAcertos = filho.children[2].value > 0 && filho.children[2].value <= 100;
            const imagemDoNivel = urlValidar(filho.children[3].value);
            const descricaoDoNivel = filho.children[4].value.length >= 30;

            tudoCertinho = tituloDoNivel && porcentagemDeAcertos && imagemDoNivel && descricaoDoNivel;

            if (tudoCertinho == true && quantidadeDeNiveisCompletos == i) {
                quantidadeDeNiveisCompletos++;
            }
        }
    }
    if (quantidadeDeNiveisCompletos >= niveisQuizz) {
        const telaNiveis = document.querySelector('.decidaNiveis');
        const telaQuizzPronto = document.querySelector('.quizzPronto');
        telaNiveis.classList.add('escondido');
        telaQuizzPronto.classList.remove('escondido');

        const divFilho = telaQuizzPronto.querySelector('.imagemQuizz');
        divFilho.innerHTML += `<img src="${urlImagemQuizz}"
        alt="">
        <span>${tituloDoQuizz}</span>`

    } else {
        alert('Erro. Favor verifique se as informações abaixo foram preenchidas corretamente');
    }
}



function fecharPáginaHTML3() {
    const bodyPagina3 = document.querySelector('.top-bar')
    bodyPagina3.parentNode.classList.add('escondido');
}

/*----------------Fim do script Gabriel-------------------------------*/













//Script Victoria//
let qtdPerguntas
function responder() {
    const quizz = document.querySelector(".main")
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/11783')
        // ALTERAR ID BASEADO NA TELA 1 !
        .then(response => {
            let item = response.data;

            let add = `<div class="titulo">
                <img src="${item.image}" alt="Titulo">
                <h1>${item.title}</h1>
            </div>`

            qtdPerguntas = item.questions.length;

            for (var i = 0; i < item.questions.length; i++) {
                add += `<div class="quizz">
                <div class="pergunta">
                    <div class="cabecalho" style="background-color:${item.questions[i].color}">
                        <p class="ctitulo">${item.questions[i].title}</p>
                    </div>`

                let contador = 0;
                let quantidadeDePerguntas = item.questions[i].answers.length;
                for (var j = 0; j < quantidadeDePerguntas; j++) {
                    contador++;
                    if (contador == 1) {
                        add += `<div class="quadro">
                            <div class="resposta quiz${i}${j}">
                            <img src="${item.questions[i].answers[j].image}" alt="quiz${i}${j}">
                            <p class="paragrafo">${item.questions[i].answers[j].text}</p>
                            </div>`
                        if (quantidadeDePerguntas == 3) {
                            add += `</div>
                                </div>`
                        }
                    }
                    if (contador == 2) {
                        add += `<div class="resposta quiz${i}${j}">
                            <img src="${item.questions[i].answers[j].image}" alt="quiz${i}${j}">
                            <p class="paragrafo">${item.questions[i].answers[j].text}</p>
                            </div>
                            </div>`

                        if (quantidadeDePerguntas == 2 || j == 3) {
                            add += `</div>
                                </div>`
                        }

                        contador = 0;
                    }

                }
            }

            quizz.innerHTML = add
            console.log('fui adicionado')
        })
        .catch(error => {
            console.log(`responder: ${error}`)
        });
}


responder();

const main = document.querySelector('.main')
let contador = 0;
main.addEventListener("click", function (e) {
    let alt = e.srcElement.alt
    if (!alt.includes('quiz') || alt.length == 0) {
        return;
    }

    let resposta_click = document.querySelector(`.${alt}`)
    resposta_click.classList.add("escolhido");
    console.log(e.srcElement.alt)
});

//Script Victoria//



