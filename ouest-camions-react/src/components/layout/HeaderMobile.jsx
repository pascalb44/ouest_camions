import React, { useState } from "react"; import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import LogoHeader from './LogoHeader';
import PictureHeader from "./PictureHeader";



const HeaderMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (

        <header className="header-top-mobile">
            <div className="header-top-banner">
                <LogoHeader />
                <p className="phone-number">
                    <FontAwesomeIcon icon={faPhoneAlt} /> 02 XX XX XX XX</p>           
            </div>
            <div className="mobile-header">
                <div className="header-top">
                    <PictureHeader />
                    <button className="menu-toggle" onClick={toggleMenu}>
                        {isOpen ? "✖" : "☰"}
                    </button>
                </div>
                <nav className={`mobile-nav ${isOpen ? "open" : ""}`}>
                    <Link to="/presentation" className="nav-link" onClick={toggleMenu}>Présentation</Link>
                    <Link to="/" className="nav-link" onClick={toggleMenu}>Nos agences</Link>
                    <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
                    <Link to="/login" className="nav-link" onClick={toggleMenu}>Connexion</Link>
                </nav>
            </div>
        </header>
    );
};

export default HeaderMobile;