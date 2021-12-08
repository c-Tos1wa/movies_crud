const baseAPI = 'http://localhost:3000/filmes'

const cards = document.getElementById('list');
let edit = false;
let idEdit = 0;

const getAll = async () => {
  const response = await fetch(`${baseAPI}`);
  const movies = await response.json();

  movies.map((film) => {
    cards.insertAdjacentHTML('beforeend',
      `
      <div>
        <img id="poster"  width=400 height=500 
          src=${film.image} alt=${film.name} 
        />
        <div>
          <p><strong>${film.name}</strong></p>
          <p>${film.genre}</p>
          <p>${film.score}</p>
          <div>
            <p>Assistido</p> 
            <input type="checkbox" />
          </div>
          <button onclick="modify(${film.id})">Editar</button>
          <button onclick="erase(${film.id})">Apagar</button>
        </div>
      </div>
      `
    );
  })
}

getAll();

const post = async (submission) => {
  const response = await fetch(`${baseAPI}/submit`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(submission)
  })

  const data = await response.json();
  alert(data.message)
  cards.innerHTML = '';
  getAll();
  reset();
}

const submit = async () => {
  const image = document.getElementById('image').value;
  const name = document.getElementById('name').value;
  const genre = document.getElementById('genre').value;
  const score = document.getElementById('score').value;

  const movieSubmitted = {
    image,
    name,
    genre,
    score
  }

  if (edit) {
    put(movieSubmitted);
  } else {
    post(movieSubmitted)
  }
}

const put = async (editedFilm) => {
  const response = await fetch(`${baseAPI}/edit/${idEdit}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedFilm)
  })

  const newData = await response.json();
  alert(newData.message)

  cards.innerHTML = ''
  getAll();
  reset();

  edit = false;
  idEdit = 0;
}

const modify = async (id) => {
  edit = true;
  idEdit = id;

  const modifiedMovie = await getID(id);

  document.getElementById('image').value = modifiedMovie.image;
  document.getElementById('name').value = modifiedMovie.name;
  document.getElementById('genre').value = modifiedMovie.genre;
  document.getElementById('score').value = modifiedMovie.score;

}

const getID = async (idMovie) => {
  const response = await fetch(`${baseAPI}/${idMovie}`);
  const data = await response.json();
  return data
}

const erase = async (id) => {
  const response = await fetch(`${baseAPI}/delete/${id}`, {
    method: 'DELETE'
  })
  const result = await response.json();
  alert(result.message);

  cards.innerHTML = '';
  getAll();
  reset();
}

const reset = () => {
  document.getElementById('image').value = '';
  document.getElementById('name').value = '';
  document.getElementById('genre').value = '';
  document.getElementById('score').value = '';
}





