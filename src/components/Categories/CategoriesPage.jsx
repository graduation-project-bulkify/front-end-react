import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardApi from '../../HomePage/ProductCardApi';
import { useSearchParams } from 'react-router-dom';
import './Categories.css';
import { Pagination as MuiPagination } from "@mui/material";

/**
 * CategoriesPage Component
 * Displays products filtered by categories with a category navigation bar
 */
const CategoriesPage = () => {
    // URL parameters and state management
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All Products';
    
    // State declarations
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
    const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 10000000 });
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [page, setPage] = useState(1);
    const perPage = 9;

    /**
     * Fetches all available categories from the API
     */
    const fetchCategories = async () => {
        try {
            const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories");
            const allCategories = [
                { name: 'All Products' },
                ...(res.data.categories || [])
            ];
            setCategories(allCategories);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    /**
     * Fetches categories and products on component mount
     * Filters products if initial category is provided
     */
    useEffect(() => {
        Promise.all([
            fetchCategories(),
            axios.get('https://bulkify-back-end.vercel.app/api/v1/products/regular?limit=10000')
        ])
        .then(([, productsResponse]) => {
            const productsData = productsResponse.data.products || [];
            setProducts(productsData);
            // Filter products immediately if category is selected
            if (initialCategory  !== 'All Products') {
                const filtered = productsData.filter(product => 
                    product.categoryId && product.categoryId.name.toLowerCase() === initialCategory.toLowerCase()
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts(productsData);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [initialCategory]);

    /**
     * Filters products based on selected category
     * @param {string} categoryName - The name of the selected category
     */
    const filterProducts = (categoryName, priceFilter = priceRange) => {
        setSelectedCategory(categoryName);
        
        let filtered = products;

        // Category filter
        if (categoryName !== 'All Products') {
            filtered = filtered.filter(product => 
                product.categoryId && product.categoryId.name.toLowerCase() === categoryName.toLowerCase()
            );
        }

        // Price filter
        filtered = filtered.filter(product => 
            product.price >= priceFilter.min && product.price <= priceFilter.max
        );

        setFilteredProducts(filtered);
    };

    const handlePriceFilter = () => {
        setPriceRange(tempPriceRange);
        filterProducts(selectedCategory, tempPriceRange);
    };

    /**
     * Extracts image URL from various possible formats
     * @param {string|string[]} imageSource - The image source to process
     * @returns {string} - The processed image URL
     */
    const getImageUrl = (imageSource) => {
        if (!imageSource) return '';
        if (typeof imageSource === 'string') return imageSource;
        if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
        return '';
    };

    // Loading state handling
    if (isLoading) {
        return <div className="loading" style={{height:"100vh"}}>Loading products...</div>;
    }

    // Pagination logic
    const paginatedProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);
    const totalPages = Math.ceil(filteredProducts.length / perPage);

    // Component render
    return (
        <div className="categories-container">
            <h1>Browse by Category</h1>

            <div className="category-container">
                {/* Desktop Filters */}
                <div className="filters-sidebar">
                    <div className="category-buttons">
                        {categories.map(category => (
                            <button
                                key={category.name}
                                className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                                onClick={() => filterProducts(category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <div className="price-filter">
                        <h3>Price Range</h3>
                        <div className="price-inputs">
                            <input
                                type="number"
                                value={tempPriceRange.min}
                                onChange={(e) => setTempPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                placeholder="Min"
                            />
                            <span>to</span>
                            <input
                                type="number"
                                value={tempPriceRange.max}
                                onChange={(e) => setTempPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                placeholder="Max"
                            />
                        </div>
                        <button className="btn-success btn" onClick={handlePriceFilter}>
                            Apply
                        </button>
                    </div>
                </div>

                {/* Mobile Filters */}
                <button 
                    className="filter-button-mobile"
                    onClick={() => setIsFilterVisible(true)}
                >
                    <i className="fas fa-filter"></i> Filters
                </button>

                {isFilterVisible && (
                    <div className="filters-overlay" onClick={() => setIsFilterVisible(false)}>
                        <div 
                            className={`filters-modal ${isFilterVisible ? 'active' : ''}`}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="category-buttons">
                                {categories.map(category => (
                                    <button
                                        key={category.name}
                                        className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                                        onClick={() => filterProducts(category.name)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            <div className="price-filter">
                                <h3>Price Range</h3>
                                <div className="price-inputs">
                                    <input
                                        type="number"
                                        value={tempPriceRange.min}
                                        onChange={(e) => setTempPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                        placeholder="Min"
                                    />
                                    <span>to</span>
                                    <input
                                        type="number"
                                        value={tempPriceRange.max}
                                        onChange={(e) => setTempPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                        placeholder="Max"
                                    />
                                </div>
                                <button className="btn-success btn" onClick={handlePriceFilter}>
                                    Apply
                                </button>
                            </div>
                            
                            <button 
                                className="btn btn-secondary mt-3"
                                onClick={() => setIsFilterVisible(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <div className="products-grid">
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map(product => (
                            <ProductCardApi
                                key={product._id}
                                _id={product._id}  // Add this line to pass the ID
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                quantity={product.quantity}
                                image={getImageUrl(product.imageSource)}
                            />
                        ))
                    ) : (
                        <div className="no-products">
                            No products found in this category
                        </div>
                    )}
                </div>
            </div>
                <div className="d-flex justify-content-center m-5">
                    <MuiPagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        variant="outlined"
                        color="success"
                    />
                </div>
        </div>
    );

};

export default CategoriesPage;
