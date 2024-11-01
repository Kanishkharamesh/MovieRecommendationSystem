// src/SignUpPage/SignUp.jsx
import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    let valid = true;

    // Basic username validation
    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameError('');
    }

    // Basic email validation
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
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
      console.log("Signup successful!");
      // Here you would typically handle user registration logic
      navigate('/userpage', { state: { username } }); // Pass username to UserPage
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <div className="signup-form-background">
        <form className="signup-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <span className="errorLabel">{usernameError}</span>}
          <input
            type="email"
            placeholder="Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="errorLabel">{emailError}</span>}
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="errorLabel">{passwordError}</span>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
      <p>Already have an account? <Link to="/login" style={{ color: 'red' }}>Login</Link></p>
    </div>
  );
};

export default SignUp;