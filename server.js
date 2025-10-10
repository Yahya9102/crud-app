const express = require('express');
//import vår DB
const database = require('./mysqldb');

const app = express();

app.use(express.json());

// get all todos, alltså hämta från vår databas
app.get('/todos', (req, res) => {
  // Select * hämtar allt från vår todos tabell
  database.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Skickar svaret som JSON annars
    res.json(rows);
  });
});



// vi postar en ny todo  vår post body i JSON { "title": "Träna idag" }
app.post('/todos', (req, res) => {
  // Hämtar titel från request body, kör vi const title = req.body så kopierar vi HELA objektet och det vill vi inte. vi vill bara komma åt värdet
  const { title } = req.body;

  // Vi kör en insert mot vår databas i todos tabellen och matar in värdet på title 
  database.run('INSERT INTO todos (title) VALUES (?)', [title], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Skicka tillbaka det vi skapade precis
    res.json({
      id: this.lastID, //Vi får automatiskt sista idn 
      title,
      done: 0
    });
  });
});




// Vi kör vår update { "done": 1 }
app.put('/todos/:id', (req, res) => {
 
  // i Sqlite finns inge riktig boolean so 0=false 1=true
  const { done } = req.body;

  // Uppdatera vår todo och sätter ett nytt värde helt enkelt
  database.run(
    'UPDATE todos SET done = ? WHERE id = ?',
    [done, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Skickar tillbaka svaret
      res.json({ updated: this.changes });
    }
  );
});


// Radera vår todo, vi tar in ID som parameter
app.delete('/todos/:id', (req, res) => {
  // Tar bort raden med motsvarande id
  database.run('DELETE FROM todos WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Skicka svar som visar hur många rader som togs bort
    res.json({ deleted: this.changes });
  });
});


app.listen(3000, () => {
  console.log('Servern körs på http://localhost:3000');
});
