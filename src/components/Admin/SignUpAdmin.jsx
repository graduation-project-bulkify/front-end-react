import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../signUp.css";
import { Routes, Route, Link } from "react-router-dom";
// import Login from "./Login";
import axios from "axios";
import { Button } from "@mui/material";

const SignUpAdmin = () => {
  const REGISTER_URL =
    "https://bulkify-back-end.vercel.app/api/v1/admins/create";

  const userRef = useRef();
  const errRef = useRef();

  // Form state variables
  const [fullName, setUserfullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [errors, setErrors] = useState({}); // New state for field-specific errors
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  // Helper function to check if fields are empty and set error messages
  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.firstName = "First name is required ";
    if (fullName.length < 4) newErrors.firstName = "Minimum Vaild Length is : 4";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    // Check if the phone number is empty
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    else if (phoneNumber.length !== 11) {
      newErrors.phoneNumber = "Phone number should be 11 characters";
    }
    else if (!/^\d+$/.test(phoneNumber)) {
      // Validate if the phone number contains only numbers
      newErrors.phoneNumber = "Phone number should contain only digits";
    }

    return newErrors;
  };

  const loc = document.getElementsByClassName("location-details")[0]; // Assuming you want the first element

  if (loc && window.getComputedStyle(loc).display === "none") {
    alert("Please Select Your Location");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const alertElement = document.getElementById("alert");
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    } else {
      setErrors({}); // Clear errors if no validation issues
    }

    const payload = {
      fullName,
      email,
      password,
      phoneNumber,
    };

    try {
      const response = await axios.post(REGISTER_URL, payload);
      setSuccess(true);
      console.log("Server Response:", response.data); // Log the server response
    } catch (err) {
      if (err.response) {
        const alert = document.getElementById("alert");
        if (alert && err.response.data && err.response.data.err) {
          for (let index = 0; index < err.response.data.err.length; index++) {
            setErrMsg(err.response.data.err[index]);
          }
        }
        if (errRef.current) {
          errRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
      errRef.current.focus(); // Focus the error message
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Register is Successful Welcome Admin !</h1>
          <p>
            <Link path="/LoginAdmin">Sign In Now To Manage the Site</Link>
          </p>
        </section>
      ) : (
        <div className="signup-container">
          <p
            ref={errRef}
            className={`alert alert-danger ${errMsg ? 'd-block' : 'd-none'} text-center mx-auto`}
            aria-live="assertive"
            id="alert"
            style={{
              backgroundColor: "#ff4d4d", // Error background color (red)
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "90%", // Max width for responsiveness
              width: "400px",  // Default width on larger screens
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Add shadow for pop-up effect
            }}
          >
            
            {errMsg}
          </p>

          <Routes>
            <Route
              path="/"
              element={
                <form onSubmit={handleSubmit}>
                  <div className="row mt-3">
                    <h1>Register As Admin </h1>
                    <div className="col-md-6">
                      <label>fullName</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        ref={userRef}
                        value={fullName}
                        onChange={(e) => setUserfullName(e.target.value)}
                      />

                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mt-3">
                    <label>Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? "🙈" : "👁"} {/* Icons for visibility toggle */}
                      </span>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>Phone</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                  </div>                
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 4, width: "100%" }}
                    type="submit"
                  >
                    Register
                  </Button>
                </form>
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default SignUpAdmin;
