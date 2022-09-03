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
