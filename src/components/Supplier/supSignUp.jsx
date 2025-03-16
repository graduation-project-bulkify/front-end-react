import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SignUp.css";
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
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(err);
      if (!err?.response) {
        setErrMsg(alert("No Server Response" ));
      } else if (err.response?.status === 409) {
        setErrMsg(alert("Username Taken"));
      } else {
        setErrMsg(alert("Registration Failed"));
      }
      errRef.current.focus();
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
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
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
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
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
