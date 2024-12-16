import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/loginSignUp/loginsignup';  // Import the LoginPage
import SignUpPage from './components/loginSignUp/SignUpPage';  // Import the SignUpPage

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define a route for the login page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Other routes */}
        <Route path="/signup" element={<SignUpPage />} />
        {/* Default route that redirects to the login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
