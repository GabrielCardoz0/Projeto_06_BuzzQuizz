// script Ana 

function carregarQuizzes() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(separarQuizzes);

}
function irParaResponderQuizz(id) {
    localStorage.setItem("id-do-quizz-a-ser-respondido", `${id}`);
    window.location.replace("http://127.0.0.1:5500/html/tela2.html");

}


function renderizarQuizzes(seusQuizzes, outrosQuizzes) {

    const ul = document.querySelector(".box-quizzes");

    for (let i = 0; i < outrosQuizzes.length; i++) {
        ul.innerHTML += `
                        <li class="caixa-quizz" onclick ="irParaResponderQuizz(${outrosQuizzes[i].id})">
                            <div class="gradient"></div>
                            <img src="${outrosQuizzes[i].image}" />
                            <span>${outrosQuizzes[i].title}</span>
                        </li>
        `;
    }
    if (seusQuizzes.length == 0) {
        const esconder = document.querySelector(".box-quizzes-criados")
        esconder.classList.add("escondido");
    } else {
        const esconder = document.querySelector(".box-criar-quizz")
        esconder.classList.add("escondido");
    }



    const ulDois = document.querySelector(".lista-seus-quizzes")

    for (let i = 0; i < seusQuizzes.length; i++) {
        ulDois.innerHTML += `
                    <li class="caixa-quizz">
                        <div class="gradient"></div>
                        <img src="${seusQuizzes[i].image}" />
                        <span>${seusQuizzes[i].title}</span>
                    </li>
        `;


    }



}


carregarQuizzes();


function separarQuizzes(resposta) {
    let seusQuizzesCriados = [];
    let naoSaoSeusQuizzes = [];

    const todosOsQuizzes = resposta.data;
    const meusQuizzesString = localStorage.getItem("Meus_Quizzes");
    const meusQuizzesArray = JSON.parse(meusQuizzesString);

    for (let i = 0; i < todosOsQuizzes.length; i++) {
        let deuMatch = false;
        if (meusQuizzesArray != null) {

            for (let j = 0; j < meusQuizzesArray.length; j++) {

                if (todosOsQuizzes[i].id == meusQuizzesArray[j].id) {
                    deuMatch = true;
                    seusQuizzesCriados.push(todosOsQuizzes[i]);
                }

            }
        }
        if (deuMatch == false) {
            naoSaoSeusQuizzes.push(todosOsQuizzes[i]);
        }

    }

    renderizarQuizzes(seusQuizzesCriados, naoSaoSeusQuizzes);

}


// fim script Ana 



