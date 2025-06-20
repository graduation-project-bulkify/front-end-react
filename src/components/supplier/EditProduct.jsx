import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SuppDashboard.css';

export default function EditProduct() {
    const PRODUCTS_PER_PAGE = 8;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const SupplierToken = localStorage.getItem("SupplierToken");
    useEffect(() => {
        axios.get('https://bulkify-back-end.vercel.app/api/v1/products?limit=10000', {
            headers: {
                'Content-Type': 'application/json',
                'token': `${SupplierToken}`
            }
        })
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const handleEdit = (product) => {
        const encodedName = encodeURIComponent(product.name);
        navigate(`/SuppDashboard/edit-product/${encodedName}`, { state: { product } });
    };

    // Pagination logic
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="">
            <div className="">
                <div className="col-md-10" style={{ width: "-webkit-fill-available" }}>
                    <div className="p-4">
                        <div className="table-section">
                            <h5 className="mb-4">Edit Or Delete Product</h5>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Bulk Pieces</th>
                                            <th>Bulk Price</th>
                                            <th>Pieces</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedProducts.map((product) => (
                                            <tr key={product._id}>
                                                <td>
                                                    <img
                                                        src={product.imageSource[0] || './images/default.png'}
                                                        className="product-img"
                                                        alt={product.name}
                                                    />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.categoryId?.name || 'Uncategorized'}</td>
                                                <td>{`EGP ${product.price}`}</td>
                                                <td>{product.bulkThreshold}</td>
                                                <td>{`EGP ${product.price * product.bulkThreshold}`}</td>
                                                <td>{product.quantity}</td>
                                                <td className="action-icons">
                                                    <i
                                                        className="bi bi-pencil-square edit me-2"
                                                        onClick={() => handleEdit(product)}
                                                        style={{ cursor: 'pointer' }}
                                                    ></i>
                                                    <i className="bi bi-trash delete"></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination UI */}
                            <div className="d-flex justify-content-center mt-3">
                                {Array.from({ length: totalPages }, (_, idx) => (
                                    <button
                                        key={idx + 1}
                                        className={`btn btn-sm mx-1 ${currentPage === idx + 1 ? 'btn-success' : 'btn-outline-success'}`}
                                        onClick={() => handlePageChange(idx + 1)}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
