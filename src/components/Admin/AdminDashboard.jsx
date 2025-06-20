import React from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductRequests from './ProductRequests'
import Logo from "../images/Layer_1.png"
import PurchaseDeals from './PurchaseDeals'
import Categories from '../Categories/Categories'
import Reports from './Reports'
import CreateAdmin from './CreateAdmin'
import HandleCustomer from './HandleCustomer'
import HandleSuppliers from './HandleSuppliers'
import HandleProducts from './HandleProducts'

const SidebarLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [Admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    useEffect(() => {
        const storedSAdmin = localStorage.getItem("admin");
        if (storedSAdmin) {
            setAdmin(JSON.parse(storedSAdmin));
        }
    }, []);

    useEffect(() => {
        const adminToken = localStorage.getItem("AdminToken");

        if (!adminToken ) {
            navigate('/Error404');
            return;
        }
    }, [navigate]);

    return (
        <>

                <div className="d-flex prodReqContainer">
                    {/* Fixed Sidebar Button for Mobile */}
                    <button
                        className="btn btn-success rounded-circle position-fixed bottom-0 end-0 m-3 d-md-none z-1030"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>

                    {/* Sidebar */}
                    {sidebarVisible && (
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
                            style={{ zIndex: 1010 }}
                            onClick={toggleSidebar}
                        />
                    )}
                    <div className={`bg-light  ${sidebarVisible ? "d-block" : "d-none"} d-md-block col-md-2`}
                        style={{ position: sidebarVisible ? "fixed" : "", zIndex: 1020 ,    padding: "9px",
                            width: "max-content" }}
                    >
                        <img src={Logo} className="mb-4 mt-5 img-fluid" alt="logo" />
                        <div className="col-md-2 sidebar  flex-column position-relative w-auto" style={{ width: "-webkit-fill-available" }}>
                            <Link to="reports" className=""><i className="bi bi-grid-fill me-2"></i> Reports </Link>
                            <Link to="handle-products"><i className="bi bi-boxes me-2"></i> Handle Products </Link>
                            <Link to="handle-suppliers"><i className="bi bi-person-lines-fill me-2"></i> Handle Supplier</Link>
                            <Link to="handle-customer"><i className="bi bi-person-dash-fill me-2"></i> Handle Customer</Link>
                            <Link to="purchase-deals"><i className="bi bi-bag-check-fill me-2"></i> Purchase Deals</Link>
                            <Link to="product-requests"><i className="bi bi-box-seam me-2"></i> Product Requests</Link>
                            <Link to="categories"><i className="bi bi-grid-3x3-gap-fill me-2"></i> Available Categories</Link>
                            <Link to="create-admin"><i className="bi bi-person-plus-fill me-2"></i> Create Admin </Link>
                        </div>
                    </div>


                    {/* Main content */}
                    <div className="col py-3 mx-3 prodReqContainer" style={{width: "0"}}>
                        {/* Topbar */}
                        <div className="d-flex flex-row flex-md-row justify-content-between align-items-center mb-3">
                            <input type="text" className="form-control mb-2 mb-md-0 w-100 w-md-50" placeholder="Search" />
                            <div className="d-flex align-items-center ms-md-3">
                                <div>
                                    <strong>{Admin ? Admin.fullName : "Loading..."}</strong><br />
                                    <small className="text-muted">Admin </small>
                                </div>
                            </div>
                        </div>

                        {/* Dynamically rendered content via routing */}
                        <div className="">
                            <Routes>
                                <Route path="product-requests" element={<ProductRequests />} />
                                <Route path="edit-supplier" element={<div>Edit Supplier</div>} />
                                <Route path="purchase-deals" element={<PurchaseDeals />} />
                                <Route path="categories" element={<Categories/>} />
                                <Route path="reports" element={<Reports />} />
                                <Route path="create-admin" element={<CreateAdmin />} />
                                <Route path="handle-customer" element={<HandleCustomer />} />
                                <Route path="handle-suppliers" element={<HandleSuppliers />} />
                                <Route path="handle-products" element={<HandleProducts />}/>
                                {/* Add more routes as needed */}
                                <Route path="*" element={<div>Select an option from the sidebar.</div>} />

                            </Routes>
                        </div>
                    </div>
                </div>


        </>
    )
};

export default SidebarLayout;
