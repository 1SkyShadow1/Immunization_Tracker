const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
origin: 'http://localhost:3000'
})); // Use cors middleware to handle CORS

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insert the data into the database
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting data into the database: ' + err.stack);
        return res.status(500).send('Error inserting data into the database');
      }
      console.log('Data inserted into the database');
      res.status(200).json({ success: true, message: 'Registration successful' });
    });
  } catch (err) {
    console.error('Error hashing password: ' + err.stack);
    return res.status(500).send('Error hashing password');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});