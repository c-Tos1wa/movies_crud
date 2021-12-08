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
  if (!req.body.name || !req.body.image || !req.body.genre){
    res.status(400).send({message: "Não foi possível cadastrar este filme. Por favor, preencha os campos nome, imagem e gênero"})
    return
  }
  const data = req.body;
  const newMovie = service.postMovie(data);

  if(!newMovie.id){
    res.status(500).send({message: "Ocorreu um erro ao salvar, tente novamente mais tarde."})
  }
  res.send({message: `${newMovie.name} cadastrado com sucesso!`});
}

const putOneMovie = (req, res) => {
  if(!req.body.name || !req.body.image){
    res.status(400).send({message: "Não foi possível fazer a edição, por favor preencha os campos nome e imagem"})
  }
  const id = req.params.id;
  const dataEdit = req.body;
  const edited = service.putMovie(id, dataEdit);
  if(edited) {
    res.send({message: `${edited.name} editado com sucesso!`})
  } else {
    res.status(400).send({message: 'Ocorreu um erro! Filme não encontrado!'})
  }
}

const deleteOneMovie = (req, res) => {
  const id = req.params.id;
  const deletedOne = service.deleteMovie(id);
  if(!deletedOne){
    res.status(404).send({message:"Ocorreu um erro e o filme não pôde ser deletado!"})
  }
  res.send({message: `${deletedOne.name} deletado com sucesso`});
}

module.exports = {
  getAllMovies,
  getOneMovie,
  postOneMovie,
  putOneMovie,
  deleteOneMovie
}