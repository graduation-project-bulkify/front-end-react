import React, { useState , useRef } from "react";
import "./ForgetPassword.css";
import Login from "../Login";
import SignUp from "../SignUp";
import axios from "axios";
import ResetPass from "../OTP/ResetPass";
import Alert from "../Alert";
const ForgetPass_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/forgot-password";
const SuppForgetPass_URL = "https://bulkify-back-end.vercel.app/api/v1/suppliers/forgot-password";
const ForgetPassword = () => {
    const [showLogin, setLogin] = useState(false);
    const [showSignUp, setshowSignUp] = useState(false);
    const [showResetPass,setshowResetPass] =useState(false);
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const errRef = useRef(null);
    // Handle form submission
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrMsg("");
      setSuccessMsg("");
    
      // Try customer reset
      try {
        await axios.post(ForgetPass_URL, { email });
        setSuccessMsg("Check your email for password reset instructions.");
        setEmail("");
        setshowResetPass(true);
        return;
      } catch (err) {
        if (!err?.response || err.response?.status !== 404) {
          setErrMsg(err.response?.data?.message || "Failed to send reset link.");
          return;
        }
      }
    
      // Try supplier reset if customer failed with 404
      try {
        await axios.post(SuppForgetPass_URL, { email });
        setSuccessMsg("Check your email for password reset instructions.");
        setEmail("");
        setshowResetPass(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 404) {
          setErrMsg("Email not found.");
        } else {
          setErrMsg("Failed to send reset link.");
        }
      }
    };
    
    if (showLogin) {
      return <Login />;
    }
    if (showSignUp) {
      return <SignUp />;
    }
    if(showResetPass === true){
      return <ResetPass />
    }  
    
    
    return (
      <>
        <div className="forget-password">
          <div className="form-container">
            <div className="logo-container">Forget Password ?</div>
            <p className="text-header">
              Enter the email address or mobile phone number associated with your
              bulkify account.
            </p>
            <Alert ref={errRef} errMsg={errMsg} setErrMsg={setErrMsg} />
  
            <form className="form1" action="" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                  type="email"
                  className="input form-control"
                  placeholder="Enter your Email"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  ref={errRef}
                />
                <br />
              </div>
              <div className="flex-row">
              <button className="btn btn-success w-100 mt-4" type="submit">Send Code</button>
              </div>
            </form>
        {/* Display success message */}
        {successMsg && (
          <p className="success-message">
            {successMsg}
          </p>
        )}
            <div className="siginingLinks">
              <p className="signup-link">
                Don't have account?
                <a href="#" className="signup-link link" onClick={() => setshowSignUp(true)}
                style={{ cursor: "pointer" }}>
                  {" "}
                  Sign up now
                </a>
              </p>
              <p className="signup-link">
                Already have account?
                <a href="#" className="signup-link link"   onClick={() => setLogin(true)}
                style={{ cursor: "pointer" }}>
                  {" "}
                  Sign in now
                </a>
              </p>
            </div>
  
            <hr></hr>
            <p className="custService">
              You may contact Customer Service for help restoring access to your
              account.
            </p>
          </div>
        </div>
      </>
    );
}

export default ForgetPassword
