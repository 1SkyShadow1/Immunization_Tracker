const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const db = require('./db');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cors({
origin: 'http://localhost:3000'
}));

// This is how we create the tables in the database
db.setupDatabase();

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

// reminders
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

  // register
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

  // login
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



        // Childprofile
app.post('/child-profile', (req, res) => {
  
  const { user_id, childName, dateOfBirth, parentName, parentEmail, parentPhone } = req.body;

  const query = 'INSERT INTO childprofile (user_id, childName, dateOfBirth, parentName, parentEmail, parentPhone) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [user_id, childName, dateOfBirth, parentName, parentEmail, parentPhone], (error, results) => {
    if (error) {
      console.error('Error inserting child profile into the database: ', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).send('Invalid user ID. Please ensure the user exists.'); 
      } else if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        return res.status(400).send('Incorrect data format for one or more fields.');
      } else {
        return res.status(500).send('An error occurred while processing your request.');
      }
    }
    console.log('Child profile inserted into the database');
    res.status(201).json({ success: true, user_id, childName, dateOfBirth, parentName, parentEmail, parentPhone});
  });
});

app.get('/childprofile/:user_id', (req, res) => {
  const { user_id } = req.params;
  connection.query('SELECT profile_id, childName FROM childprofile WHERE user_id = ?', [user_id], (error, results) => {
    if (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    } else {
      res.json({ success: true, children: results });
    }
  });
});


app.get('/childprofile/:id', async (req, res) => {
    try {
      const profileId = parseInt(req.params.id, 10); 
      const profile = await ChildProfile.findOne({ profile_id: profileId });
  
      if (profile) {
        res.json({ profile_id: profile.profile_id });
      } else {
        res.json({});
      }
    } catch (error) {
      console.error('Error fetching child profile:', error);
      res.status(500).json({ message: 'An error occurred while fetching the child profile.' });
    }
  });







// Immunizations
app.post('/immunizations', (req, res) => {
  const { profile_id, user_id, child_name, vaccine_name, date_administered, next_due_date, notes, doctor_name } = req.body;
  const query = 'INSERT INTO immunizations (profile_id, user_id, child_name, vaccine_name, date_administered, next_due_date, notes, doctor_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [profile_id, user_id, child_name, vaccine_name, date_administered, next_due_date, notes, doctor_name], (error, results) => {
    if (error) {
      console.error('Error inserting immunization into the database: ' + error.stack);
      return res.status(500).send('Error inserting immunization into the database');
    }
    console.log('Immunization inserted into the database');
    res.status(201).json({ id: results.insertId, profile_id, user_id, child_name, vaccine_name, date_administered, next_due_date, notes, doctor_name });
  });
});


app.get('/immunizations/:user_id', (req, res) => {
  const sql = 'SELECT * FROM Immunizations WHERE user_id = ?';
  const userId = parseInt(req.params.user_id,);

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching immunizations: ', err);
      res.status(500).json({ message: 'Error fetching immunizations' });
    } else {
      console.log('Immunizations fetched successfully: ', results);
      res.status(200).json(results);
    }
  });
});

app.put('/immunizations/:immunization_id', (req, res) => {
    console.log('Request body:', req.body);

    let { child_name, vaccine_name, date_administered, doctor_name } = req.body;

    if (!child_name || !vaccine_name || !date_administered || !doctor_name) {
        return res.status(400).json({ message: 'Missing required fields in request body' });
    }

    try {
        const sql = 'UPDATE Immunizations SET child_name = ?, vaccine_name = ?, date_administered = ?, doctor_name = ? WHERE immunization_id = ?';
        const params = [child_name, vaccine_name, date_administered, doctor_name, parseInt(req.params.immunization_id, 10)];

        connection.query(sql, params, (err, results) => {
            if (err) {
                console.error('Error updating immunization record: ', err);
                return res.status(500).json({ message: 'Error updating immunization record', error: err.message });
            }

            console.log('Immunization record updated successfully: ', results);
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected error', error: error.message });
    }
});
// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});