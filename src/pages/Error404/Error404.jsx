import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="error-page d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <h1 style={{ fontSize: '6rem', color: '#198754' }}>404!</h1>
            <h2>Page Not Found</h2>
            <p className="text-muted">The page you are looking for does not exist or you don't have permission to access it.</p>
            <Link to="/" className="btn btn-success mt-3">
                Back to Home
            </Link>
        </div>
    );
};

export default Error404;
