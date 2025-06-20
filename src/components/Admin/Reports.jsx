import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reports/Reports.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function Reports() {
    const [stats, setStats] = useState({
        customers: 0,
        suppliers: 0,
        totalOrders: 0,
        totalSales: 0,
        pendingOrders: 0,
        totalProducts: 0  // Add new state
    });

    useEffect(() => {
        const AdminToken = localStorage.getItem('AdminToken');
        if (!AdminToken) {
            return;
        }

        const fetchStats = async () => {
            try {
                const [customers, suppliers, pendingProducts, allProducts, allOrders] = await Promise.all([
                    axios.get('https://bulkify-back-end.vercel.app/api/v1/admins/getAllCustomers?limit=10000', {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': AdminToken
                        }
                    }),
                    axios.get('https://bulkify-back-end.vercel.app/api/v1/admins/getAllSuppliers?limit=10000', {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': AdminToken
                        }
                    }),
                    axios.get('https://bulkify-back-end.vercel.app/api/v1/products?isApproved=false', {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': AdminToken
                        }
                    }),
                    axios.get('https://bulkify-back-end.vercel.app/api/v1/products?limit=10000', {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': AdminToken
                        }
                    }),
                    axios.get('https://bulkify-back-end.vercel.app/api/v1/admins/getAllCustomerPurchases?limit=1', {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': AdminToken
                        }
                    })
                ]);

                setStats(prev => ({
                    ...prev,
                    customers: customers.data.total || 0,
                    suppliers: suppliers.data.total || 0,
                    pendingOrders: pendingProducts.data.products?.length || 0,
                    totalProducts: allProducts.data.total || 0,
                    totalOrders: allOrders.data.total || allOrders.data.totalOrders || allOrders.data.customerPurchases?.length || 0
                }));
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="row p-4 gy-4">
            <div className="col-md-3" style={{ animationDelay: '0.1s' }}>
                <div className="card-box">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="stats-label">Total Users</h6>
                            <h4 className="stats-number">{stats.customers + stats.suppliers}</h4>
                            <div className="stats-trend trend-up">
                                <FontAwesomeIcon icon={faArrowUp} />
                                <span>8.5% vs yesterday</span>
                            </div>
                        </div>
                        <div className="icon-box bg-light-purple">
                            <i className="bi bi-person-fill text-purple fs-4"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3" style={{ animationDelay: '0.2s' }}>
                <div className="card-box">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="stats-label">Total Order</h6>
                            <h4 className="stats-number">{stats.totalOrders}</h4>
                            <div className="stats-trend trend-up">
                                <FontAwesomeIcon icon={faArrowUp} />
                                <span>1.3% Up from past week</span>
                            </div>
                        </div>
                        <div className="icon-box bg-light-warning">
                            <i className="bi bi-box-fill text-warning fs-4"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3" style={{ animationDelay: '0.5s' }}>
                <div className="card-box">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="stats-label">Total Products</h6>
                            <h4 className="stats-number">{stats.totalProducts}</h4>
                            <div className="stats-trend trend-up">
                                <FontAwesomeIcon icon={faArrowUp} />
                                <span>New products added</span>
                            </div>
                        </div>
                        <div className="icon-box bg-light-info">
                            <i className="bi bi-box-seam text-info fs-4"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3" style={{ animationDelay: '0.3s' }}>
                <div className="card-box">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="stats-label">Total Sales</h6>
                            <h4 className="stats-number">{stats.totalSales}</h4>
                            <div className="stats-trend trend-down">
                                <FontAwesomeIcon icon={faArrowDown} />
                                <span>4.3% Down from yesterday</span>
                            </div>
                        </div>
                        <div className="icon-box bg-light-success">
                            <i className="bi bi-graph-up-arrow text-success fs-4"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3" style={{ animationDelay: '0.4s' }}>
                <div className="card-box">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="stats-label">Total Pending Products</h6>
                            <h4 className="stats-number">{stats.pendingOrders}</h4>
                            <div className="stats-trend trend-up">
                                <FontAwesomeIcon icon={faArrowUp} />
                                <span>1.8% Up from yesterday</span>
                            </div>
                        </div>
                        <div className="icon-box bg-light-danger">
                            <i className="bi bi-clock-history text-danger fs-4"></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
