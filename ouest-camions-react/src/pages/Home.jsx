
import React from "react";
import IconMapHome from '../components/IconMapHome';
import ImageHome from '../components/ImageHome';
import IconPromoHome from '../components/IconPromoHome';

import "../style/pages/_home.scss";

const Home = () => {
    return (
        <div>
            <div className="pub-container pub-container-mobile">
                <div className="pub pub-mobile">
                    <p>EXCLUSIF : Découvrez nos locations à partir de 100 euros /jour</p>
                </div>
            </div>
            <h1 className="h1-home">Ouest Camions<span class="subtitle">La location de qualité</span></h1>
            <h2>Votre partenaire en location de camions et remorques dans le grand ouest</h2>
            <p className="toto">dddddddddddddddddd</p>

            <section className="edito">
                <p>Ouest Camions est votre spécialiste de la location de camions et de remorques dans le Grand Ouest de la France. Que vous soyez un professionnel du transport, du BTP, de l’agriculture ou un particulier ayant un besoin ponctuel, nous mettons à votre disposition une flotte de véhicules fiables et performants adaptés à toutes vos exigences.</p>
                <h3>Une large gamme de véhicules pour tous vos besoins.</h3>
                <p>Nous proposons un vaste choix de camions porteurs, semi-remorques, poids lourds, utilitaires et remorques spécialisées. Nos véhicules sont régulièrement entretenus pour garantir sécurité, fiabilité et performance sur toutes vos routes.</p>
                <h3>Flexibilité et tarifs compétitifs.</h3>
                <p>Chez Ouest Camions, nous comprenons que chaque projet est unique. C’est pourquoi nous offrons des solutions de location courte, moyenne et longue durée, avec des tarifs adaptés à vos besoins. Profitez d’une formule flexible sans engagement inutile, avec un service client réactif et à l’écoute.</p>
                <h3>Un service de proximité dans tout le Grand Ouest</h3>
                <p>Implantés au cœur de l’Ouest, nous desservons les principales villes et axes routiers de la région, garantissant une disponibilité rapide de nos véhicules. Nos équipes vous accompagnent dans le choix du camion ou de la remorque idéal, afin d’assurer la réussite de votre mission.. <br />
                    Besoin d’un camion ou d’une remorque ? Contactez-nous dès aujourd’hui et roulez en toute sérénité avec Ouest Camions !
                </p>
            </section>
            <div className="icons-home">
                <IconMapHome /> {/* map on the home page*/}
                <IconPromoHome /> {/* promo on the home page*/}
            </div>
            <ImageHome /> {/* pictures of the vehicles */}
        </div>
    );
};
export default Home;