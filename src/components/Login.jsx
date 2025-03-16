import React, { useRef, useEffect, useState, useContext } from "react";
import "./Login.css";
import "./Login";
import SupLogin from "../components/Supplier/supLogin.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import axios from "axios";

const Login_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [supLogin, setSupLogin] = useState(false);
  
  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg(""); // Reset error message when email or password is modified
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        Login_URL,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response?.data?.token;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, token });

      setUser(""); // Clear the email field
      setPwd("");  // Clear the password field
      setSuccess(true); // Indicate success
      navigate("/"); // Redirect to homepage or desired route

    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setErrMsg("Invalid credentials");
        } else if (err.response.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg(err.response.data?.message || "An error occurred");
        }
      } else if (err.request) {
        setErrMsg("Network Error");
      } else {
        setErrMsg("An error occurred");
      }
      errRef.current.focus(); // Focus the error message
    }
  };

  if(supLogin) {
    return <SupLogin />;
  }
  return (
    <>
      {success ? (
        <section>
          <h1>Congratulations {email}, You're logged in!</h1>
          <br />
          <p>
            <Link to="/">Go to Home</Link>
          </p>
        </section>
      ) : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offScreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="login-register">
            <form className="form" onSubmit={handleSubmit}>
              <div className="flex-column">
                <label>Email </label>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  className="input form-control"
                  placeholder="Enter your Email"
                  ref={userRef}
                  value={email}
                  onChange={(e) => setUser(e.target.value)}
                />
                <br />
              </div>
              <div className="flex-column">
                <label>Password </label>
              </div>
              <div className="inputForm">
                <input
                  type="password"
                  className="input form-control"
                  value={password}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="Enter your Password"
                />
              </div>
              <div className="flex-row">
                <div>
                  <input type="checkbox" />
                  <label>Remember me </label>
                </div>
                <span
                  className="span"
                  style={{ cursor: "pointer" }}
                >
                  <Link to="/ForgetPassword">Forget Password</Link>
                </span>
              </div>

              <button className="btn btn-success w-100 mt-4" type="submit">
                Sign In
              </button>
            </form>

            <div className="or-text">OR</div>

            <span className="btn btn-success w-100 mt-4"
              onClick={() => setSupLogin(true)}
              style={{ cursor: "pointer" }}
            >
              Sign in As Supplier
            </span>

            <br />
            <br />

            <p>
              Don't have an account?{" "}
              <Link to="/Signup">Sign up now</Link>
            </p>
          </div>
        </>
      )}
    </>
  );
}
