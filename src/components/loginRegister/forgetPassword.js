/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './forgetPassword.css';
function ForgetPassword() {
return (
    <>
    <div className='forget-password'>
           <div class="form-container">
      <div class="logo-container">
        Forgot Password
      </div>
    <p className='text-header'>Enter the email address or mobile phone number associated with your bulkify account.</p>
      <form class="form1">
        <div class="form-group">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Enter your email" required="">
        </input>
    </div>

        <button class="form-submit-btn" type="submit">Send Code</button>
      </form>
    <div className='siginingLinks'>
      <p class="signup-link">
        Don't have account?
        <a href="#" class="signup-link link"> Sign up now</a>
      </p>
      <p class="signup-link">
        Already have account?
        <a href="#" class="signup-link link"> Sign in now</a>
      </p>
    </div>

      <hr></hr>
      <p className='custService'>
      You may contact Customer Service for help restoring access to your account.
      </p>
    </div>
    </div>
 
    </>)
    };

  export  default  ForgetPassword;