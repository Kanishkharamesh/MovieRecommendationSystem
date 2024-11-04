// src/LoginPage/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        const { token, username } = response.data; // Ensure your backend sends back the username
        localStorage.setItem('authToken', token); // Store token in localStorage
        localStorage.setItem('username', username); // Store username in localStorage
        navigate('/userpage'); // Redirect to the user page
      } catch (error) {
        setLoginError(error.response?.data?.message || 'Error logging in');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <div className="login-form-background">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="errorLabel">{emailError}</span>}
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