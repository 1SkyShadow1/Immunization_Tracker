const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
// create users table
pool.query(`
  CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
  );
`).then(() => {
  console.log('Users table created successfully');
});

// Create the children table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS Children (
    child_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    PRIMARY KEY (child_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  );
`).then(() => {
  console.log('Children table created successfully');
});

// create the Immunization table
pool.query(
 ` CREATE TABLE IF NOT EXISTS Immunizations (immunization_id INT NOT NULL AUTO_INCREMENT,
  child_id INT NOT NULL,
  vaccine_name VARCHAR(255) NOT NULL,
  date_administered DATE NOT NULL,
  next_due_date DATE NOT NULL,
  notes TEXT,
  PRIMARY KEY (immunization_id),
  FOREIGN KEY (child_id) REFERENCES Children(child_id)
  )
  `
) .then(()=>{
  console.log('Immunization table created successfully');
})
module.exports = pool