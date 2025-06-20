import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function LivePurchase() {
    const [livePurchases, setLivePurchases] = useState([]);
    const SupplierToken = localStorage.getItem("SupplierToken");

    useEffect(() => {
        const fetchLivePurchases = async () => {
            try {
                const response = await axios.get(
                    "https://bulkify-back-end.vercel.app/api/v1/suppliers/allLivePurchases",
                    {
                        headers: {
                            "token": SupplierToken,
                        },
                    }
                );
                console.log(response.data.livePurchases);
                setLivePurchases(response.data.livePurchases || []);
            } catch (error) {
                console.error("Error fetching live purchases:", error);
            }
        };
        fetchLivePurchases();
    }, [SupplierToken]);

    return (
        <>
            <div className="p-4" style={{ width: "-webkit-fill-available" }}>
                <h5 className="mb-4">Purchase deals that have started from your products</h5>
                <div className="row g-4">
                    {livePurchases.length === 0 && (
                        <div className="col-12 text-center">
                            <p>No live purchases found.</p>
                        </div>
                    )}
                    {livePurchases.map((product) => (
                        <div className="col-md-3" key={product._id}>
                            <div className="product-card-live">
                                {Array.isArray(product.imageSource) && product.imageSource.length > 0 && (
                                    <img
                                        src={product.imageSource[0]}
                                        className="img-fluid"
                                        alt={product.name}
                                        style={{ height: "150px", objectFit: "cover", width: "100%" }}
                                    />
                                )}
                                <div className="product-name">{product.name}</div>
                                <div className="contributors">
                                    {product.purchaseDetails?.committedQuantity} out of {product.purchaseDetails?.totalQuantity} Contributors
                                </div>
                                <div className="progress mb-2" style={{ height: "8px" }}>
                                    <div
                                        className="progress-bar bg-success"
                                        role="progressbar"
                                        style={{ width: `${product.purchaseDetails?.progress || 0}%` }}
                                        aria-valuenow={product.purchaseDetails?.progress || 0}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                                <div className="price">EGP{product.price}</div>
                                <div className="remaining-qty">
                                    Remaining: {product.purchaseDetails?.remainingQuantity}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
