import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <nav aria-label="breadcrumb" className="bg-light py-2 px-3 m-4">
            <ol className="breadcrumb m-0 justify-content-center" >
                <li className="breadcrumb-item">
                    <Link to="/" className="text-success">
                        <FontAwesomeIcon icon={faHome} /> Home
                    </Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    // Decode URI and format the name to be more readable
                    const decodedName = decodeURIComponent(name);
                    const formattedName = decodedName
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    return (
                        <li 
                            key={routeTo} 
                            className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                            style={{textAlign:"center"}}
                        >
                            {isLast ? (
                                formattedName
                            ) : (
                                <>
                                    <Link to={routeTo} className="text-success">
                                        {formattedName}
                                    </Link>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
