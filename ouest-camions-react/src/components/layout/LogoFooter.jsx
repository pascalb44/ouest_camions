import React from 'react';

const LogoFooter = () => {
    
    const logoSrc = `${process.env.PUBLIC_URL}/images/logo_ouestcamions.jpg`;
    const altText = "Logo Ouest Camions";

    return (
        <div className="logo-container-footer">
            <img className="logoFooter" src={logoSrc} alt={altText} />
                        {/* logo will be used in header and footer, clickable for header but not for footer with a different scss */}

        </div>
    );
};

export default LogoFooter;