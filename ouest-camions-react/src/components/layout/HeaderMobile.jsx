import React from "react";
import { Link } from "react-router-dom"; // Si tu utilises React Router pour la navigation

const HeaderMobile = () => {
    return (
        <header className="mobile-header">
            <div className="logo-container">
                <h1>Mon Site</h1> {/* Logo ou titre */}
            </div>
            <nav className="mobile-nav">
                <Link to="/" className="nav-link">Accueil</Link>
                <Link to="/about" className="nav-link">À Propos</Link>
                <Link to="/services" className="nav-link">Services</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
            <button className="menu-toggle">☰</button>
        </header>
    );
};

export default HeaderMobile;