const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});


const setupDatabase = () =>{
//create users table
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

// Create the ChildProfile table
pool.query(`
  CREATE TABLE IF NOT EXISTS ChildProfile (
    profile_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    childName VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    parentName VARCHAR(255) NOT NULL,
    parentEmail VARCHAR(255) NOT NULL,
    parentPhone VARCHAR(255) NOT NULL,
    PRIMARY KEY (profile_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  );
`).then(() => {
  console.log('ChildProfile table created successfully');
});

// create the Immunizations table
pool.query(`
  CREATE TABLE IF NOT EXISTS Immunizations (
    immunization_id INT NOT NULL AUTO_INCREMENT,
    profile_id INT NOT NULL,
    user_id INT NOT NULL,
    child_name VARCHAR(255) NOT NULL,
    vaccine_name VARCHAR(255) NOT NULL,
    date_administered DATE NOT NULL,
    next_due_date DATE NOT NULL,
    doctor_name VARCHAR(255),
    notes TEXT,
    PRIMARY KEY (immunization_id),
    FOREIGN KEY (profile_id) REFERENCES ChildProfile(profile_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  )
`).then(() => {
  console.log('Immunization table created successfully');
});

// create the reminders table
pool.query(
  `CREATE TABLE IF NOT EXISTS Reminders (
    reminder_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (reminder_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  );
  `
).then(() => {
  console.log('Reminders table created successfully');
});
};
module.exports = {
  pool,
  setupDatabase
};
