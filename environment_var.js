const mysql2 = require('mysql2').verbose();
const db = new mysql2.Database(process.env.DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the mysql2 database.');
  }
});

module.exports = db;
