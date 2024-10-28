// src/SignUpPage/SignUp.jsx
import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form className="signup-form">
        <input type="text" placeholder="Username" className="signup-input" />
        <input type="email" placeholder="Email" className="signup-input" />
        <input type="password" placeholder="Password" className="signup-input" />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <br></br>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;
