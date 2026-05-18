const container = document.getElementById("cards_cursos");
const container2 = document.getElementById("cards_cursos_destaques");

fetch("data/cursos.json")
  .then((response) => response.json())
  .then((dados) => {
    dados.cursos.forEach((curso) => {
        if (curso.destaque) {
            const cardDestaque = document.createElement("article");
            cardDestaque.classList.add("card_curso");
            
        cardDestaque.innerHTML = `
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
            container2.appendChild(cardDestaque);
        } 
      const card = document.createElement("article");
      card.classList.add("card_curso");

      card.innerHTML = `
        <article class="card_curso">
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
        </article>
            `;

      container.appendChild(card);
        
    });
  })
  .catch((error) => {
    console.error("Erro ao carregar JSON:", error);
  });
