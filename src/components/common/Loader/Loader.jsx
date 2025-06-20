import React from 'react';
import Logo from '../../images/Layer_1.svg';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-content">
                <img src={Logo} alt="Logo" className="loader-logo" />
                <h1>Your Best Choice ! </h1>
                <div className="loader-spinner"></div>
            </div>
        </div>
    );
};

export default Loader;
