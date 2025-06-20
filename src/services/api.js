import axios from 'axios';

const BASE_URL = 'https://bulkify-back-end.vercel.app/api/v1';

export const api = {
    getProducts: (page, limit) => 
        axios.get(`${BASE_URL}/products/regular?page=${page}&limit=${limit}`),
    
    getNearbyProducts: (token) => 
        axios.get(`${BASE_URL}/products/nearby`, {
            headers: { token }
        }),
    
    getCategories: () => 
        axios.get(`${BASE_URL}/categories`),
    
    rateProduct: (productId, rating, comment, token) => 
        axios.post(`${BASE_URL}/products/${productId}/rate`, 
            { rating, comment },
            { headers: { token } }
        ),
    
    voteForPurchase: (productId, purchaseId, data, token) => 
        axios.post(`${BASE_URL}/products/${productId}/purchases/${purchaseId}/vote`,
            data,
            { headers: { token } }
        )
};
