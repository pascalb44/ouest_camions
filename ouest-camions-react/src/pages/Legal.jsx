import React from 'react';
//import axios from "axios";
const Legal = () => {
    return (
        <div>
            <h1 className='h1-legal'>Mentions légales</h1>
            <div className='bloc-legal'>
                <h2 className='h2-legal'> Identité de l'Entreprise</h2>
                     Raison sociale : Ouest Camions
                <h2 className='h2-lLegal'> Hébergeur du Site</h2>
                    <p>OVH</p>
                    <p>140 quai du Sartel</p>
                    <p>59100 Roubaix</p>
                    <p>France</p>
                    <h2 className='h2-legal'> Conditions Générales de Vente</h2>
                    <div className='article-legal'>Article 1 : Objet</div>
                    Les présentes Conditions Générales de Vente (CGV) régissent les relations entre [Nom de l'entreprise] (ci-après dénommée "le Loueur") et toute personne physique ou morale (ci-après dénommée "le Locataire") souhaitant louer un camion via le site internet ouestcamions.fr<br />
                    <div className='article-legal'>Article 2 : Acceptation des CGV</div>

                    La réservation d'un camion implique l'acceptation sans réserve des présentes CGV. Le Locataire reconnaît avoir pris connaissance des CGV avant de passer commande.<br />
                    <div className='article-legal'>Article 3 : Réservation</div>

                    3.1 Procédure de réservation<br />
                    La réservation s'effectue en ligne via le site internet ouestcamions.fr. Le Locataire choisit le camion, les dates de location, et remplit le formulaire de réservation.<br />

                    3.2 Confirmation de réservation<br />
                    La réservation sera confirmée par email au Locataire. La confirmation mentionnera les détails de la réservation, notamment le type de camion, le prix total, et les dates de location.<br />
                    <div className='article-legal'>Article 4 : Tarifs</div>

                    Les tarifs de location des camions sont indiqués en euros, toutes taxes comprises (TTC). Les tarifs peuvent varier en fonction de la saison, de la disponibilité et des options choisies. Le Loueur se réserve le droit de modifier ses tarifs à tout moment.<br />
                    <div className='article-legal'> Article 5 : Modalités de paiement</div>

                    5.1 Paiement<br />
                    Le paiement s'effectue en ligne lors de la réservation. Les moyens de paiement acceptés sont : [carte bancaire, PayPal, etc.].

                    <div className='article-legal'> Article 6 : Durée de la location</div>

                    La durée de la location est définie lors de la réservation. Tout dépassement de la durée de location entraîne des frais supplémentaires, calculés sur la base du tarif journalier en vigueur.<br />
                    <div className='article-legal'>Article 7 : Annulation</div>
                    7.1 Droit de rétractation<br />
                    Conformément à la loi, le Locataire dispose d'un délai de 14 jours pour exercer son droit de rétractation, à compter de la date de réservation, à condition que la location ne commence pas dans ce délai.<br />
                    7.2 Conditions d'annulation<br />
                    En cas d'annulation, le Locataire doit notifier le Loueur par écrit. Les frais d'annulation sont les suivants :
                    Annulation plus de 30 jours avant le début de la location : remboursement intégral de l'acompte.<br />
                    Annulation entre 30 et 15 jours avant le début de la location : remboursement de 50% de l'acompte.<br />
                    Annulation moins de 15 jours avant le début de la location : aucun remboursement.<br />
                    <div className='article-legal'>Article 8 : Prise en charge et restitution du camion</div>
                    8.1 Prise en charge
                    Le Locataire doit se présenter à l'adresse indiquée pour prendre possession du camion à la date et à l'heure convenues. Un état des lieux sera réalisé.
                    8.2 Restitution
                    Le camion doit être restitué à la date et à l'heure prévues. Tout retard entraînera des frais supplémentaires.<br />
                    <div className='article-legal'>Article 9 : Assurance</div>
                    Le camion est assuré par le Loueur. Toutefois, le Locataire est responsable de tout dommage causé au véhicule ou à des tiers durant la période de location. Il est conseillé au Locataire de souscrire une assurance complémentaire.<br />
                    <div className='article-legal'>Article 10 : Responsabilité</div>
                    Le Loueur ne pourra être tenu responsable des dommages indirects subis par le Locataire ou par des tiers. La responsabilité du Loueur est limitée au montant total de la location.<br />
                    <div className='article-legal'>Article 11 : Protection des données personnelles</div>
                    Le Loueur s'engage à protéger les données personnelles du Locataire, conformément à la réglementation en vigueur (RGPD). Les données ne seront pas communiquées à des tiers sans le consentement du Locataire.<br />
                    <div className='article-legal'>Article 12 : Loi applicable et litiges</div>
                    Les présentes CGV sont régies par la loi française. En cas de litige, le tribunal compétent sera celui de la ville du siège social du Loueur.<br />

                    <h2 className='h2-legal'> Protection des Données Personnelles</h2>
                    Description de la politique de protection des données et des droits des utilisateurs

                    <h2 className='h2-legal'> Propriété Intellectuelle</h2>
                    Le contenu de ce site est protégé par des droits d'auteur. Toute reproduction est interdite sans autorisation préalable.

                    <h2 className='h2-legal'> Loi Applicable et Juridiction</h2>
                    Les présentes mentions légales sont régies par la loi française. Tout litige sera soumis aux tribunaux compétents de la ville.
            </div>
        </div>
    );
};
export default Legal;