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
                            <div class="resposta quiz${i}${j}">
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
                        add += `<div class="resposta quiz${i}${j}">
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
main.addEventListener("click", function(e) {
    let alt = e.srcElement.alt
    if(!alt.includes('quiz') || alt.length == 0){
        return;
    }
    
    let resposta_click = document.querySelector(`.${alt}`)
    resposta_click.classList.add("escolhido");
    console.log(e.srcElement.alt)
  });

//Script Victoria//