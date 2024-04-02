const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // for token generation

const router = express.Router();
const db = require('./db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate user input (implement validation logic)

  // Find user by username
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare hashed passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token on successful login
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3600s' }); // Token expires in 1 hour

    res.json({ token, user: { username: user.username } }); // Send back token and limited user info
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // // Validate user input (optional)

  // try {
  //   const hashedPassword = await bcrypt.hash(password, 10); // Hash password

  //   const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

  //   // Optionally generate token for new user

  //   res.json({ message: 'Registration successful' });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Error registering user' });
  // }
});
module.exports = router;
