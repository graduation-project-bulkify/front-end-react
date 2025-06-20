import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./signUp.css";
import axios from "axios";
import LocationPicker from "./LocationApi/LocationPicker";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Alert from "./Alert.jsx";
import CustomDateInput from '../components/DatePicker'; // adjust path if needed


const SignUp = () => {
  const REGISTER_URL =
    "https://bulkify-back-end.vercel.app/api/v1/customers/register";

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
  const [birthDate, setBirthDate] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errors, setErrors] = useState({}); // New state for field-specific errors
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [value1, setValue1] = useState(null); // For latitude
  const [value2, setValue2] = useState(null); // For longitude


  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Toggle the Terms of Service Modal
  const toggleTermsModal = () => setShowTermsModal(!showTermsModal);

  // Toggle the Privacy Policy Modal
  const togglePrivacyModal = () => setShowPrivacyModal(!showPrivacyModal);

  // Helper function to check if fields are empty and set error messages
  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required ";
    if (firstName.length < 4) newErrors.firstName = "Minimum Vaild Length is : 4";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
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
    if (!city.trim()) newErrors.city = "City is required";
    if (!street.trim()) newErrors.street = "Street is required";
    if (!homeNumber.trim()) newErrors.homeNumber = "Home number is required";
    if (!gender) newErrors.gender = "Gender is required";
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
      // Safely handle alert element scrolling
      const alertElement = document.getElementById("alert");
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    
    setErrors({});
    setErrMsg(""); // Clear any previous error messages

    const payload = {
      firstName,
      lastName,
      email,
      password,
      gender,
      birthDate,
      phoneNumber,
      city,
      street,
      homeNumber,
      coordinates: [value2, value1],
    };

    try {
      const response = await axios.post(REGISTER_URL, payload);
      setSuccess(true);
      // Clear state
      setUserFirstName("");
      setUserLastName("");
      setPassword("");
      setCity("");
      setStreet("");
      setHomeNumber("");
      setPhoneNumber("");
      console.log("Server Response:", response.data);

      const customerData = payload;
      localStorage.setItem("CustomerData", JSON.stringify(customerData));
    } catch (err) {
      if (err.response?.status === 409) {
        setErrMsg("Email already exists. Please use a different email or try logging in.");
      } else if (err.response?.data?.err) {
        setErrMsg(Array.isArray(err.response.data.err) 
          ? err.response.data.err.join('\n') 
          : err.response.data.err);
      } else {
        setErrMsg("Registration failed. Please try again.");
      }
      
      // Safely handle ref scrolling
      if (errRef?.current) {
        errRef.current.scrollIntoView({ behavior: "smooth" });
      }
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
          <Alert ref={errRef} errMsg={errMsg} setErrMsg={setErrMsg} />
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
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        ref={userRef}
                        value={firstName}
                        onChange={(e) => setUserFirstName(e.target.value)}
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        ref={userRef}
                        value={lastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
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
                    <label>Birth Date</label>
                    <CustomDateInput
                      value={birthDate}
                      onChange={(val) => setBirthDate(val)}
                      error={errors.birthDate}
                    />
                    {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
                  </div>
                  <div className="mt-3 custom-radio">
                    <label>Gender</label>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={(e) => setGender(e.target.value)}
                        />{" "} Male
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={(e) => setGender(e.target.value)}
                        />{" "} Female
                      </div>
                    </div>
                    {errors.gender && <div className="text-danger">{errors.gender}</div>}
                  </div>
                  <div className="mt-3">
                    <label>Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? "🙈" : "👁"}
                      </span>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showConfirmPassword ? "🙈" : "👁"}
                      </span>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                      )}
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
                  <div className="mt-3">
                    <label>City</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Street</label>
                      <input
                        type="text"
                        className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                      {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                    </div>
                    <div className="col-md-6">
                      <label>Home Number</label>
                      <input
                        type="text"
                        className={`form-control ${errors.homeNumber ? 'is-invalid' : ''}`}
                        value={homeNumber}
                        onChange={(e) => setHomeNumber(e.target.value)}
                      />
                      {errors.homeNumber && <div className="invalid-feedback">{errors.homeNumber}</div>}
                    </div>
                  </div>

                  <div className="map-container mt-3">
                    <LocationPicker
                      setValue1={setValue1}
                      setValue2={setValue2}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    {/* Button to trigger Terms of Service Modal */}
                    <button type="button" className="btn btn-link" onClick={toggleTermsModal}>
                      View Terms of Service
                    </button>

                    {/* Button to trigger Privacy Policy Modal */}
                    <button type="button" className="btn btn-link" onClick={togglePrivacyModal}>
                      View Privacy Policy
                    </button>
                  </div>

                  {/* Terms of Service Modal */}
                  {showTermsModal && (
                    <div className="modal fade show" style={{ display: "block" }} aria-labelledby="termsModalLabel">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="termsModalLabel">Terms of Services</h5>
                            <button type="button" className="btn-close" onClick={toggleTermsModal} aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <p>
                              <strong>Supplier Responsibilities</strong>
                              <ul>
                                <li>Provide items as described in the agreement.</li>
                                <li>Deliver items on time to the agreed location.</li>
                                <li>Ensure items are of good quality and free from defects.</li>
                                <li>Communicate any issues or delays as soon as possible.</li>
                              </ul>
                              <strong>Quality Standards</strong>
                              <ul>
                                <li>All products must meet the agreed quality and description.</li>
                                <li>Damaged or defective items must be refunded.</li>
                                <li>If items do not meet quality standards, the supplier is responsible for fixing the issue.</li>
                              </ul>
                              <strong>Delivery Terms</strong>
                              <ul>
                                <li>Items must be delivered by [specific date].</li>
                                <li>If there are delays, the supplier must inform the organizer immediately.</li>
                                <li>Late delivery penalties may apply (if agreed).</li>
                              </ul>
                              <strong>Payment Terms</strong>
                              <ul>
                                <li>Payment will be made after the items are received and inspected.</li>
                                <li>If the items are defective or not as agreed, payment may be delayed or reduced.</li>
                              </ul>
                              <strong>Return and Refunds</strong>
                              <ul>
                                <li>Suppliers must accept returns for defective or incorrect items.</li>
                                <li>Suppliers must process refunds within [10 Days].</li>
                                <li>Suppliers will cover costs for returns if the problem is their fault.</li>
                              </ul>
                              <strong>Termination</strong>
                              <ul>
                                <li>If the supplier does not follow this policy, the agreement may be ended.</li>
                                <li>Repeated issues like poor quality or delays may lead to removal from future purchases.</li>
                              </ul>
                              <strong>Adding Products for Approval</strong>
                              <ul>
                                <li>When a supplier adds a product, they must wait for approval from customers.</li>
                                <li>The approval process takes up to 7 days.</li>
                                <li>Only approved products can be listed for purchase.</li>
                              </ul>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Policy Modal */}
                  {showPrivacyModal && (
                    <div className="modal fade show" style={{ display: "block" }} aria-labelledby="privacyModalLabel">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="privacyModalLabel">Privacy Policy</h5>
                            <button type="button" className="btn-close" onClick={togglePrivacyModal} aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <p>
                              <strong>Return Policy</strong>
                              <ul>
                                <li>You can return an item if it is damaged, broken, or not what you ordered.</li>
                                <li>The item must be returned within [e.g., 7 days] of receiving it.</li>
                              </ul>
                              <strong>Items You Cannot Return</strong>
                              <ul>
                                <li>Food or other items that spoil.</li>
                                <li>Items marked as “final sale” or “no returns.”</li>
                              </ul>
                              <strong>Refunds</strong>
                              <ul>
                                <li>Refunds will be processed after we inspect the returned item.</li>
                                <li>Refunds will be sent back to your original payment method within [e.g., 20 days].</li>
                              </ul>
                              <strong>How to Return an Item</strong>
                              <ol>
                                <li>Contact us at [email/phone] within [e.g., 7 days] of getting the item.</li>
                                <li>Provide proof of the issue (e.g., a photo).</li>
                              </ol>
                              <strong>Our Role</strong>
                              <ul>
                                <li>We will help you with the return process.</li>
                                <li>We will work with the supplier to resolve the issue.</li>
                              </ul>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    className="btn btn-success mt-4 d-flex justify-content-center w-100"
                    type="submit"
                  >
                    Register
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
