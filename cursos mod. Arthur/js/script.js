let cursos = [];

async function carregarCursos(){
    try {
        const resposta = await fetch('data/cursos.json');
        cursos = await resposta.json();
        gerarCursos(cursos);
    }catch(erro) {
        console.log("Erro ao carregar o JSON:", erro);
    }
}

carregarCursos();

const filterForm = document.querySelector('.filters__form');
const inputBusca = document.querySelector('#busca');
const inputArea = document.querySelector('#area');

filterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const termoBuscado = inputBusca.value.toLowerCase();
    const areaEscolhida = inputArea.value.toLowerCase(); 

    const cursosFiltrados = cursos.filter(curso => {
        const areaCurso = curso.area.toLowerCase();
        const tituloCurso = curso.titulo.toLowerCase();

        const tituloOk = (tituloCurso.includes(termoBuscado));
        const areaOk = (areaEscolhida === "" || areaEscolhida === areaCurso);

        return tituloOk && areaOk;
    })

    gerarCursos(cursosFiltrados);
})

function gerarCard(curso){
    return `
        <article class="card">
            <div class="dados">
                <img class="img_card" src="${curso.imagem}" alt="Imagem do curso">
                <span class="card__tag">${curso.area}</span>
            </div>
            <div class="card__body">
                <h3>${curso.titulo}</h3>
                <p>${curso.descricao}</p>
                <div class="horas">
                    <span>${curso.horas} horas</span>    
                </div>
                <a class="card__link" href="#">Acessar playlist</a>
            </div>
        </article>
    `
}

function gerarCursos(listCursos){
    const mainCards = document.querySelector('#cards_cursos');
    const dtqCards = document.querySelector('#cards_cursos_destaques');

    const htmlMainCards = listCursos.map(curso => gerarCard(curso)).join('');
    mainCards.innerHTML = htmlMainCards;

    const htmlDtqCards = cursos.filter(curso => curso.destaque === true).map(curso => gerarCard(curso)).join('');
    dtqCards.innerHTML = htmlDtqCards;
}