import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footerBlock">
                <div class="logoFooterBlock">
                    <div className="brandFooter">
                        <p><span>Ouest camions</span></p>
                    </div>
                    <div className="logoFooter logoFooterMobile" >
                        <Logo clickable={false} footer={true} /> {/* import component logo not clickable */}
                    </div>
                </div>
                <div className="adressFooter">
                    <p className="adressFooterTitle">Adresse</p>
                    <p>123 rue du tourisme</p>
                    <p>44110 CHATEAUBRIANT</p>
                    <p><FontAwesomeIcon icon={faPhoneAlt} /> 0123546879</p>
                    <p><FontAwesomeIcon icon={faAt} /> contact@ouestcamions.fr</p>
                </div>
                <div className="companyFooter">
                <p className="companyFooterTitle">L'entreprise</p>
                    <p>CGV</p>
                    <p>Nos agences</p>
                    <p>Qui sommes nous?</p>
                </div>
                <div className="servicesFooter">
                <p className="servicesFooterTitle">Nos services</p>
                    <p>Location camions</p>
                    <p>Locations remorques</p>
                </div>
         </div>
            <div className="footerBottom">
                <p>Copyrigth 2025</p>
                <p>Mention légales</p>
            </div>
        </footer>
    );
};

export default Footer;