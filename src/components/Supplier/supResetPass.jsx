/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import "../signUp.css"
import SupLogin from './SupLogin';
import axios from 'axios';
const OTP_URL ="https://bulkify-back-end.vercel.app/api/v1/suppliers/reset-password";
export default function ResetPass() {
  const [showLogin,setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      newPassword,
      otp
    };
    console.log(payload); // Log the payload to verify the data
  
    try {
      const response = await axios.post(OTP_URL, payload);
      console.log(response?.data);
      alert("Password Reset Succesfuly")
      setSuccess(true);
      setShowLogin(true);
    } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else {
          alert("Error response: ", err.response.data);  // Log the detailed error
          setErrMsg(`Registration Failed: ${err.response?.data?.message || "Unknown error"}`);
        }
      
        // Ensure the error message field is focused if it exists
        if (errRef.current) {
          errRef.current.focus();
        }
      }
      
  };
  if (success) {
    return <SupLogin />;
  }
  return(
    <div className="signup-container">
      <p>
        Reset Password AS Supplier
      </p>
        {errMsg && <p  ref={errRef} className="error-message">{errMsg}</p>}
        <form action="" onSubmit={handleSubmit}>

        <div className="mt-3">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      autoComplete="on"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <label>New Password</label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(e) => setOTP(e.target.value)}
                    />
                  </div>
                  <button type='submit'>submit</button>
        </form>
        </div>  
    
  )
}
