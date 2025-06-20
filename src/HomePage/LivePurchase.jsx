import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './LivePurchase.css';

/**
 * LivePurchase Component
 * Displays a carousel of ongoing purchases in the user's area
 */
const LivePurchase = ({ nearby, isLoading }) => {
    // Carousel responsive configuration
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    /**
     * Processes image source to get valid URL
     * @param {string|string[]} imageSource - The image source to process
     * @returns {string} - Valid image URL or placeholder
     */
    const getImageUrl = (imageSource) => {
        if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
        return 'https://via.placeholder.com/200x200?text=No+Image';
    };

    // Loading and empty states
    if (isLoading) {
        return <div className="live-purchases-container" style={{height:"100vh"}}>Loading nearby purchases...</div>;
    }

    if (!nearby || nearby.length === 0) {
        return <div className="live-purchases-container"style={{textAlign:"center"}}>No live purchases available in your area</div>;
    }

    return (
        <div className="live-purchases-container">
            <h2>Trending Group Purchases In Your Area</h2>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="transform 300ms ease-in-out"
                transitionDuration={300}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                centerMode={true}
            >
            {nearby.map((purchase) => (
                <div key={purchase?._id || 'temp-key'} className="live-purchase-card">
                    <img 
                        src={getImageUrl(purchase?.imageSource)} 
                        alt={purchase?.name || 'Product'} 
                        className="product-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                        }}
                    />
                    <div className="purchase-details">
                        <h3>{purchase?.name || 'Unnamed Product'}</h3>
                        <p className="description">{purchase?.description || 'No description available'}</p>
                        <div className="purchase-info">
                            <p><strong>Price:</strong> ${purchase?.price || '0.00'}</p>
                            <p><strong>Quantity:</strong> {purchase?.quantity || 0}</p>
                            <p><strong>Status:  </strong> 
                                <span className={`status-${(purchase?.purchaseDetails?.status || 'pending').toLowerCase()}`} style={{
                                    color: (purchase?.purchaseDetails?.status || 'pending').toLowerCase() === 'pending' ? '#ffa500' : 
                                          (purchase?.purchaseDetails?.status || 'pending').toLowerCase() === 'completed' ? '#28a745' :
                                          (purchase?.purchaseDetails?.status || 'pending').toLowerCase() === 'cancelled' ? '#dc3545' : '#000'
                                }}>
                                    {purchase?.purchaseDetails?.status || 'Pending'}
                                </span>
                            </p>
                            <p><strong>Ends:</strong> 
                                {purchase?.purchaseDetails?.endDate 
                                    ? new Date(purchase.purchaseDetails.endDate).toLocaleDateString() 
                                    : 'Date not available'}
                            </p>
                        </div>
                        <Link 
                            to={`/live-product/${purchase._id}`} 
                            className="btn btn-success" 
                            style={{bottom:"5px", position:"absolute"}}
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
            </Carousel>
        </div>
    );
};

export default LivePurchase;