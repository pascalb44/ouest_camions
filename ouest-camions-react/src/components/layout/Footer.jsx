import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import LogoFooter from './LogoFooter';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-block">
                <div className="logo-footer-block">
                    <div className="brand-footer">
                        <p>Ouest camions</p>
                    </div>
                    <div className="logo-footer" >
                        <LogoFooter />
                    </div>
                    <div className="adress-footer">
                        <p className="adress-footer-title">Adresse</p>
                        <p>123 rue du transport</p>
                        <p>44110 CHATEAUBRIANT</p>
                        <p><FontAwesomeIcon icon={faPhoneAlt} /> 02 XX XX XX XX</p> {/* icone */}
                        <p><FontAwesomeIcon icon={faAt} /> contact@ouestcamions.fr</p>
                    </div>

                </div>

                <div className="company-footer">
                    <p className="company-footer-title">L'entreprise</p>
                    <p><Link to="/cgv" className="nav-link">CGV</Link></p>
                    <p>Nos agences</p>
                    <p><Link to="/presentation" className="nav-link">Qui sommes nous?</Link></p>
                   
                </div>
                <div className="services-footer">
                    <p className="services-footer-title">Nos services</p>
                    <p><Link to="/categories-trucks" className="nav-link">Location camions</Link></p>
                    <p><Link to="/categories-trailers" className="nav-link">Location remorques</Link></p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyrigth 2025</p>
                <p><Link to="/legal" className="nav-link">Mentions légales</Link></p>

            </div>
        </footer>
    );
};

export default Footer;