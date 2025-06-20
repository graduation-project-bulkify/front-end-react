import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../signUp.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const SupSignUp = () => {
  const REGISTER_URL = "https://bulkify-back-end.vercel.app/api/v1/suppliers/register";
  const userRef = useRef();
  const errRef = useRef();

  // Form state variables
  const [fullName, setUserFulltName] = useState("");
  const [password, setPassword] = useState("");
  const [commercialRegister, setCommercialRegister] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }

    const payload = {
      fullName,
      email,
      password,
      phoneNumber,
      commercialRegister,
      supplierAddress :{
        city,
        street,
        homeNumber,
      }
    };
    console.log(payload); // Log the payload to verify the data
  
    try {
      const response = await axios.post(REGISTER_URL, payload);
      console.log(response?.data);
      setSuccess(true);
      // Clear state
      setUserFulltName("");
      setPassword("");
      setCity("");
      setStreet("");
      setHomeNumber("");
      setPhoneNumber("");
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
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
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
                    <div className="col-md-6">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUserFulltName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Commercial Register</label>
                      <input
                        type="text"
                        className="form-control"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setCommercialRegister(e.target.value)}
                        required
                      />
                    </div>
                  </div>
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
                    <label>Password</label>
                              <div className="d-flex input-group" >
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              className="input form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            <span
              className="input-group-text"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "🙈" : "👀"} {/* Icons for visibility toggle */}
            </span>
          </div>
                  </div>
                  <div className="mt-3">
                    <label>Confirm Password</label>
                    <div className="d-flex input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="input form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your Password"
                        required
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showConfirmPassword ? "🙈" : "👀"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Street</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Home Number</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setHomeNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Location Picker */}
                  <div className="map-container mt-3">
                  </div>

                  <button type="submit" className="btn btn-success w-100 mt-4">
                    SIGN UP →
                  </button>
                </form>
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default SupSignUp;
