// src/LoginPage/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState(''); // Change state variable to username
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(''); // Change error variable to usernameError
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    // Basic username validation
    if (!username) {
      setUsernameError('Username is required'); // Update validation message
      valid = false;
    } else {
      setUsernameError('');
    }

    // Basic password validation
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    // Proceed if inputs are valid
    if (valid) {
      console.log("Login successful!");
      // Navigate to the UserPage with username as state
      navigate('/userpage', { state: { username } }); // Use username instead of email
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <div className="login-form-background">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text" // Change input type to text for username
            placeholder="Username" // Update placeholder text
            className="login-input"
            value={username} // Update value to username
            onChange={(e) => setUsername(e.target.value)} // Update change handler to username
          />
          {usernameError && <span className="errorLabel">{usernameError}</span>} {/* Update error display */}
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="errorLabel">{passwordError}</span>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <p>Don't have an account? <Link to="/signup" style={{ color: 'red' }}>Sign Up</Link></p>
    </div>
  );
};

export default Login;
