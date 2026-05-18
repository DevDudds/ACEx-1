let todosEbooks = [];

async function carregarJSON(){
    try {
        const resposta = await fetch('../data/ebooks.json');
        todosEbooks = await resposta.json();

        renderizar(todosEbooks);
    } catch (error) {
        console.log("Erro ao carregar o JSON", error);
    }
}

carregarJSON();

function gerarEbook(ebook){
    return `
        <div class="card">
            <img class="card-image" src=${ebook.imagem} alt="">
            <div class="card-info">
                <h2>${ebook.titulo}</h2>
                <p>${ebook.autor}</p>
                <p>${ebook.descricao}</p>
                <p><i class="fa-regular fa-file-lines"></i> ${ebook.paginas} páginas</p>
                <a class="download" href=""><i class="fa-solid fa-download"></i> Baixar PDF</a>
            </div>
        </div>
    `
}

function renderizar(listaEbooks){
    const cards = document.querySelector('.container-content');

    const htmlCards = listaEbooks.map(ebook => gerarEbook(ebook)).join('');
    cards.innerHTML = htmlCards;
}