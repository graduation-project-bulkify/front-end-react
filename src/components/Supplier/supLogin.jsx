import React, { useRef, useState, useEffect, useContext } from "react";
import "../Login.css";
import SupForgetPassword from "./supForgetPassword.jsx";
import SupSignUp from "./supSignUp.jsx";
import AuthContext from "../context/AuthProvider.jsx";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login_URL = "https://bulkify-back-end.vercel.app/api/v1/suppliers/login";

export default function SupLogin() {
  const [showForgetPass, setForgetPass] = useState(false);
  const [showSignUp, setSignUp] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        Login_URL,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      console.log(JSON.stringify(response?.data));
      const token = response?.data?.token;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, token });
      console.log(token);
      console.log(email, password);
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (err.response) {
        // The request was made, and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 400) {
          setErrMsg(alert("Invalid credentials"));
        } else if (err.response.status === 401) {
          setErrMsg(alert("Unauthorized"));
        } else {
          setErrMsg(err.response.data?.message || "An error occurred");
        }
      } else if (err.request) {
        // The request was made, but no response was received (network error)
        setErrMsg(alert("Network Error"));
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrMsg(alert("An error occurred"));
      }
      
      errRef.current.focus();
    }
  };
  
  if (showForgetPass) {
    return <SupForgetPassword />;
  }
  if (showSignUp) {
    return <SupSignUp />;
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Congratulations {email}, you're logged in!</h1>
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <>
          <p ref={errRef} className={errMsg ? "errMsg" : "offScreen"}>{errMsg}</p>
          <div className="login-register">
            <h1>Sign In as Supplier</h1>
            <form className="form" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                ref={userRef}
                value={email}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <div className="flex-row">
                <input type="checkbox" />
                <label>Remember me</label>
                <span onClick={() => setForgetPass(true)} style={{ cursor: "pointer" }}>Forget Password</span>
              </div>
              <button className="btn btn-success w-100 mt-4" type="submit">Sign In</button>
            </form>
            <p>Don't have an account? <span onClick={() => setSignUp(true)} style={{ cursor: "pointer" }}>Sign up now</span></p>
          </div>
        </>
      )}
    </>
  );
}
