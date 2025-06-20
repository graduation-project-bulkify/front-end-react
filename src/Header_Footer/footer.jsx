import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './footer.css';
import logo from '../images/Layer_1.png';

function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories?limit=10000");
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <footer style={{ height: '300px' }}>
            <div className="footer">
                <div className="footer-contanier">
                    <div className="item">
                        <img src={logo} alt="not found" />
                        <h5 style={{color:"wheat"}}>Customer Supports:</h5>
                        <a href="mailto:admin@bulkify.com">admin@bulkify.com</a>
                    </div>

                    <div className="item">
                        <h3>Categories</h3>
                        <div style={{ 
                            maxHeight: '200px',
                            overflow: 'auto',
                            columnCount: 2,
                            columnGap: '20px'
                        }}>
                            <ul style={{ margin: 0, breakInside: 'avoid' }}>
                                {categories.map(category => (
                                    <li key={category._id}>
                                        <Link to={`/categories?category=${category.name}`}>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="item">
                        <h3>Quick links</h3>
                        <ul>
                            <li><a href="mailto:admin@bulkify.com">Customer Help</a></li>
                            <li><a href="/about-us">About Us</a></li>
                        </ul>
                    </div>

                    <div className="clear-fix"></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
