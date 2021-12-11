const baseAPI = 'http://localhost:3000/filmes'

const cards = document.getElementById('list');
const msg = document.getElementById('message');
let edit = false;
let idEdit = 0;

const getAll = async () => {
  const response = await fetch(`${baseAPI}`);
  const movies = await response.json();

  movies.map((film) => {
    cards.insertAdjacentHTML('beforeend',
      `
      <div class="col-6 p-2">
        <div class="card mt-3 rounded">
          <div class="text-center">
              <img class="card-img-top py-2" style="width:auto;height:50em;" 
                src=${film.image} alt=${film.name} />
              <div class="card-body my-3">
                  <p class="card-text h3">${film.name}</p>
                  <p class="card-text h4">${film.genre}</p>
                  <p class="card-text h4">Nota: ${film.score}</p>
                  ${film.watched ? '<p class="card-text h4"> Status: Assistido</p>' : `<button class="btn btn-info p-2" onclick="watched(${film.id})">Assistido?</button>`}
              </div>  
            <div class="text-center m-2 p-2">
              <button class="btn btn-success py-2 px-3" onclick="modify(${film.id})">Editar</button>
              <button class="btn btn-danger py-2 px-3" onclick="erase(${film.id})">Apagar</button>
            </div>
          </div> 
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
  msg.insertAdjacentHTML("beforeend", `
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <p class="h5 p-3">${data.message}</p><button type="button" class="btn-close p-3" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `);

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
  msg.insertAdjacentHTML("beforeend", `
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <p class="h5 p-3">${newData.message}</p><button type="button" class="btn-close p-3" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `);

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
  msg.insertAdjacentHTML("beforeend", `
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <p class="h5 p-3">${result.message}</p><button type="button" class="btn-close p-3" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `);
  cards.innerHTML = '';
  getAll();
  reset();
}

const watched = async (id) => {
  const film = await getID(id);
  film.watched = true;
  const response = await fetch(`${baseAPI}/edit/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(film)
  })
  cards.innerHTML = '';
  getAll();
}

const reset = () => {
  document.getElementById('image').value = '';
  document.getElementById('name').value = '';
  document.getElementById('genre').value = '';
  document.getElementById('score').value = '';
}





