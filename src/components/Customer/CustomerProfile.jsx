import React, { useEffect, useState, useRef } from 'react';
import './CustomerProfile.css';
import axios from 'axios';
import OrderHistory from './OrderHistory';
import CustomDateInput from '../DatePicker';
import LocationPicker from "../LocationApi/LocationPicker";
import { format } from 'date-fns';


export default function CustomerProfile() {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [value1, setValue1] = useState(null); // For latitude
  const [value2, setValue2] = useState(null); // For longitude
  const errRef = useRef(null);
  const [activeView, setActiveView] = useState("profile"); // 'profile' or 'orderHistory'

  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg('');
    }, 6000);

    return () => clearTimeout(timer);
  }, [msg, setMsg]);

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    birthDate: '',
    city: '',
    street: '',
    homeNumber: '',
    coordinates: [value2, value1],

  });

  const handleSave = () => {
    const CustomerToken = localStorage.getItem('CustomerToken');
    if (!CustomerToken) return;

    axios.put('https://bulkify-back-end.vercel.app/api/v1/customers/profile', customer, {
      headers: {
        'Content-Type': 'application/json',
        'token': `${CustomerToken}`
      }
    })
      .then(res => {
        setMsg(res.data.message);
        setMsgType("success");
      })
      .catch(err => {
        setMsg(err.response.data.err);
        setMsgType("error");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  // Edit customer data
  useEffect(() => {
    const CustomerToken = localStorage.getItem('CustomerToken');
    if (!CustomerToken) return;

    axios.get('https://bulkify-back-end.vercel.app/api/v1/customers/profile', {
      headers: { "token": `${CustomerToken}` }
    })
      .then(res => {
        const data = res.data.customer;
        const formattedDate = format(new Date(data.birthDate), 'MM-dd-yyyy');
        setCustomer({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          gender: data.gender || '',
          city: data.city || '',
          street: data.street || '',
          homeNumber: data.homeNumber || '',
          birthDate: formattedDate || '', // Assuming the API returns a date string
          coordinates: data.coordinates || [],
        });
        console.log(data.birthDate);
      })
      .catch(err => console.error('Error fetching customer profile:', err));
  }, []);
  // logic for log in 
  const CustomerToken = localStorage.getItem("CustomerToken");
  if (!CustomerToken) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        fontSize: '20px',
        color: '#ff4d4d',
        fontWeight: 'bold'
      }}>
        You have to login first
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="sidebar">
        <button className="nav-link" onClick={() => setActiveView("profile")}>
          <i className="fas fa-layer-group"></i>
          Dashboard
        </button>
        <button className="nav-link" onClick={() => setActiveView("orderHistory")}>
          Order History
        </button>
      </div>

      <div className="content">
        {activeView === "profile" && (
          <div className="form-section">
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
            <h6 className="mb-4">ACCOUNT SETTING</h6>
            {/* Form fields go here */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label>First Name</label>
                <input type="text" name="firstName" className="form-control" value={customer.firstName} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Last Name</label>
                <input type="text" name="lastName" className="form-control" value={customer.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={customer.email} onChange={handleChange}  disabled/>
              </div>
              <div className="col-md-6">
                <label>Phone Number</label>
                <input type="text" name="phoneNumber" className="form-control" value={customer.phoneNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Gender</label>
                <input type="text" name="gender" className="form-control" value={customer.gender} onChange={handleChange}   />
              </div>
              <div className="col-md-6">
                <label>City</label>
                <input type="text" name="city" className="form-control" value={customer.city} onChange={handleChange} />
              </div>
              <div className="mt-3">
                <label>Birth Date</label>
                <CustomDateInput
                  value={customer.birthDate}
                  onChange={(date) => setCustomer(prev => ({ ...prev, birthDate: date }))}
                />

              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Street</label>
                <input type="text" name="street" className="form-control" value={customer.street} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Home Number</label>
                <input type="text" name="homeNumber" className="form-control" value={customer.homeNumber} onChange={handleChange} />
              </div>
            </div>

            {/* Location Picker */}
            <div className="map-container mt-3">
              <LocationPicker
                setValue1={setValue1}
                setValue2={setValue2}
              />
            </div>

            <button className="btn save-btn" onClick={handleSave}>SAVE CHANGES</button>
          </div>
        )}

        {activeView === "orderHistory" && <OrderHistory />}
      </div>
    </div>
  );
}
