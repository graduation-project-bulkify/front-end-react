import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductRequests() {
    const [products, setProducts] = useState([]);
    const AdminToken = localStorage.getItem("AdminToken");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                'https://bulkify-back-end.vercel.app/api/v1/admins/getPendingProducts',
                { headers: { "token": AdminToken } }
            );
            setProducts(res.data.products || []);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const approveProduct = async (productId) => {
        try {
            await axios.patch(
                `https://bulkify-back-end.vercel.app/api/v1/products/${productId}/approve`,
                { isApproved: true },
                { headers: { "token": AdminToken } }
            );

            // showApprovedModal();
            fetchProducts(); // refresh the list after approval
        } catch (err) {
            console.error('Error approving product:', err);
        }
    };

    // const showApprovedModal = () => {
    //     const modal = new window.bootstrap.Modal(document.getElementById('approvedModal'));
    //     modal.show();
    // };

    // const deleteRow = (index) => {
    //     alert(`Deny product at index ${index}`);
    // };

    return (
        <div style={{ width: "100%" }}>
            <div className="form-section">
                <h5 className="mb-4">Product Requests</h5>
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Bulk Threshold</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Supplier</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={product?.imageSource?.[0] || './images/default.png'}
                                            alt={product.name}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.categoryId?.name || 'N/A'}</td>
                                    <td>{product.bulkThreshold}</td>
                                    <td>EGP{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.supplierId?.fullName || 'Unknown'}</td>
                                    <td>
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => approveProduct(product._id)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            // onClick={() => deleteRow(index)}
                                        >
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="approvedModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content p-4">
                        <h5>APPROVED !</h5>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-success px-4"
                                data-bs-dismiss="modal"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
