require('dotenv').config();

const mysql = require('mysql2');



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});





db.connect((err) => {
  if (err) {
    console.error('Fel vid anslutning till databasen:', err.message);
  } else {
    console.log('Ansluten till MySQL-databasen.');
  }
});



// Skapa tabellen om den inte redan finns
const createTable = `
CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  done TINYINT DEFAULT 0
)
`;


db.query(createTable, (err) => {
  if (err) {
    console.error('Fel vid skapande av tabell:', err.message);
  } else {
    console.log('Tabellen "todos" är redo!');
  }
});






//CREATE
function createTodo(title) {
  db.query('INSERT INTO todos (title) VALUES (?)', [title], (err, result) => {
    if (err) {
      console.error('Fel vid skapande:', err.message);
    } else {
      console.log(`Todo skapad: (id: ${result.insertId}) "${title}"`);
    }
  });
}


// createTodo("Yahyas matlåda")






//READ ALL
function getAllTodos() {
  db.query('SELECT * FROM todos', (err, rows) => {
    if (err) {
      console.error('Fel vid hämtning:', err.message);
    } else if (rows.length === 0) {
      console.log('Inga todos hittades.');
    } else {
      console.table(rows);
    }
  });
}

// getAllTodos()



//READ ONE
function getTodoById(id) {
  db.query('SELECT * FROM todos WHERE id = ?', [id], (err, rows) => {
    if (err) {
      console.error('Fel vid hämtning:', err.message);
    } else if (rows.length === 0) {
      console.log(`Ingen todo hittades med ID ${id}.`);
    } else {
      console.log('Hittad todo:', rows[0]);
    }
  });
}

getTodoById(1)




//DELETE
function deleteTodo(id) {
  db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Fel vid borttagning:', err.message);
    } else if (result.affectedRows === 0) {
      console.log(`Ingen todo hittades med ID ${id}.`);
    } else {
      console.log(`Todo med ID ${id} har tagits bort.`);
    }
  });
}


deleteTodo(1)
/*



// createTodo('Köp kaffe');
// getAllTodos();
// getTodoById(1);
// updateTodo(1, 'Köp kaffe och mjölk', 1);
// deleteTodo(1);

module.exports = db;

*/
