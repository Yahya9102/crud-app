// Importerar SQLite3-biblioteket
const sqlite3 = require('sqlite3').verbose();



// Skapar (eller öppnar) en databasfil som heter todos.db
const database = new sqlite3.Database('./todos.db', (error) => {
    if (error) {
    // Om något går fel vid anslutning, skriv ut felmeddelande
    console.error('Fel vid anslutning till databasen:', error.message);
} else {
    // Om allt fungerar, bekräfta anslutningen
    console.log('Ansluten till SQLite-databasen.');
  }
});




// Skapar tabellen "todos" om den inte redan finns
database.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- unikt ID som ökar automatiskt
    title TEXT NOT NULL,                    -- textfält för todo-titel
    done INTEGER DEFAULT 0                  -- 0 = ej klar, 1 = klar
  )
`);



/*
// Lägger till en ny todo i tabellen
database.run(`INSERT INTO todos (title, done) VALUES (?, ?)`,['Köp dricka', 0],(err) => {
      console.log('Todo har lagts till!');
  }
);

*/




const id = 3; 

database.run(`DELETE FROM todos WHERE id = ?`,[id],function (error) {
    if (error) {
      console.error('Fel vid borttagning av todo:', error.message);
    } else if (this.changes > 0) {
      console.log(`Todo med ID ${id} har tagits bort.`);
    } else {
      console.log(`Ingen todo hittades med ID ${id}.`);
    }
  }
);





// db.all för ALLA rader
database.all("Select * from todos", (err, rows) => {
    if(err){
        console.log("Kunde inte hämta något data från databasen")
    } else{
    console.log(rows)
    }
})



// Uppdatera 

// const id = 3; // USER ID, id som identiferar den kolumnen eller användare
database.run(`UPDATE todos SET title = ?, done = ? WHERE id = ?`, ['Köp bubbel', 1, id],function (error) {
    if (error) {
      console.error('Fel vid uppdatering av todo:', error.message);
    } else if (this.changes > 0) {
      console.log(`Todo med ID ${id} har uppdaterats.`);
    } else {
      console.log(`Ingen todo hittades med ID ${id}.`);
    }
  }
);








//DB get för EN rad (tex användare med id 1)
database.get("SELECT * FROM todos WHERE id = ?", [1], (err, row) => {
  if (err) {
    console.error("Fel vid hämtning:", err.message);
  } else {
    console.log("Todo:", row);
  }
});













// Exporterar databaskopplingen så att andra filer kan använda den
 module.exports = db;

// RUN HERE





/*
// Importerar SQLite3-biblioteket
const sqlite3 = require('sqlite3').verbose();

// Skapar (eller öppnar) en databasfil som heter todos.db
const db = new sqlite3.Database('./todos.db', (err) => {
  if (err) {
    console.error('Fel vid anslutning till databasen:', err.message);
  } else {
    console.log('ansluten till SQLite-databasen.');
  }
});

// Skapar tabellen "todos" om den inte redan finns
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- unikt ID som ökar automatiskt
    title TEXT NOT NULL,                    -- textfält för todo-titel
    done INTEGER DEFAULT 0                  -- 0 = ej klar, 1 = klar
  )
`);





// create
function createTodo(title) {
  db.run('INSERT INTO todos (title) VALUES (?)', [title], function (err) {
    if (err) {
      console.error('fel vid skapande:', err.message);
    } else {
      console.log(`todo skapad: (id: ${this.lastID}) "${title}"`);
    }
  });
}

// read (ALLA)
function getAllTodos() {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      console.error('fel vid hämtning:', err.message);
    } else if (rows.length === 0) {
      console.log('inga todos hittades.');
    } else {
      console.log('Alla todos:');
      console.table(rows);
    }
  });
}

//r read Bara en 
function getTodoById(id) {
  db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('fel vid hämtning:', err.message);
    } else if (!row) {
      console.log(`todo hittades med id ${id}.`);
    } else {
      console.log('Hittad todo:', row);
    }
  });
}

// uppdatera (coales)
function updateTodo(id, title, done) {
  db.run(
    'UPDATE todos SET title = COALESCE(?, title), done = COALESCE(?, done) WHERE id = ?',
    [title, done, id],
    function (err) {
      if (err) {
        console.error('Fel vid uppdatering:', err.message);
      } else if (this.changes === 0) {
        console.log(` todo hittades med id ${id}.`);
      } else {
        console.log(`todo med id ${id} uppdaterad.`);
      }
    }
  );
}

// radera
function deleteTodo(id) {
  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('fel vid borttagning:', err.message);
    } else if (this.changes === 0) {
      console.log(`todo hittades med id ${id}.`);
    } else {
      console.log(`todo med id ${id} har tagits bort.`);
    }
  });
}


// CREATE
// createTodo('Handla mat');
// createTodo('Träna 30 min');
// createTodo('Koda lite');

// READ
// getAllTodos();
// getTodoById(1);

// UPDATE
// updateTodo(1, 'Handla mat och kaffe', 1); // Uppdaterar titel och markerar som klar
// updateTodo(2, null, 1); // Markerar todo #2 som klar (behåller titel)

// DELETE
// deleteTodo(3);


module.exports = db;
*/




/*
const mysql = require('mysql2');

// Skapa en anslutning till MySQL
const db = mysql.createConnection({
  host: 'localhost',      // eller t.ex. '127.0.0.1'
  user: 'root',           // ditt användarnamn
  password: 'mitt_lösenord',
  database: 'todos_db'    // se till att den databasen finns
});

// Anslut till databasen
db.connect((err) => {
  if (err) {
    console.error('Fel vid anslutning till databasen:', err.message);
    return;
  }
  console.log('Ansluten till MySQL-databasen.');

  // Skapa tabellen "todos" om den inte redan finns
  const createTable = `
    CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,  -- unikt ID som ökar automatiskt
      title VARCHAR(255) NOT NULL,        -- textfält för todo-titel
      done TINYINT DEFAULT 0              -- 0 = ej klar, 1 = klar
    )
  `;

  db.query(createTable, (err) => {
    if (err) {
      console.error('Fel vid skapande av tabell:', err.message);
    } else {
      console.log('Tabellen "todos" är redo!');
    }
  });
});

*/