const mysql2 = require('mysql2/promise');
const db = new mysql2.Database({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the mysql2 database.');
  }
});

module.exports = db;
