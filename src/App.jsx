import React from "react";
import Login from "../src/components/Login";
import Signup from "../src/components/SignUp";
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState('Login');

  // Function to handle click and set the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
    <Router>
     <div className="login-register">
     <div className="tab-switch">
          {/* Link for Login */}
          <Link
            to="/Login"
            className={`link ${activeTab === 'Login' ? 'active' : ''}`}
            onClick={() => handleTabClick('Login')}
          >
            Login
          </Link>

          {/* Link for Sign Up */}
          <Link
            to="/Signup"
            className={`link ${activeTab === 'Signup' ? 'active' : ''}`}
            onClick={() => handleTabClick('Signup')}
          >
            Sign Up
          </Link>
        </div>
      </div>

                    <Routes>
                      <Route path="/Signup/*" element={<Signup />} />
                      <Route path="/Login" element={<Login />} />
                    </Routes>
                    </Router>
    </>
  )
}

export default App
