import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="nav-item"><Link to="/presentation" className="admin-link">Présentation</Link></li>
                <li className="nav-item"><Link to="/" className="admin-link">Nos agences</Link></li>
                <li className="nav-item"><Link to="/contacts" className="admin-link">Contact</Link></li>
                <li className="nav-item"><Link to="/login" className="admin-link">Connexion</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;