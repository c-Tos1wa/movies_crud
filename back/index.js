const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const movies = [{
  id: 1,
  name: "Free Guy: Assumindo o Controle",
  image: "https://www.magazine-hd.com/apps/wp/wp-content/uploads/2021/06/free-guy-poster-12agosto.jpg",
  genre: "Comédia",
  score: 7.2,
  watched: true,
},
{
  id: 2,
  name: "Duna",
  image: "https://img.elo7.com.br/product/original/3330DC9/duna-2020-dune-quadro-decorativo-a3-filme-duna-2020.jpg",
  genre: "Ficção científica",
  score: 8.2,
  watched: false,
},
{
  id: 3,
  name: "Sem Tempo para Morrer",
  image: "https://cdn.europosters.eu/image/1300/posters/james-bond-no-time-to-die-profile-i114389.jpg",
  genre: "Action",
  score: 7.4,
  watched: true,
},
{
  id: 4,
  name: "Noite Passada em Soho",
  image: "https://m.media-amazon.com/images/M/MV5BZjgwZDIwY2MtNGZlNy00NGRlLWFmNTgtOTBkZThjMDUwMGJhXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg",
  genre: "Terror",
  score: 7.3,
  watched: false,
},
{
  id: 5,
  name: "Ghostbusters: Mais Além",
  image: "https://sm.ign.com/ign_pt/screenshot/default/ghostbusters-afterlife-poster-1_u7df.jpg",
  genre: "Aventura",
  score: 7.7,
  watched: true,
}]

app.all('/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Methods", "*");
  next();
})

app.get('/', (req, res) => {
  res.send(movies);
})

app.get('/filmes/:id', (req, res) => {
  const id = req.params.id
  const moviesById = movies.find(film => film.id == id);
  res.send(moviesById)
})

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`)
})