/*Script Gabriel*/


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
    questions: [],
    levels: []
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
            const porcentagemDeAcertos = filho.children[2].value >= 0 && filho.children[2].value <= 100;
            const imagemDoNivel = urlValidar(filho.children[3].value);
            const descricaoDoNivel = filho.children[4].value.length >= 30;

            tudoCertinho = tituloDoNivel && porcentagemDeAcertos && imagemDoNivel && descricaoDoNivel;

            if (tudoCertinho == true && quantidadeDeNiveisCompletos == i) {
                quantidadeDeNiveisCompletos++;
                ObjetoQuizz.levels.push({
                    title: filho.children[1].value,
                    image: filho.children[3].value,
                    text: filho.children[4].value,
                    minValue: filho.children[2].value
                });
                console.log(ObjetoQuizz);
            }
        }
    }
    if (quantidadeDeNiveisCompletos >= niveisQuizz) {

        const divFilho = telaQuizzPronto.querySelector('.imagemQuizz');
        divFilho.innerHTML += `<img src="${urlImagemQuizz}"
            alt="">
            <span>${tituloDoQuizz}</span>`;


        const promessaDoServidor = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', ObjetoQuizz);


        promessaDoServidor.then(QuizzProntinho);


        function QuizzProntinho(respostaDoServidor) {
            console.log(respostaDoServidor.data);





            const telaNiveis = document.querySelector('.decidaNiveis');
            const telaQuizzPronto = document.querySelector('.quizzPronto');
            telaNiveis.classList.add('escondido');
            telaQuizzPronto.classList.remove('escondido');
        }
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
let QuestoesRespondidas = 0;
let resultado = 0;
let resultadoFinal = 0;
let qtdPerguntas;
let levelsArray;

function responder(){

    const quizz = document.querySelector(".main")
    // ALTERAR ID BASEADO NA TELA 1 !
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/11783')
    .then(response => {
        
            let item = response.data;

            levelsArray = item.levels

            let add = `<div class="titulo">
                <img src="${item.image}" alt="Titulo">
                <h1>${item.title}</h1>
            </div>`

            qtdPerguntas = item.questions.length;

            for (var i = 0; i < item.questions.length; i++)
            {
                const quantidadeDeRespostas = item.questions[i].answers;
                const sortido = quantidadeDeRespostas.sort(baguncar)
        
                function baguncar(){
                    return 0.5 - Math.random()
                }
                add += `<div class="quizz">
                <div class="pergunta">
                    <div class="cabecalho" style="background-color:${item.questions[i].color}">
                        <p class="ctitulo">${item.questions[i].title}</p>
                    </div>`

                    let contador = 0;
                    let quantidadeDePerguntas = sortido.length;
                    for (var j = 0; j < quantidadeDePerguntas; j++)
                    {
                        contador++;
                        if(contador == 1){
                            add += `<div class="quadro">
                            <div class="resposta ${sortido[j].isCorrectAnswer} quiz${i}${j}">
                            <img src="${sortido[j].image}" alt="quiz${i}${j}">
                            <p class="paragrafo">${sortido[j].text}</p>
                            </div>`
                            if(quantidadeDePerguntas == 3)
                            {
                                add += `</div>
                                </div>`   
                            }
                        }
                        if(contador == 2)
                        {
                        add += `<div class="resposta ${sortido[j].isCorrectAnswer} quiz${i}${j}">
                            <img src="${sortido[j].image}" alt="quiz${i}${j}">
                            <p class="paragrafo">${sortido[j].text}</p>
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
                                         
            quizz.innerHTML = add;


        })

        .catch(error => {
            console.log(`responder: ${error}`)
        }); 
}

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

    for(let i = 0; i < resposta.length; i++){
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
    for(let i = 0; i < resposta.length; i++)
    {
        if(resposta[i].className.includes('escolhido') && resposta[i].className.includes('certo'))  
        {
            if(alt[4] == resposta[i].className.split('quiz')[1][0])
            {
                resultado++;
            }
        }
    }

        resultadoFinal = Math.round((resultado/qtdPerguntas)*100)

        QuestoesRespondidas++;
        if(QuestoesRespondidas == qtdPerguntas)
        {
            let array = [];
            for(let i = 0; i < levelsArray.length; i++)
            {
                array.push(Number(levelsArray[i].minValue))
            }

            let final = document.querySelector('.main')
            let add2 = `<div class="final">`;
            

            let posicao;
            for(let i = 0; i < array.length; i++)
            {
                if(resultadoFinal >= array[i])
                {
                  posicao = i
                }
            }

                add2 = `<div class="topo">
                <p>${resultadoFinal}% de acerto: ${levelsArray[posicao].title}</p>
                </div>
                <div class="menu">
                <div class="imagem">
                <img src="${levelsArray[posicao].image}" alt="Final">
                </div>
                <div class="texto">
                <p>${levelsArray[posicao].text}</p>
                </div>
                </div>
                </div>`;

            final.innerHTML += add2
        
        }
});

responder();

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
    resultado = 0
    resultadoFinal = 0
    QuestoesRespondidas = 0
    final = document.querySelector('.final')
    remover = final.classList.add("escondido")
    responder()
    })


    const botaoHome = document.querySelector('.home')
    
    botaoHome.addEventListener("click", function(e){
        window.location = 'tela1.html'})

//Script Victoria//
