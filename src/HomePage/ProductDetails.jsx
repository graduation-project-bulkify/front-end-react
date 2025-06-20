import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductDetails.css';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import RatingStars from '../components/Rating/RatingStars';
import ProductComments from '../components/Comments/ProductComments';

export default function ProductDetails() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImg] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errMsg, setErrMsg] = useState("");
    const [averageRating, setAverageRating] = useState(0);

    const imgStyle = {
        width: "250px",
        height: "250px",
        objectFit: "contain"
    }

    const getImageUrl = (imageSource) => {
        if (!imageSource) return 'https://via.placeholder.com/250x250?text=No+Image';
        if (typeof imageSource === 'string') return imageSource;
        if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
        return 'https://via.placeholder.com/250x250?text=No+Image';
    };

    useEffect(() => {
        const CustomerToken = localStorage.getItem('CustomerToken');
        if (!CustomerToken) return;

        const fetchCustomerProfile = async () => {
            try {
                const response = await axios.get('https://bulkify-back-end.vercel.app/api/v1/customers/profile', {
                    headers: { token: CustomerToken }
                });
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching customer profile:', err);
            }
        };

        fetchCustomerProfile();
    }, []);

    useEffect(() => {
        if (!name) return;

        fetch(`https://bulkify-back-end.vercel.app/api/v1/products/regular?name=${encodeURIComponent(name)}`, {
            headers: {
                'Content-Type': 'application/json',
                
                
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.products && data.products.length > 0) {
                    const foundProduct = data.products[0];
                    setProduct(foundProduct);
                    setMainImg(getImageUrl(foundProduct.imageSource));
                    setAverageRating(foundProduct.averageRating || 0);
                } else {
                    setProduct(null);
                }
            })
            .catch(() => setProduct(null));
    }, [name]);

    const handleStartPurchase = async () => {
        const token = localStorage.getItem("CustomerToken");

        if (!token) {
            alert("Please log in first.");
            navigate("/login");
            return;
        }

        let customerProfile;
        try {
            const profileRes = await axios.get('https://bulkify-back-end.vercel.app/api/v1/customers/profile', {
                headers: { token }
            });
            customerProfile = profileRes.data.customer;

        } catch (err) {
            console.error('Error fetching customer profile:', err);
            setErrMsg("Failed to fetch customer profile.");
            return;
        }

        const payload = {
            purchaseQuantity: quantity,
            deliveryAddress: {
                city: customerProfile.city,
                street: customerProfile.street,
                homeNumber: customerProfile.homeNumber
            }
        };
        try {
            const response = await axios.post(
                `https://bulkify-back-end.vercel.app/api/v1/purchases/startPurchase/${product._id}`,
                payload,
                {
                    headers: {
                        token
                    }
                }
            );
            console.log(response.data);
            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                setErrMsg("Unexpected response from server.");
            }
            
        } catch (err) {
            if(err.response?.data?.message === "Another purchase is in progress within 2km"){
                setErrMsg(err.response?.data?.message || "An error occurred while starting the purchase.");
                setTimeout(() => {
                    navigate(`/live-product/${product._id}`);
                }, 5000);
            } else {
                setErrMsg(err.response?.data?.message || "An error occurred while starting the purchase.");
            }
        }
    };

    if (product === null) {
        return (
            <div className="loading-container" style={{height:"100vh"}}>
                <Spinner animation="border" variant="success" />
                <p>Loading product...</p>
            </div>
        );
    }

    return (
        <div className="container product-container my-5">
            <p className={`alert alert-danger ${errMsg ? 'd-block' : 'd-none'} text-center mx-auto`} aria-live="assertive" id="alert" style={{ backgroundColor: "#ff4d4d", padding: "20px", borderRadius: "10px", maxWidth: "90%", width: "400px", color: "#fff", textAlign: "center", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}>
                {errMsg}
            </p>

            <div className="row">
                <div className="col-md-6">
                    <div className="product-images text-center">
                        <img 
                            style={imgStyle} 
                            id="mainImage" 
                            src={mainImage} 
                            alt={product?.name || 'Product'} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/250x250?text=No+Image';
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        {product?.imageSource && Array.isArray(product.imageSource) && product.imageSource.map((image, index) => (
                            image && (
                                <div className="thumbnail mx-1" key={index}>
                                    <img 
                                        src={image} 
                                        alt={`${product?.name || 'Product'} Thumbnail ${index + 1}`} 
                                        onClick={() => setMainImg(image)}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                                        }}
                                    />
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>{product?.name || 'Unnamed Product'}</h2>
                    <div className="mb-3">
                        <RatingStars 
                            productId={product?._id} 
                            initialRating={averageRating}
                            onRatingChange={(newRating) => setAverageRating(newRating)}
                        />
                    </div>
                    <p><strong>Supplier:</strong> {product?.supplierId?.fullName || "Not found"}</p>
                    <p><strong>Availability:</strong> <span style={{color:'#198754', fontWeight:'bold'}}>{product?.quantity > 0 ? `${product.quantity} In Stock` : "Out of Stock"} </span></p>
                    <p><strong>Price:</strong> ${product?.price || '0.00'}</p>
                    <p>{product?.description || 'No description available'}</p>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control mb-3"
                        min="1"
                        max={product?.quantity || 1}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />

                    <button className="btn btn-success w-100" onClick={handleStartPurchase}>
                        Start Purchase
                    </button>
                    <br />
                </div>
            </div>

            <div className="mt-5 p-4 bg-light rounded">
                <h4>Description</h4>
                <p>{product?.description || 'No description available'}</p>
            </div>

            {/* Add Comments Section */}
            <div className="mt-4">
                <ProductComments productId={product?._id} />
            </div>
        </div>
    );
}
