import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/login', {
      username,
      password,
    });

    if (response.data.success) {
      // Login was successful, store user_id in session storage and redirect to home page
      window.sessionStorage.setItem('user_id', response.data.user.id);
      navigate('/home'); // Use navigate instead of history.push
    } else {
      // Login was not successful, display an error message
      setErrorMessage(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error(error);
    setErrorMessage(error.response?.data?.message || 'Login failed');
  }

  setUsername('');
  setPassword('');
};
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
  }

export default Login;