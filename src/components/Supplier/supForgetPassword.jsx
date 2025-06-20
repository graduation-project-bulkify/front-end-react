import React, { useState , useRef } from "react";
import "../ForgetPass/ForgetPassword.css";  
import SupLogin from "./SupLogin";
import SupSignUp from "./SupSignUp";
import axios from "axios";
import ResetPass from "./SupResetPass";

const ForgetPass_URL = "https://bulkify-back-end.vercel.app/api/v1/suppliers/forgot-password";
function SupForgetPassword() {
  const [supLogin, setSupLogin] = useState(false);
  const [supSignUp, setSupSignUp] = useState(false);
  const [showResetPass,setshowResetPass] =useState(false);
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const errRef = useRef(null);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(""); // Clear error message
    setSuccessMsg(""); // Clear success message

    try {
      await axios.post(ForgetPass_URL, {
        email,
      });
      setSuccessMsg("Check your email for password reset instructions.");
      setEmail(""); // Clear email field after success
      setshowResetPass(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 404) {
        setErrMsg("Email not found.");
      } else {
        setErrMsg("Failed to send reset link.");
      }
      errRef.current.focus();
    }
  };
  if (supLogin) {
    return <SupLogin />;
  }
  if (supSignUp) {
    return <SupSignUp />;
  }
  if(showResetPass === true){
    return <ResetPass />
  }
  
  return (
    <>
        <p className="error-message" ref={errRef}></p>
      <div className="forget-password">
        <div className="form-container">
        <h1>
          Forget Password As Supplier
        </h1>
          <div className="logo-container">Forget Password ?</div>
          <p className="text-header">
            Enter the email address or mobile phone number associated with your
            bulkify account.
          </p>
          <form className="form1" action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                required=""
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={errRef}
              ></input>
            </div>
            <div className="flex-row">
            <button type="submit" >
              Send Code
            </button>
            </div>
          </form>
          {errMsg && (
        <p ref={errRef} className="error-message" aria-live="assertive">
          {errMsg}
        </p>
      )}

      {/* Display success message */}
      {successMsg && (
        <p className="success-message">
          {successMsg}
        </p>
      )}
          <div className="siginingLinks">
            <p className="signup-link">
              Don't have account?
              <a href="#" className="signup-link link" onClick={() => setSupSignUp(true)}
              style={{ cursor: "pointer" }}>
                {" "}
                Sign up now
              </a>
            </p>
            <p className="signup-link">
              Already have account?
              <a href="#" className="signup-link link"   onClick={() => setSupLogin(true)}
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

export default SupForgetPassword;
