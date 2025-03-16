/* eslint-disable no-unused-vars */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import LocationPicker from '../components/LocationApi/LocationPicker';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from "react";
import axios from "axios";
const REGISTER_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/register";


export default function SignUp2({ firstName, lastName, gender, email, password ,lat, lang}) {
  const [errMsg, setErrMsg] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [homeNumber, setHomeNumber] = useState('');
  const errRef = React.useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const v1 = USER_REGEX.test(firstName);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, {
        firstName,
        lastName,
        email,
        password,
        gender,
        phoneNumber,
        nationalId,
        address: {
          city,
          street,
          homeNumber,
          coordinates: {
        lat,
        lang
          }
        }
      });
      console.log(response?.data);
          } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
    
        <div className="signup-container">
        <p>Welcome, {firstName} {lastName}!</p>
        <p>Gender: {gender}</p>
        <p>Email: {email}</p>
        <form onSubmit={handleSubmit}>
            <div className="mt-3">
                <label>Phone</label>
                <input type="tel" className="form-control" required  onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </div>
            <div className="mt-3">
                <label>City</label>
                <input type="text" className="form-control" required onChange={(e)=>setCity(e.target.value)}/>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <label>Street</label>
                    <input type="text" className="form-control" required onChange={(e)=>setStreet(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label>Home Number</label>
                    <input type="text" className="form-control" required onChange={(e)=>setHomeNumber(e.target.value)}/>
                </div>
            </div>
            <div className="map-container mt-3">
                <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Location Picker</h1>
        <LocationPicker />
      </div>
    </div>
            </div>
            <div className="mt-3 form-check">
                <input type="checkbox" className="form-check-input" id="terms" required/>
                <label className="form-check-label" htmlFor="terms">
                    I have read and understand the <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">Terms of Services</a> and the <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">Privacy Policy</a>.
                </label>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-4">SIGN UP →</button>
        </form>
    </div>
{/* Terms of Services Modal */}
<div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="termsModalLabel">Terms of Services</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Supplier Responsibilities
                Suppliers must:
                • Provide items as described in the agreement.
                • Deliver items on time to the agreed location.
                • Ensure items are of good quality and free from defects.
                • Communicate any issues or delays as soon as possible.
                Quality Standards
                • All products must meet the agreed quality and description.
                • Damaged or defective items must be refunded.
                • If items do not meet quality standards, the supplier is responsible for fixing the issue.
                Delivery Terms
                • Items must be delivered by [specific date].
                • If there are delays, the supplier must inform the organizer immediately.
                • Late delivery penalties may apply (if agreed).
                Payment Terms
                • Payment will be made after the items are received and inspected.
                • If the items are defective or not as agreed, payment may be delayed or reduced.
                Return and Refunds
                • Suppliers must accept returns for defective or incorrect items.
                • Suppliers must process refunds within [10 Days].
                • Suppliers will cover costs for returns if the problem is their fault.
                Termination
                • If the supplier does not follow this policy, the agreement may be ended.
                • Repeated issues like poor quality or delays may lead to removal from future purchases.
                Adding Products for Approval
                • When a supplier adds a product, they must wait for approval from customers.
                • The approval process takes up to 7 days
                • Only approved products can be listed for purchase.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="privacyModalLabel">Privacy Policy</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>• Return Policy 
                When You Can Return an Item
                You can return an item if:
                • It is damaged or broken.
                • It is not what you ordered.
                • You request a return within [e.g., 7 days] of receiving the item.
                Note: The item must be in the same condition you received it and in its original packaging.
                Items You Cannot Return
                We cannot accept returns for:
                • Food or other items that spoil.
                • Items marked as “final sale” or “no returns.”
                Refunds
                You can get a refund if:
                • The item you return follows our return rules.
                • We inspect the item and confirm the problem.
                Refunds will be sent back to your original payment method within [e.g., 20 days].
                How to Return an Item
                1. Contact us at [email/phone] within [e.g., 7 days] of getting the item.
                2. Share proof of the problem (e.g., a photo).
                Our Role
                We will:
                • Help you with the return process.
                • Work with the supplier to fix any issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
)
}
