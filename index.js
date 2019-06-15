const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()
const port = 3000

app.use(cors())
 
app.get('/players', (req, res) => {
  db.query('SELECT * FROM player', function (error, results, fields) {
    if (error) throw error;
    
    res.json(results)
  });
})

app.get('/players/:id', (req, res) => {
  db.query('SELECT * FROM player WHERE id = ?', req.params.id, function (error, results, fields) {
    if (error) throw error;
    
    res.json(results)
  });
})


app.get('/races', (req, res) => {
  db.query('SELECT * FROM race', function (error, results, fields) {
    if (error) throw error;
    
    res.json(results)
  });
})

app.post('/create-races', (req, res) => {
  const newRace = { name: 'Elf', strBonus: 0, dexBonus: 2 }
  db.query('INSERT INTO race SET ?', newRace, function(err, rows, fields) {
    if (err) throw err

    res.json(rows)
  })
})

app.delete('/delete-race/:id', (req, res) => {
  db.query('DELETE FROM race WHERE id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err

    res.json(rows)
  })
})

app.listen(port, () => console.log(`RPG ATTACK ROLL SIMULATOR on port ${port}!`))
