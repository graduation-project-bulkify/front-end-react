/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import  { useRef, useState } from "react";
import './verificationOTP.css';
function VerificationOTP() {
     // State to store the OTP values
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Refs for each input field
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handle input change
  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if the current input is filled
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    // Submit the form if the last input is filled
    if (index === 3 && value) {
      handleSubmit();
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const otpCode = otp.join("");
    console.log("OTP Submitted:", otpCode);
    alert(`OTP Submitted: ${otpCode}`);
  };

  // Add resend handler
  const handleResend = () => {
    // Reset OTP fields
    setOtp(["", "", "", ""]);
    // TODO: Implement resend logic here
    alert("Resend code functionality will be implemented here");
  };

  return (
    <>
    <div className="container-verification">
      <div className="VerificationOTP">
        <form onSubmit={(e) => e.preventDefault()} className="otp-Form">
          <span className="mainHeading">Enter OTP</span>
          <p className="otpSubheading">We have sent a verification code to your mobile number</p>
          <div className="inputContainer">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                ref={inputRefs[index]}
                className="otp-input"
                required
              />
            ))}
          </div>
          <button className="verifyButton" onClick={handleSubmit} type="button">Verify</button>
          <button className="exitBtn" type="button">×</button>
          <p className="resendNote">
            Didn't receive the code? 
            <button className="resendBtn" onClick={handleResend} type="button">
              Resend Code
            </button>
          </p>
        </form>
      </div>
    </div>
    </>
  );
}

export default VerificationOTP;
