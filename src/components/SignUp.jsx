import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import LocationPicker from "./LocationApi/LocationPicker";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

const SignUp = () => {
  const REGISTER_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/register";

  const userRef = useRef();
  const errRef = useRef();

  // Form state variables
  const [firstName, setUserFirstName] = useState("");
  const [lastName, setUserLastName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [value1, setValue1] = useState(null); // For latitude
  const [value2, setValue2] = useState(null); // For longitude
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      city,
      street,
      homeNumber,
      coordinates: [value2, value1],
    };
    console.log(payload); // Log the payload to verify the data
  
    try {
      const response = await axios.post(REGISTER_URL, payload);
      console.log(response?.data);
      setSuccess(true);
      // Clear state
      setUserFirstName("");
      setUserLastName("");
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
            <Route path="/Login" element={<Login />} />
            <Route
              path="/"
              element={
                <form onSubmit={handleSubmit}>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUserFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUserLastName(e.target.value)}
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
                    <label>Gender</label>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={(e) => setGender(e.target.value)}
                      />{" "}
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={(e) => setGender(e.target.value)}
                      />{" "}
                      Female
                    </div>
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
                    <LocationPicker setValue1={setValue1} setValue2={setValue2} />
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

export default SignUp;
