import React from 'react';
import { Link } from "react-router-dom";

const LogoHeader = () => {
    const logoSrc = `${process.env.PUBLIC_URL}/images/logo_ouestcamions.jpg`;
    const altText = "Logo Ouest Camions";

    return (
        <div className="logo-container-header">
                     <Link to="/"> {/* to home */}
                <img className="logo-header" src={logoSrc} alt={altText} />
                
            </Link>
        </div>
    );
};

export default LogoHeader;