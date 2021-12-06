const express = require('express');
const route = express.Router();

const controller = require('../controllers/controller');

route.get('/', controller.getAllMovies);

route.get('/:id', controller.getOneMovie); 

route.post('/submit', controller.postOneMovie);

route.put('/editing/:id', controller.putOneMovie);

route.delete('/deleting/:id', controller.deleteOneMovie);

module.exports = route;



