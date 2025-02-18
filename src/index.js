import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './header.js';
import Footer from './footer.js';
import LoginRegister from './components/loginRegister/loginRegister.js';
import VerificationOTP from './components/loginRegister/verificationOTP.js';

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <LoginRegister />
      <VerificationOTP />
      <Footer />
      {/* <App /> */}
    </Router>
  </React.StrictMode>
);
