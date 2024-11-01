// src/LoginPage/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

// Simulated existing users (replace with real data from a database)
const registeredUsers = ['user1', 'user2']; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    // Basic username validation
    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    } else if (!registeredUsers.includes(username)) {
      setLoginError('Username does not exist. Please sign up first.');
      valid = false;
    } else {
      setUsernameError('');
      setLoginError(''); // Clear login error if username exists
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
      // Clear all error messages on successful login
      setUsernameError('');
      setPasswordError('');
      setLoginError('');
      // Navigate to the UserPage with username as state
      navigate('/userpage', { state: { username } });
    }
  };

  // Optional: Reset errors when navigating back to the login page (if you have this logic)
  React.useEffect(() => {
    // Reset errors on component mount (e.g., when navigating to the login page)
    setUsernameError('');
    setPasswordError('');
    setLoginError('');
  }, []);

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <div className="login-form-background">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <span className="errorLabel">{usernameError}</span>}
          {loginError && <span className="errorLabel">{loginError}</span>}
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