import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const location = useLocation(); // Permet de détecter les changements de route

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        // Verification route change
        checkAuth();

        // to have the route profile/login on each page
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, [location.pathname]); 

    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="nav-item"><Link to="/presentation" className="admin-link">Présentation</Link></li>
                <li className="nav-item"><Link to="/agences" className="admin-link">Nos agences</Link></li>
                <li className="nav-item"><Link to="/contacts" className="admin-link">Contact</Link></li>
                {isAuthenticated ? (
                    <li className="nav-item"><Link to="/profile" className="admin-link">Votre compte</Link></li>  //permutation profile/login if connected or not
                ) : (
                    <li className="nav-item"><Link to="/login" className="admin-link">Connexion</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
