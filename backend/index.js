const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = process.env.NODE_ENV === 'development' ? 3000 : 80;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to attack roll. Hit the /races endpoint for some data');
});

app.get('/races', (req, res) => {
  db.query('SELECT * FROM race', (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.post('/create-race', (req, res) => {
  const newRace = { name: 'Elf', strBonus: 0, dexBonus: 2 };
  db.query('INSERT INTO race SET ?', newRace, (err, rows, fields) => {
    if (err) throw err;

    res.json(rows);
  });
});

app.delete('/delete-race/:id', (req, res) => {
  db.query('DELETE FROM race WHERE id = ?', req.params.id, (error, rows) => {
    if (error) throw error;

    res.json(rows);
  });
});

app.listen(port, () =>
  console.log(`RPG ATTACK ROLL SIMULATOR on port ${port}!`)
);
