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

const getMovies = () => movies;

const getMoviesById = (id) => {
  return movies.find( (movie) => movie.id == id)
}

const postMovie = (newMovie) => {
  const idParam = movies.length + 1;
  newMovie.id = idParam
  movies.push(newMovie);
  return newMovie;
}

const putMovie = (id, modifiedFilm) => {
  const index = movies.findIndex((film) => film.id == id);
  if (index >= 0){
    movies[index] = {
      ...movies[index],
      ...modifiedFilm
    }
    return modifiedFilm
  } else {
    return false
  }
}

const deleteMovie = (id) => {
  if(!id){
    return
  }
  const index = movies.findIndex((movie) => movie.id == id);
  const deletedMovie = movies[index];
  movies.splice(index, 1);
  return deletedMovie;
}

module.exports = {
  getMovies,
  getMoviesById,
  postMovie,
  putMovie,
  deleteMovie
}
