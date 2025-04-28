import React from 'react';
//import axios from "axios";
const Legal = () => {
    return (
        <div>
            <h1 className='h1-legal'>Mentions légales</h1>
            <div className='bloc-legal'>
                <h2 className='h2-legal'> Identité de l'Entreprise</h2>
                Raison sociale : Ouest Camions<br />
                Directeur de la publication : Pascal Alouest

                <h2 className='h2-legal'> Hébergeur du Site</h2>
                <p>OVH</p>
                <p>140 quai du Sartel</p>
                <p>59100 Roubaix</p>
                <p>France</p>

                <h2 className='h2-legal'> Protection des Données Personnelles</h2>
                Le Loueur s'engage à protéger les données personnelles du Locataire, conformément à la réglementation en vigueur (RGPD).<br />
                Les données ne seront pas communiquées à des tiers sans le consentement du Locataire.<br />

                <h2 className='h2-legal'> Propriété Intellectuelle</h2>
                Le contenu de ce site est protégé par des droits d'auteur. Toute reproduction est interdite sans autorisation préalable.
            </div>
        </div>
    );
};
export default Legal;