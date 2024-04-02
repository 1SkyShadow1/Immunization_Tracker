const express = require('express');
const registerUser = require('./users').registerUser;
const loginUser = require('./users').loginUser;
const getImmunizations = require('./immunizations').getImmunizations;
const basicAuth = require('express-basic-auth');

const app = express();

// Login and registration routes (if using a server)

// Basic authentication middleware with realm name
app.use(basicAuth({ authorizeAsync: async (username, password) => {
  try {
    const user = await loginUser(username, password); // Use your login function
    return user !== undefined; // Successful login if user object exists
  } catch (error) {
    console.error(error.message);
    return false; // Login failed
  }
} }, { challenge: true, realm: 'Immunization Tracker' }))

// ... other application logic
//////////

app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Basic validation
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Invalid username, password, or email' });
  }

  try {
    // Check for existing username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password securely (adjust saltRounds for security)
    const saltRounds = 12; // Adjust this value as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email, // If applicable
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) { // Duplicate key error (e.g., username)
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
  }
});

//

app.get('/immunizations', async (req, res) => {
  try {
    // User ID retrieval from request object after successful basic auth
    const userId = req.auth.user; // Assuming 'user' property in req.auth after basic auth

    const immunizations = await getImmunizations(userId);
    res.json(immunizations); // Send immunization records to the client
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error retrieving immunizations' });
  }
});

// ... other application logic

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
