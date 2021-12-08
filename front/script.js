const baseAPI = 'http://localhost:3000/filmes'

const cards = document.getElementById('list');
let edit = false;
let idEdit = 0;

const getAll = async() => {
  const response = await fetch(`${baseAPI}`);
  const movies = await response.json();

  movies.map((film) => {
    if(film.watched === true){
      cards.insertAdjacentHTML('beforeend', 
      `
        <img id="poster"  width=400 height=500 
          src=${film.image} alt=${film.name} 
        />
        <p><strong>${film.name}</strong></p>
        <p>${film.genre}</p>
        <p>${film.score}</p>
        <p>Assistido</p>
        <button onclick="modify(${film.id})">Editar</button>
        `
        )} 
        else {
          cards.insertAdjacentHTML('beforeend', 
      `
        <img class="poster"  width=400 height=500 
          src=${film.image} alt=${film.name} />
        <p><strong>${film.name}</strong></p>
        <p>${film.genre}</p>
        <p>${film.score}</p>
        `
        )}
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

const put = async (edited) => {
  const response = await fetch(`${baseAPI}/edit/${idEdit}`,{
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(edited)
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
  idEdit = 0;

  const movieMod = await getById(id);

  document.getElementById('image').value = movieMod.image;
  document.getElementById('name').value = movieMod.name;
  document.getElementById('genre').value = movieMod.genre;
  document.getElementById('score').value = movieMod.score;
 
  //  cards.insertAdjacentHTML("beforeend", `
  //   <input id=${movieMod.watched} type=checked />
  //  `)
}



const reset = () => {
  document.getElementById('image').value = '';
  document.getElementById('name').value = '';
  document.getElementById('genre').value = '';
  document.getElementById('score').value = '';  
}





