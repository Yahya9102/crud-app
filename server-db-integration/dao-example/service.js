const db = require('./db');
const { createTodo: daoCreateTodo } = require('./dao');


// CREATE
function createTodo(title, callback) {

        
    daoCreateTodo(title, callback)
  
}




module.exports = { createTodo};
