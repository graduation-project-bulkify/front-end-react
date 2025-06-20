/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import "../signUp.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const OTP_URL ="https://bulkify-back-end.vercel.app/api/v1/customers/reset-password";
const SuppOTP_URL ="https://bulkify-back-end.vercel.app/api/v1/suppliers/reset-password";

export default function ResetPass() {
  const navigate = useNavigate();
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
  
    console.log(payload);
  
    // Try Customer OTP reset
    try {
      const response = await axios.post(OTP_URL, payload);
      console.log(response?.data);
      alert("Password Reset Successfully");
      setSuccess(true);
      navigate("/login");
      return;
    } catch (err) {
      if (!err?.response || err.response?.status !== 404) {
        console.error("Error response: ", err.response?.data);
        setErrMsg(err.response?.data?.message || "Password reset failed.");
        if (errRef.current) errRef.current.focus();
        return;
      }
    }
  
    // Try Supplier OTP reset
    try {
      const response = await axios.post(SuppOTP_URL, payload);
      console.log(response?.data);
      alert("Password Reset Successfully");
      setSuccess(true);
      navigate("/login");
    } catch (err) {
      console.error("Error response: ", err.response?.data);
      setErrMsg(err.response?.data?.message || "Password reset failed.");
      if (errRef.current) errRef.current.focus();
    }
  };
  
  if (success) {
    return <SupLogin />;
  }
  return(
    <div className="signup-container">
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
