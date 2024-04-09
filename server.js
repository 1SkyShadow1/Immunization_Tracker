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

app.get('/reminders', (req, res) => {
  const { user_id } = req.query;
  const query = 'SELECT * FROM reminders WHERE user_id = ?';
  connection.query(query, [user_id], (error, results) => {
    if (error) {
      console.error('Error fetching reminders from the database: ' + error.stack);
      return res.status(500).send('Error fetching reminders from the database');
    }
    res.status(200).json(results);
  });
});

app.delete('/reminders/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Reminders WHERE reminder_id = ?';

  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting reminder: ', err);
      res.status(500).json({ message: 'Error deleting reminder' });
    } else {
      console.log('Reminder deleted successfully: ', result);
      res.status(200).json({ message: 'Reminder deleted successfully' });
    }
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
    res.status(200).json({ success: true, user: {id: user.user_id, username: user.username, email: user.email } });
  });
});

app.post('/user-profile', (req, res) => {
  const { user_id, childName, dateOfBirth, parentName, parentEmail, parentPhone } = req.body;
  

  const query = 'INSERT INTO userprofile (user_id, childName, dateOfBirth, parentName, parentEmail, parentPhone) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [user_id, childName, dateOfBirth, parentName, parentEmail, parentPhone], (error, results) => {
    if (error) {
      console.error('Error inserting user profile into the database: ', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).send('Invalid user ID. Please ensure the user exists.'); 
      } else if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        return res.status(400).send('Incorrect data format for one or more fields.');
      } else {
        return res.status(500).send('An error occurred while processing your request.');
      }
    }
    console.log('User profile inserted into the database');
    res.status(201).json({ success: true, user_id, childName, dateOfBirth, parentName, parentEmail, parentPhone});
  });
});

app.post('/user-profile', (req, res) => {
  const { childName, dateOfBirth, parentName, parentEmail, parentPhone, user_id } = req.body;

  // Query to update the user profile
  const updateUserProfileQuery = 'UPDATE UserProfile SET childName = ?, dateOfBirth = ?, parentName = ?, parentEmail = ?, parentPhone = ?, WHERE user_id = ?';
  connection.query(updateUserProfileQuery, [childName, dateOfBirth, parentName, parentEmail, parentPhone, user_id], (err, result) => {
    if (err) {
      console.error('Error updating user profile: ' + err.stack);
      return res.status(500).send('Error updating user profile');
    }
    console.log('User profile updated successfully');
    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  });
});

app.get('/user-profile/:user_id', (req, res) => {
  const { user_id } = req.params;

  // Query to fetch the user profile
  const fetchUserProfileQuery = 'SELECT * FROM UserProfile WHERE user_id = ?';
  connection.query(fetchUserProfileQuery, [user_id], (err, result) => {
    if (err) {
      console.error('Error fetching user profile: ' + err.stack);
      return res.status(500).send('Error fetching user profile');
    }
    res.status(200).json({ success: true, data: result });
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});