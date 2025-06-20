import React from 'react'
import "../signUp.css";
import { Routes, Route, Link } from "react-router-dom";
// import Login from "./Login";
import axios from "axios";
import { useRef, useState } from "react";

export default function CreateAdmin() {
    const REGISTER_URL =
        "https://bulkify-back-end.vercel.app/api/v1/admins/create";

    const userRef = useRef();
    const errRef = useRef();

    // Form state variables
    const [fullName, setUserfullName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [msg, setErrMsg] = useState("");
    const [msgType, setMsgType] = useState("");

    const [errors, setErrors] = useState({}); // New state for field-specific errors
    const [showPassword, setShowPassword] = useState(false);
    const AdminToken = localStorage.getItem("AdminToken");


    // Helper function to check if fields are empty and set error messages
    const validateForm = () => {
        const newErrors = {};
        if (!fullName.trim()) newErrors.firstName = "First name is required ";
        if (fullName.length < 4) newErrors.firstName = "Minimum Vaild Length is : 4";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!password.trim()) newErrors.password = "Password is required";
        // Check if the phone number is empty
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        }
        else if (phoneNumber.length !== 11) {
            newErrors.phoneNumber = "Phone number should be 11 characters";
        }
        else if (!/^\d+$/.test(phoneNumber)) {
            // Validate if the phone number contains only numbers
            newErrors.phoneNumber = "Phone number should contain only digits";
        }

        return newErrors;
    };

    const loc = document.getElementsByClassName("location-details")[0]; // Assuming you want the first element

    if (loc && window.getComputedStyle(loc).display === "none") {
        alert("Please Select Your Location");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const alertElement = document.getElementById("alert");
            if (alertElement) {
                alertElement.scrollIntoView({ behavior: "smooth" });
            }
            return;
        } else {
            setErrors({}); // Clear errors if no validation issues
        }

        const payload = {
            fullName,
            email,
            password,
            phoneNumber,
        };

        try {
            const response = await axios.post(REGISTER_URL, payload, {
                headers: {
                    "token": AdminToken,
                },
            });
            setErrMsg(response.data.message); // Log the server response
            console.log("Server Response:", response); // Log the server response
            setMsgType("success");

        } catch (error) {
            if (error.response) {
                setErrMsg(`Server responded with error: ${error.response.data.message}`);
                console.error("Error response:", error.response.data);
            } else {
                setErrMsg(`Request error: ${error.data.message}`);
            }
            setMsgType("error");
        }

    };
    return (
        <>
            <div className="signup-container">
                <p
                    ref={errRef}
                    className={`alert ${msgType === "success" ? "alert-success" : "alert-danger"} ${msg ? 'd-block' : 'd-none'} text-center mx-auto`}
                    aria-live="assertive"
                    id="alert"
                    style={{
                        padding: "20px",
                        borderRadius: "10px",
                        maxWidth: "90%",
                        width: "400px",
                        color: "#fff",
                        textAlign: "center",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                        backgroundColor: msgType === "success" ? "#28a745" : "#ff4d4d",
                    }}
                >
                    {msg}
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <h1>Create Admin </h1>
                        <div>
                            <label>fullName</label>
                            <input
                                type="text"
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                ref={userRef}
                                value={fullName}
                                onChange={(e) => setUserfullName(e.target.value)}
                            />

                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                    </div>
                    <div className="mt-3">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mt-3">
                        <label>Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle between text and password
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="input-group-text"
                                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? "🙈" : "👁"} {/* Icons for visibility toggle */}
                            </span>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                    </div>
                    <div className="mt-3">
                        <label>Phone</label>
                        <input
                            type="tel"
                            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                    </div>
                    <button
                        className="btn btn-success mt-4 d-flex justify-content-center w-100"
                        type="submit"
                    >
                        Create
                    </button>
                </form>


            </div>
        </>)
}
