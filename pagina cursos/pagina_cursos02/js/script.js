let allCourses = [];

async function loadCards(){
    try {
        const answer = await fetch('data/cursos.json');
        allCourses = await answer.json();
        renderCourses(allCourses);
    }catch(erro) {
        console.log("Erro ao carregar o JSON:", erro);
    }
}

loadCards();

const filterForm = document.querySelector('.filters__form');
const searchField = document.querySelector('#busca');
const selectArea = document.querySelector('#area');

filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const termoBuscado = searchField.value.toLowerCase();
    
    const filteredCourses = allCourses.filter(curso => {
        const tituloCourse = curso.titulo.toLowerCase();
        return tituloCourse.includes(termoBuscado);
    })

    const filteredCourses = allCourses.filter(curso => {
        const areaCourse = curso.area.toLowerCase();
        return areaCourse === selectArea.value;
    })

    renderCourses(filteredCourses);
})


/*filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const termoBuscado = searchField.value.toLowerCase();
    
    const filteredCourses = allCourses.filter(curso => {
        const tituloCourse = curso.titulo.toLowerCase();
        return tituloCourse.includes(termoBuscado);
    })

    renderCourses(filteredCourses);
})

selectArea.addEventListener('input', (event) => {
    event.preventDefault();
    const filteredCourses = allCourses.filter(curso => {
        const areaCourse = curso.area.toLowerCase();
        return areaCourse === selectArea.value;
    })
    
    renderCourses(filteredCourses);
})*/

function spawnCard(curso){
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
                    <span>${curso.duracao} horas</span>    
                </div>
                <a class="card__link" href="#">Acessar playlist</a>
            </div>
        </article>
    `
}

function renderCourses(listCourses){
    const mainCards = document.querySelector('#cursos .cards');
    const dtqCards = document.querySelector('#destaques .cards');

    const htmlMainCards = listCourses.map(curso => spawnCard(curso)).join('');
    mainCards.innerHTML = htmlMainCards;

    const htmlDtqCards = allCourses.filter(curso => curso.destaque === true).map(curso => spawnCard(curso)).join('');
    dtqCards.innerHTML = htmlDtqCards;
}