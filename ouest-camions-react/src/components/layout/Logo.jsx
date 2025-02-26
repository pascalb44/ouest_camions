import React from 'react';
import { Link } from "react-router-dom";


const Logo = ({ clickable = true, footer = false }) => {
    const logoSrc = "./images/logo_ouestcamions.jpg";
    const altText = "Logo Ouest Camions";
    const logoClass = footer ? "logo logoFooter" : "logo";

    
    const logo = <img className={logoClass} src={logoSrc} alt={altText} />;


    return (
        <div className="logo-container">
            {clickable && !footer ? <Link to="/">{logo}</Link> : logo}
            {/* logo will be used in header and footer, clickable for header but not for footer with a different scss */}
        </div>
    );
};
export default Logo;