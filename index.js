'use strict'

const Hapi = require('hapi');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const url = "mongodb://localhost:27017/tododb";

mongoose.connect(url);
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello, world!'; // TODO: return a list of todos
  }
});

server.route({
  method: 'POST',
  path: '/',
  handler: (request, h) => {
    const { name, checked } = request.payload;
    const newTodo = new Todo({
      name,
      checked,
    });
    return newTodo.save();
  }
})

server.route({
  method: 'GET',
  path: '/{id}',
  handler: (request, h) => {
    // TODO: retrieve a todo item based on a unique id
  }
});

server.route({
  method: 'PUT',
  path: '/{id}',
  handler: (request, h) => {
    // TODO: update a todo item based on a unique id
  }
})

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();