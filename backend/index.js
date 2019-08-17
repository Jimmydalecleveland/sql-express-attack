const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = process.env.NODE_ENV === 'development' ? 3000 : 80;
app.use(express.urlencoded())
// import data from '../frontend/race'

// DEPLOY TEST
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


app.get('/weapons', (req, res) => {
  db.query('SELECT * FROM weapon', (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.post('/create-race', (req, res) => {
  const race = req.body.race;
  const strBonus = req.body.strBonus;
  const dexBonus = req.body.dexBonus;
  let races = `INSERT INTO race (id, name, strBonus, dexBonus) Values(null , ?, ?, ?)`;
  
  db.query(races, [race, strBonus, dexBonus], (err, rows, fields) => {
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
