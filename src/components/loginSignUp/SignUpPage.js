import React, { useState } from 'react';
import './SignUpPage.css';  // Create a separate CSS file for styles
import logo from '../assets/Layer_2.png';

function SignUpPage() {
  // Optional: You can handle form state with React's useState hook
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submit logic here
    console.log('Form Submitted', formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="title">Sign Up</h2>
        <img src={logo} alt="Logo" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <div className="separator">or</div>

        <div className="social-signup">
          <button className="social-btn google-btn">
           Sign up with Google
          </button>
          <button className="social-btn facebook-btn">
           Sign up with Facebook
          </button>
          <button className="social-btn apple-btn">
            Sign up with Apple
          </button>
        </div>

        <div className="login-prompt">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
