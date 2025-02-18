import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ForgetPassword from './components/loginRegister/forgetPassword';
import LoginRegister from './components/loginRegister/loginRegister';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ForgetPassword />} />
      <Route path="/signup" element={<LoginRegister />} />
    </Routes>
  );
}

export default App;
