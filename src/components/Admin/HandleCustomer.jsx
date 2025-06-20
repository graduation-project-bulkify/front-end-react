import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination as MuiPagination, Button } from "@mui/material";

export default function HandleCustomer() {
  const CUSTOMERS_PER_PAGE = 6;
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const AdminToken = localStorage.getItem("AdminToken");

  useEffect(() => {
    fetchCustomers(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchCustomers = async (page) => {
    try {
      const response = await axios.get(
        `https://bulkify-back-end.vercel.app/api/v1/admins/getAllCustomers?page=${page}&limit=${CUSTOMERS_PER_PAGE}`,
        {
          headers: {
            "token": AdminToken,
          },
        }
      );
      setCustomers(response.data.customers || []);
      setTotalCustomers(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bulkify-back-end.vercel.app/api/v1/admins/customers/${id}`, {
        headers: {
          token: AdminToken,
        },
      });
      fetchCustomers(currentPage);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const totalPages = Math.ceil(totalCustomers / CUSTOMERS_PER_PAGE);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-4" style={{ width: "100%" }}>
      <h5 className="mb-4" style={{ fontWeight: "bold", fontSize: "24px", textAlign: "center", color: "#333" }}>
        Handle Customers
      </h5>

      <div className="row g-4">
        {customers.map((customer) => (
          <div className="col-md-4" key={customer._id}>
            <div
              className="product-card-live-customer"
              style={{
                border: "2px solid #4CAF50",
                padding: "15px",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "20px", color: "#4CAF50" }}>
                {customer.firstName} {customer.lastName}
              </div>
              <div style={{ margin: "5px 0" }}>Email: <span style={{ fontWeight: "bold" }}>{customer.email}</span></div>
              <div style={{ margin: "5px 0" }}>Phone: <span style={{ fontWeight: "bold" }}>{customer.phoneNumber}</span></div>
              <div style={{ margin: "5px 0" }}>Gender: <span style={{ fontWeight: "bold" }}>{customer.gender}</span></div>
              <div style={{ margin: "5px 0" }}>City: <span style={{ fontWeight: "bold" }}>{customer.city}</span></div>
              <div style={{ margin: "5px 0" }}>Street: <span style={{ fontWeight: "bold" }}>{customer.street}</span></div>
              <div style={{ margin: "5px 0" }}>Home Number: <span style={{ fontWeight: "bold" }}>{customer.homeNumber}</span></div>
              <div style={{ margin: "5px 0" }}>
                Coordinates: <span style={{ fontWeight: "bold" }}>{customer.coordinates?.[1]}, {customer.coordinates?.[0]}</span>
              </div>
              <Button
                variant="contained"
                color="error"
                sx={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  width: "100%",
                }}
                onClick={() => handleDelete(customer._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="success"
        />
      </div>
    </div>
  );
}
