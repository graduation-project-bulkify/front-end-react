import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../HomePage/ProductDetails.css';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function LiveProductPurchase() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImg] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errMsg, setErrMsg] = useState("");
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [purchaseData, setPurchaseData] = useState(null);
    const CustomerToken = localStorage.getItem('CustomerToken');

    useEffect(() => {
        if (!id) return;

        const fetchLiveProduct = async () => {
            try {
                const response = await axios.get(
                    'https://bulkify-back-end.vercel.app/api/v1/products/nearby',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': CustomerToken
                        }
                    }
                );

                const foundProduct = response.data.nearbyProducts.find(p => p._id === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                    setMainImg(foundProduct.imageSource[0]);
                }
            } catch (error) {
                console.error('Error fetching live product:', error);
                setErrMsg('Failed to load product details');
            }
        };

        fetchLiveProduct();
    }, [id, CustomerToken]);


    const handleVote = async () => {
        if (!CustomerToken) {
            alert("Please log in first.");
            navigate("/login");
            return;
        }

        try {
            const profileResponse = await axios.get(
                'https://bulkify-back-end.vercel.app/api/v1/customers/profile',
                { headers: { token: CustomerToken } }
            );

            const customerProfile = profileResponse.data.customer;

            const voteResponse = await axios.post(
                `https://bulkify-back-end.vercel.app/api/v1/products/${product._id}/purchases/${product.purchaseDetails.purchaseId}/vote`,
                {
                    purchaseQuantity: quantity,
                    deliveryAddress: {
                        city: customerProfile.city || '',
                        street: customerProfile.street || '',
                        homeNumber: customerProfile.homeNumber || ''
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': CustomerToken
                    }
                }
            );

            if (voteResponse.data?.url) {
                setPaymentUrl(voteResponse.data.url);
                setPurchaseData({
                    purchaseId: voteResponse.data.data.purchaseId,
                    productName: voteResponse.data.data.productName
                });
                // Open payment in new window/tab
                window.open(voteResponse.data.url, '_blank');
            }
        } catch (err) {
            setErrMsg(err.response?.data?.err?.[0] || err.response?.data?.msg || "Error submitting vote");
        }
    };

    if (!product) {
        return (
            <div className="loading-container" style={{ height: "100vh" }}>
                <Spinner animation="border" variant="success" />
                <p>Loading product...</p>
            </div>
        );
    }

    return (
        <div className="container product-container my-5">
            {errMsg && (
                <p className="alert alert-danger text-center">{errMsg}</p>
            )}
            <div className="row">
                <div className="col-md-6">
                    <div className="product-images text-center">
                        <img
                            style={{ width: "250px", height: "250px", objectFit: "cover" }}
                            src={mainImage}
                            alt={product.name}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        {product.imageSource.map((image, index) => (
                            <div className="thumbnail mx-1" key={index}>
                                <img
                                    src={image}
                                    alt={`${product.name} Thumbnail ${index + 1}`}
                                    onClick={() => setMainImg(image)}
                                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p><strong>Supplier:</strong> {product.supplierId?.fullName}</p>
                    <p><strong>Availability:</strong> {product.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Total Quantity:</strong> {product.purchaseDetails?.totalQuantity}</p>
                    <p><strong>Committed Quantity:</strong> {product.purchaseDetails?.committedQuantity}</p>
                    <p><strong>Progress:</strong> {product.purchaseDetails?.progress}%</p>
                    <p><strong>Remaining Quantity To Compelete Purchase :</strong> {product.purchaseDetails?.remainingQuantity}</p>
                    <p><strong>End Date:</strong> {new Date(product.purchaseDetails?.endDate).toLocaleDateString()}</p>
                    <p>{product.description}</p>

                    <div className="mt-3">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control mb-3"
                            min="1"
                            max={product.quantity}
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />

                        <button
                            className="btn btn-success w-100 mb-2"
                            onClick={handleVote}
                            disabled={!product.purchaseDetails?.purchaseId}>
                            Join Group Purchase
                        </button>

                        {paymentUrl && (
                            <div className="alert alert-info mt-3">
                                <p>Please complete your payment for {purchaseData?.productName}</p>
                                <a
                                    href={paymentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary mt-2">
                                    Complete Payment
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
