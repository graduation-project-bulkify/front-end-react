import React from 'react'

export default function Alert({errMsg,errRef}) {
  
  return (
    <p
    ref={errRef}
    className={`alert alert-danger ${errMsg ? 'd-block' : 'd-none'} text-center mx-auto`}
    aria-live="assertive"
    id="alert"
    style={{
      backgroundColor: "#ff4d4d", // Error background color (red)
      padding: "20px",
      borderRadius: "10px",
      maxWidth: "90%", // Max width for responsiveness
      width: "400px",  // Default width on larger screens
      color: "#fff",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Add shadow for pop-up effect
    }}
  >
      {errMsg}
      </p>
        )
}
