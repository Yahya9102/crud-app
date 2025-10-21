const db = require('./db');

// CREATE
function createTodo(title, callback) {
  db.run('INSERT INTO todos (title) VALUES (?)', [title], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, title, done: 0 });
  });
}





// READ ALL
function getAllTodos(callback) {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

// READ ONE
function getTodoById(id, callback) {
  db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
}

// UPDATE
function updateTodo(id, title, done, callback) {
  db.run(
    'UPDATE todos SET title = COALESCE(?, title), done = COALESCE(?, done) WHERE id = ?',
    [title, done, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { changes: this.changes });
    }
  );
}

// DELETE
function deleteTodo(id, callback) {
  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
}

module.exports = { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo };
