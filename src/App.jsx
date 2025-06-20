import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Login from "../src/components/Login.jsx";
import Signup from "./components/SignUp";
import SignUpAdmin from "./components/Admin/SignUpAdmin";
import ForgetPassword from "./components/ForgetPass/Forget-Password";
import SupSignUp from "./components/supplier/SupSignUp";
import Header from '../src/Header_Footer/header.jsx';
import Footer from '../src/Header_Footer/footer.jsx';
import HomePage from "./HomePage/HomePage.jsx";
import ProductDetails from "./HomePage/ProductDetails.jsx";
import SuppDashboard from "./components/supplier/SuppDashboard.jsx";
import AddProduct from "./components/supplier/AddProduct.jsx";
import EditProduct from "./components/supplier/EditProduct.jsx";
import LivePurchase from "./components/supplier/LivePurchase.jsx";
import OrderStatus from "./components/supplier/OrderStatus.jsx";
import Categories from "./components/Categories/Categories.jsx";
import CustomerProfile from "./components/Customer/CustomerProfile.jsx";
import OrderHistory from "./components/Customer/OrderHistory.jsx";

import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import ProductRequests from "./components/Admin/ProductRequests.jsx";
import Reports from "./components/Admin/Reports.jsx";
import HandleCustomer from "./components/Admin/HandleCustomer.jsx";
import HandleSuppliers from "./components/Admin/HandleSuppliers.jsx";
import HandleProducts from "./components/Admin/HandleProducts.jsx";

import CategoriesPage from './components/Categories/CategoriesPage';
import LiveProductPurchase from './components/LiveProductPurchase/LiveProductPurchase.jsx';
import Error404 from './pages/Error404/Error404';
import Breadcrumb from './components/common/Breadcrumb/Breadcrumb';
import Loader from './components/common/Loader/Loader';

import AboutUs from './components/AboutUs/AboutUs';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Forget-Password" element={<ForgetPassword />} />
        <Route path="/SignUpAdmin" element={<SignUpAdmin />} />
        <Route path="/ProductDetails/:name" element={<ProductDetails />} />
        <Route path="/CustomerProfile/*" element={<CustomerProfile />}>
        <Route path="orderhistory" element={<OrderHistory />} />
        </Route>
        <Route path="/SupSignUp" element={<SupSignUp />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/live-product/:id" element={<LiveProductPurchase />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* Dashboard for Supplier with nested routes */}
        <Route path="/SuppDashboard/*" element={<SuppDashboard />}>
          <Route path="add" element={<AddProduct />} />
          <Route path="edit" element={<EditProduct />} />
          <Route path="live" element={<LivePurchase />} />
          <Route path="order" element={<OrderStatus />} />
          </Route>

        {/* Dashboard for Admin with nested routes */}
        <Route path="/AdminDashboard/*" element={<AdminDashboard />}>
          <Route path="categories" element={<Categories />} />
          <Route path="product-requests" element={<ProductRequests />} />
          <Route path="reports" element={<Reports />} />
          <Route path="handle-customer" element={<HandleCustomer />} />
          <Route path="handle-suppliers" element={<HandleSuppliers />} />
          <Route path="handle-products" element={<HandleProducts />}/>
          <Route path="categories-page" element={<CategoriesPage />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/supplier/*" element={<Error404 />} />
        <Route path="/admin/*" element={<Error404 />} />
        
        {/* 404 catch-all */}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
