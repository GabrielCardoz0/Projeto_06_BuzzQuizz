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





//Script Victoria//
    let qtdPerguntas

    function responder(){

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

            for (var i = 0; i < item.questions.length; i++)
            {
                add += `<div class="quizz">
                <div class="pergunta">
                    <div class="cabecalho" style="background-color:${item.questions[i].color}">
                        <p class="ctitulo">${item.questions[i].title}</p>
                    </div>`

                    let contador = 0;
                    let quantidadeDePerguntas = item.questions[i].answers.length;
                    for (var j = 0; j < quantidadeDePerguntas; j++)
                    {
                        contador++;
                        if(contador == 1){
                            add += `<div class="quadro">
                            <div class="resposta ${item.questions[i].answers[j].isCorrectAnswer} quiz${i}${j}">
                            <img src="${item.questions[i].answers[j].image}" alt="quiz${i}${j}">
                            <p class="paragrafo">${item.questions[i].answers[j].text}</p>
                            </div>`
                            if(quantidadeDePerguntas == 3)
                            {
                                add += `</div>
                                </div>`   
                            }
                        }
                        if(contador == 2)
                        {
                        add += `<div class="resposta ${item.questions[i].answers[j].isCorrectAnswer} quiz${i}${j}">
                            <img src="${item.questions[i].answers[j].image}" alt="quiz${i}${j}">
                            <p class="paragrafo">${item.questions[i].answers[j].text}</p>
                            </div>
                            </div>`

                            if(quantidadeDePerguntas == 2 || j == 3)
                            {
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

    let resposta = document.querySelectorAll('.resposta')
    for(let i = 0; i < resposta.length; i++)
    {
        console.log()
        if(!resposta[i].className.includes('escolhido'))
            {
                if(alt[4] == resposta[i].className.split('quiz')[1][0])
                {
                    resposta[i].classList.add("desabilitado");
                }
                
            }
        
        if(!resposta[i].className.includes('true'))
        {
            if(alt[4] == resposta[i].className.split('quiz')[1][0])
            {
                resposta[i].classList.add("errado");
            }
            
        }

        else if(resposta[i].className.includes('true'))
        {
            if(alt[4] == resposta[i].className.split('quiz')[1][0])
            {
                resposta[i].classList.add("certo");
            }
        }
    }
    
  });

    
    const botaoReiniciar = document.querySelector('.reiniciar')

    botaoReiniciar.addEventListener("click", function(e)
    {
    const reiniciar = document.querySelector('div:last-child');

    reiniciar.scrollIntoView({block: "end", behavior: "smooth"});

    let resposta = document.querySelectorAll('.resposta')

    for(i = 0; i < resposta.length; i++){

        if(resposta[i].className.includes('certo')){
            resposta[i].classList.remove('certo')
    }
        else if(resposta[i].className.includes('errado')){
            resposta[i].classList.remove('errado')
    }

    if(resposta[i].className.includes('desabilitado')){
            resposta[i].classList.remove('desabilitado')
    }
        else if(resposta[i].className.includes('escolhido')){
            resposta[i].classList.remove('escolhido')
    }}

    })


    const botaoHome = document.querySelector('.home')
    
    botaoHome.addEventListener("click", function(e){
        window.location = 'tela1.html'})


    function mostrarResultado (){
            
    }



//Script Victoria//
