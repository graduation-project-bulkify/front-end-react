/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './loginsignup.css'
import logo from '../assets/Layer_1.png';
function loginsignup() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className='title' >Login</h2>
        <img src={logo} alt="Logo" />
        <form className="login-form">
          <div className="input-group">
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="signup-prompt">
          Don't have an account? <a  href="/signup" className="signUp">Sign Up</a>
        </div>
          <div className="form-footer">
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

        <div className="separator">or</div>

        <div className="social-login">
          <button className="social-btn google-btn">

          Google
          </button>
          <button className="social-btn facebook-btn">
              Facebook
          </button>
          <button className="social-btn apple-btn">
          Apple
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default loginsignup;