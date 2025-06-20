import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const RatingDisplay = ({ productId }) => {
    const [ratingData, setRatingData] = useState({
        averageRating: 0,
        ratingsCount: 0
    });

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get(
                    `https://bulkify-back-end.vercel.app/api/v1/products/${productId}/ratings?page=1&sort=latest`
                );
                setRatingData({
                    averageRating: response.data.averageRating,
                    ratingsCount: response.data.ratingsCount
                });
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };

        if (productId) {
            fetchRatings();
        }
    }, [productId]);

    return (
        <div className="rating-display" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    size={14}
                    color={index < Math.round(ratingData.averageRating) ? "#198754" : "#e4e5e9"}
                />
            ))}
            <small>({ratingData.ratingsCount})</small>
        </div>
    );
};

export default RatingDisplay;
