const fs = require("fs");
const express = require("express");
const https = require("https");
const http = require("http");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = process.env.NODE_ENV === "development" ? 3000 : 443;

const key = fs.readFileSync(
  "/etc/letsencrypt/live/www.rpgattackroll.com/privkey.pem",
  "utf8"
);
const cert = fs.readFileSync(
  "/etc/letsencrypt/live/www.rpgattackroll.com/fullchain.pem",
  "utf8"
);

app.use(express.urlencoded());

app.use(cors());

app.get("*", (req, res) => {
  if (req.protocol === "http") {
    res.redirect(301, "https://" + req.headers.host + req.url);
  }
});

app.get("/", (req, res) => {
  res.send(
    "Welcome to the secure attack roll. Hit the /races endpoint for some data. It will be neat, maybe."
  );
});

app.get("/races", (req, res) => {
  db.query("SELECT * FROM race", (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.get("/races/human", (req, res) => {
  db.query("SELECT * FROM race", (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.post("/races", (req, res) => {
  db.query(
    'INSERT INTO race (id, name, strBonus, dexBonus) VALUES (null, "hill dwarf", 2, 0);',
    (error, results, fields) => {
      if (error) throw error;

      res.json(resuts);
    }
  );
});

app.get("/weapons", (req, res) => {
  db.query("SELECT * FROM weapon", (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.post("/create-race", (req, res) => {
  const race = req.body.race;
  const strBonus = req.body.strBonus;
  const dexBonus = req.body.dexBonus;
  let races = `INSERT INTO race (id, name, strBonus, dexBonus) Values(null , ?, ?, ?)`;

  db.query(races, [race, strBonus, dexBonus], (err, rows, fields) => {
    if (err) throw err;

    res.json(rows);
  });
});

app.delete("/delete-race/:id", (req, res) => {
  db.query("DELETE FROM race WHERE id = ?", req.params.id, (error, rows) => {
    if (error) throw error;

    res.json(rows);
  });
});

const httpsServer = https.createServer({ key, cert }, app);
const httpServer = http.createServer(app);
httpsServer.listen(port);
httpServer.listen(80);
