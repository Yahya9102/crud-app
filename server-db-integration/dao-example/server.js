const express = require('express');
const { createTodo} = require('./service');



const app = express();
app.use(express.json());

// CREATE
app.post('/todos', (req, res) => {

  const title = req.body.title;
 
  // validerings method
  username = title;



  createTodo(username, (err, todo) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(todo);
  });
});



/*
// GET ONE
app.get('/todos/:id', (req, res) => {
  getTodoById(req.params.id, (err, todo) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!todo) return res.status(404).json({ message: 'Todo hittades inte' });
    res.json(todo);
  });
});



// UPDATE
app.put('/todos/:id', (req, res) => {
  const { title, done } = req.body;
  updateTodo(req.params.id, title, done, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// DELETE
app.delete('/todos/:id', (req, res) => {
  deleteTodo(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});


*/

app.listen(3000, () => console.log('Servern körs på http://localhost:3000'));
