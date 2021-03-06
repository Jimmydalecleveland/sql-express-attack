require('dotenv').config()

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting to db: ' + err.stack)
    return;
  }

  console.log('DB connected as id ' + connection.threadId)
});

module.exports = connection