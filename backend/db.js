var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin',
  database : 'rpg'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting to db: ' + err.stack)
    return;
  }

  console.log('DB connected as id ' + connection.threadId)
});

module.exports = connection