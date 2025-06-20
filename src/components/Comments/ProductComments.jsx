import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const ProductComments = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState({ averageRating: 0, ratingsCount: 0 });

    const fetchComments = async (page) => {
        try {
            const response = await axios.get(
                `https://bulkify-back-end.vercel.app/api/v1/products/${productId}/ratings?page=${page}&sort=latest`
            );
            
            if (page === 1) {
                setComments(response.data.ratings || []);
            } else {
                setComments(prev => [...prev, ...(response.data.ratings || [])]);
            }
            
            setTotalPages(response.data.totalPages || 1);
            setStats({
                averageRating: response.data.averageRating || 0,
                ratingsCount: response.data.ratingsCount || 0
            });
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchComments(1);
        }
    }, [productId]);

    const loadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            fetchComments(currentPage + 1);
        }
    };

    if (loading && currentPage === 1) {
        return <div className="text-center p-4">Loading comments...</div>;
    }

    return (
        <div className="product-comments mt-4">
            <div className="review-summary mb-4">
                <h4>Customer Reviews ({stats.ratingsCount})</h4>
                <div className="d-flex align-items-center mb-3">
                    <div className="stars me-2">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                size={20}
                                color={index < Math.round(stats.averageRating) ? "#ffc107" : "#e4e5e9"}
                            />
                        ))}
                    </div>
                    <span className="ms-2">{stats.averageRating.toFixed(1)} out of 5</span>
                </div>
            </div>

            {comments.length > 0 ? (
                <>
                    <div className="comments-list">
                        {comments.map((comment) => (
                            <div key={comment._id} className="comment-card p-3 mb-3 bg-light rounded">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="stars me-2">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                key={index}
                                                size={14}
                                                color={index < comment.rate ? "#ffc107" : "#e4e5e9"}
                                            />
                                        ))}
                                    </div>
                                    <small className="text-muted">
                                        {new Date(comment.timestamp).toLocaleDateString()}
                                    </small>
                                </div>
                                <p className="mb-0">{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                    
                    {currentPage < totalPages && (
                        <div className="text-center mt-4">
                            <button 
                                className="btn btn-outline-success"
                                onClick={loadMore}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load More Reviews'}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p>No reviews yet. Be the first to review this product!</p>
            )}
        </div>
    );
};

export default ProductComments;
