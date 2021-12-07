const baseAPI = 'http://localhost:3000'

const cards = document.getElementById('list');

const getAllMovies = async() => {
  const response = await fetch(`${baseAPI}/filmes`);
  const movies = await response.json();
  
  movies.map((film) => {
    cards.insertAdjacentHTML('beforeend', 
    `
      <img src=${film.image} alt=${film.name} />
      <p>${film.name}</p>
      <p>${film.genre}</p>
      <p>${film.score}</p>
      <button class="edit-button">Editar</button>
      <button class="delete-button">Excluir</button>
      `
    )
  })
}

getAllMovies();

