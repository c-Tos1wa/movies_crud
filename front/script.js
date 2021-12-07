const baseURL = "http://localhost:3000/filmes"

const getAllMovies = async () => {
  const response = await fetch(`${baseURL}`);
  const movie = await response.json();
  return movie
}


