const sqlite3 = require('sqlite3').verbose();

// Skapa eller öppna databasen
const db = new sqlite3.Database('./todos.db', (err) => {
  if (err) {
    console.error('Fel vid anslutning till databasen:', err.message);
  } else {
    console.log('Ansluten till SQLite-databasen.');
  }
});

// Skapa tabellen om den inte finns
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  )
`);

module.exports = db;
