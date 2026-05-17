const container = document.getElementById("cards_cursos");
const container2 = document.getElementById("cards_cursos_destaques");
const inputBusca = document.getElementById("busca");
const formFiltros = document.querySelector(".filters__form"); 
const selectArea = document.getElementById("area");

let cursos = [];

function criarCard(curso) {
  const card = document.createElement("article");
  card.classList.add("card_curso");

  card.innerHTML = `
    <div class="dados">
      <img class="img_card" src="${curso.imagem}" alt="Imagem do curso">
      <span class="card__tag">${curso.categoria}</span>
    </div>

    <div class="card__body">
      <h3>${curso.titulo}</h3>
      <p>${curso.descricao}</p>

      <div class="horas">
        <span>${curso.horas}</span>
      </div>

      <a class="card__link" href="${curso.link}">Acessar playlist</a>
    </div>
  `;

  return card;
}

function mostrarCursos(lista) {
  container.innerHTML = "";
  container2.innerHTML = "";

  lista.forEach((curso) => {
    container.appendChild(criarCard(curso));

    if (curso.destaque) {
      container2.appendChild(criarCard(curso));
    }
  });
}

fetch("data/cursos.json")
  .then((response) => response.json())
  .then((dados) => {
    cursos = dados.cursos;
    mostrarCursos(cursos);
  })
  .catch((error) => {
    console.error("Erro ao carregar JSON:", error);
  });

formFiltros.addEventListener("submit", (event) => {
  event.preventDefault();
  filtrarCursos();
});

inputBusca.addEventListener("input", filtrarCursos);

selectArea.addEventListener("change", filtrarCursos);

function filtrarCursos() {

  const textoBuscado = inputBusca.value.toLowerCase().trim();

  const areaSelecionada = selectArea.value.toLowerCase();

  const cursosFiltrados = cursos.filter((curso) => {

    const tituloValido = curso.titulo
      .toLowerCase()
      .includes(textoBuscado);

    const areaValida =
      areaSelecionada === "todos" ||
      curso.categoria.toLowerCase() === areaSelecionada;

    return tituloValido && areaValida;
  });

  mostrarCursos(cursosFiltrados);
}

const hamburguer = document.getElementById("hamburguer");
const navMenu = document.getElementById("nav_menu");

hamburguer.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});