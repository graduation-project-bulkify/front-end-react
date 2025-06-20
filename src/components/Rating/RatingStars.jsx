import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
// Run the following command in your project directory to install the library:
// npm install react-icons

const RatingStars = ({ productId, initialRating = 0, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState(''); // Changed from review to comment
    const CustomerToken = localStorage.getItem('CustomerToken');

    const handleRating = async (currentRating) => {
        if (!CustomerToken) {
            alert('Please login to rate products');
            return;
        }

        if (!productId || productId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(productId)) {
            console.error('Invalid product ID');
            alert('Invalid product ID');
            return;
        }

        // Ensure comment is not empty
        if (!comment.trim()) {
            alert('Please add a comment with your rating');
            return;
        }

        try {
            const response = await axios.post(
                `https://bulkify-back-end.vercel.app/api/v1/products/${productId}/rate`,
                {
                    rate: currentRating,
                    comment: comment.trim()
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${CustomerToken}`
                    }
                }
            );
            
            if (response.data) {
                setRating(currentRating);
                setComment(''); // Clear comment after successful submission
                if (onRatingChange) {
                    onRatingChange(currentRating);
                }
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert(error.response?.data?.message || 'Error submitting rating');
        }
    };

    return (
        <div className="rating-container">
            <div className="stars ">
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => handleRating(ratingValue)}
                                style={{ display: 'none' }}
                                className=''
                            />
                            <FaStar
                                className="star"
                                size={20}
                                color={ratingValue <= (hover || rating) ? "#198754" : "#e4e5e9"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                                style={{ cursor: 'pointer', marginRight: '2px' }}
                            />
                        </label>
                    );
                })}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment with your rating"
                className="form-control mt-2"
                rows="2"
            />
            <small className="mt-1">({rating || 0}/5)</small>
        </div>
    );
};

export default RatingStars;
