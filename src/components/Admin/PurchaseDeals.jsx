import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination as MuiPagination } from "@mui/material";
import './PurchaseDeals.css';

export default function PurchaseDeals() {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const AdminToken = localStorage.getItem("AdminToken");

  useEffect(() => {
    const fetchPurchases = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://bulkify-back-end.vercel.app/api/v1/admins/getAllCustomerPurchases?page=${currentPage}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'token': AdminToken
            }
          }
        );
        setPurchases(res.data.customerPurchases || []);
        setTotalPages(res.data.totalPages || 1);
      } catch {
        setPurchases([]);
        setTotalPages(1);
      }
      setIsLoading(false);
    };
    fetchPurchases();
  }, [currentPage, AdminToken]);

  // Skeleton for loading state
  const PurchaseSkeleton = () => (
    <div className="purchase-card skeleton" style={{ width: 340, minWidth: 340 }}>
      <div className="skeleton-avatar" />
      <div className="skeleton-lines">
        <div className="skeleton-line" style={{ width: "60%" }} />
        <div className="skeleton-line" style={{ width: "40%" }} />
        <div className="skeleton-line" style={{ width: "80%", marginTop: 16 }} />
      </div>
    </div>
  );

  return (
    <div className="purchase-deals-container" >
      <h4 style={{ marginBottom: 24, fontWeight: 600 }}>Customer Purchases</h4>
      <div className="purchase-cards-grid">
        {isLoading
          ? [...Array(6)].map((_, idx) => <PurchaseSkeleton key={idx} />)
          : purchases.length > 0 ? (
            purchases.map((purchase) => {
              const product = purchase.productId || {};
              const customer = purchase.customerId || {};
              const status = purchase.status || "Pending";
              let statusClass = "badge-status";
              if (status.toLowerCase().includes("pending")) statusClass += " badge-pending";
              else if (status.toLowerCase().includes("completed")) statusClass += " badge-completed";
              else if (status.toLowerCase().includes("cancelled")) statusClass += " badge-cancelled";
              else if (status.toLowerCase().includes("waiting")) statusClass += " badge-pending";
              else statusClass += " badge-purchased";

              return (
                <div className="purchase-card" key={purchase._id} style={{ width: 430, minWidth: 340 }}>
                  <div className="purchase-card-header">
                    <img
                      src={product.imageSource?.[0]}
                      alt={product.name}
                      className="purchase-card-avatar"
                      style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover", background: "#f5f5f5" }}
                    />
                    <div className="purchase-card-header-info">
                      <div className="purchase-card-title">{product.name}</div>
                      <div className="purchase-card-customer">
                        {customer.firstName} {customer.lastName}
                        <br /> 
                        <span className='purchase-card-customer-email'>&bull; {customer.email}</span>
                      </div>
                    </div>
                    <span className={statusClass}>{status}</span>
                  </div>
                  <div className="purchase-card-body">
                    <div><strong>Purchase Date:</strong> {purchase.createdAt ? new Date(purchase.createdAt).toLocaleString() : "N/A"}</div>
                    <div><strong>Payment:</strong> {purchase.paymentMethod}</div>
                    <div><strong>Quantity:</strong> {purchase.purchaseQuantity}</div>
                    <div><strong>Price:</strong> EGP {product.price}</div>
                    <div><strong>Category:</strong> {product.categoryId?.name}</div>
                    <div><strong>Supplier:</strong> {product.supplierId?.fullName}</div>
                    <div><strong>Customer Location:</strong> {customer.city}, {customer.street}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#888', width: '100%' }}>
              No customer purchases found.
            </div>
          )
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          variant="outlined"
          color="success"
        />
      </div>
    </div>
  );
}
