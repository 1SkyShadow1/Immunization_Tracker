const express = require('express');
const registerUser = require('./users').registerUser;
const loginUser = require('./users').loginUser;
const getImmunizations = require('./immunizations').getImmunizations;
const basicAuth = require('express-basic-auth');

const app = express();

// Login and registration routes (if using a server)
// ...

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
