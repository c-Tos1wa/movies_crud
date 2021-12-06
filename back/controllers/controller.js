const service = require('../services/service');

const getAllMovies = (req, res) => {
  const films = service.getMovies();
  res.send(films)
}

const getOneMovie = (req, res) => {
  const id = req.params.id;
  const filmById = service.getMoviesById(id);
  res.send(filmById);
}

const postOneMovie = (req, res) => {
  const data = req.body;
  const newMovie = service.postMovie(data);
  res.send({message: `${newMovie.name} cadastrado com sucesso!`});
}

const putOneMovie = (req, res) => {
  const id = req.params.id;
  const dataEdit = req.body;
  const edited = service.putMovie(id, dataEdit);
  if(edited) {
    res.send({message: `${edited.name} editado com sucesso!`})
  } else {
    res.send({message: 'Ocorreu um erro! Filme não encontrado!'})
  }
}

const deleteOneMovie = (req, res) => {
  const id = req.params.id;
  const deletedOne = service.deleteMovie(id);
  res.send({message: `${deletedOne.name} deletado com sucesso`});
}

module.exports = {
  getAllMovies,
  getOneMovie,
  postOneMovie,
  putOneMovie,
  deleteOneMovie
}