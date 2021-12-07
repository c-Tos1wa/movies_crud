const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const routes = require('./routes/route')
app.use('/filmes', routes);


app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}/filmes`)
})