import React, { useState } from "react"; import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import LogoHeader from './LogoHeader';



const HeaderMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <header className="mobile-header">
            <div className="header-top">
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? "✖" : "☰"}
                </button>
                <div className="header-top-content">
                <LogoHeader /> 
                    <h1>Ouest camions</h1>
                    <p><FontAwesomeIcon icon={faPhoneAlt} /> 0123546879</p>
                </div>
            </div>
            <nav className={`mobile-nav ${isOpen ? "open" : ""}`}>
                <Link to="/presentation" className="nav-link" onClick={toggleMenu}>Présentation</Link>
                <Link to="/" className="nav-link" onClick={toggleMenu}>Nos agences</Link>
                <Link to="/contacts" className="nav-link" onClick={toggleMenu}>Contact</Link>
                <Link to="/login" className="nav-link" onClick={toggleMenu}>Connexion</Link>
            </nav>
        </header>
    );
};

export default HeaderMobile;