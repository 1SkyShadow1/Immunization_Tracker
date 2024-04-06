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
}));

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

app.post('/reminders', (req, res) => {
  const { user_id, title, date } = req.body;
  const query = 'INSERT INTO reminders (user_id, title, date) VALUES (?, ?, ?)';
  connection.query(query, [user_id, title, date], (error, results) => {
    if (error) {
      console.error('Error inserting reminder into the database: ' + error.stack);
      return res.status(500).send('Error inserting reminder into the database');
    }
    console.log('Reminder inserted into the database');
    res.status(201).json({ id: results.insertId, user_id, title, date });
  });
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  connection.query(checkUserQuery, [email], async (err, result) => {
    if (err) {
      console.error('Error checking user in the database: ' + err.stack);
      return res.status(500).send('Error checking user in the database');
    }

    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    } else {
      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
      
        // Insert the data into the database
        const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        connection.query(insertUserQuery, [name, email, hashedPassword], (err, result) => {
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
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check if the user exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  connection.query(checkUserQuery, [username], async (err, result) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).send('Error querying the database');
      return;
    }

    if (result.length === 0) {
      res.status(400).send('User does not exist');
      return;
    }

    const user = result[0];

    // Compare the hashed password with the one in the database
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      res.status(400).send('Incorrect password');
      return;
    }

    // User is authenticated, redirect to home page
    res.status(200).json({ success: true, user: { username: user.username, email: user.email } });
  });
});


// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});