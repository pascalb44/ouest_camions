import React from "react";
import ImageHistorique from '../components/ImageHistorique';

const Presentation = () => {
    return (
        <div>
            <h1 className="h1-presentation">Présentation de l'entreprise</h1>

            <h2 className="h2-presentation">Plus de 50 ans d'expérience dans le Grand Ouest</h2>
            <section className="historique-top">
            <p>
                L’histoire de notre entreprise commence en 1973 à Nantes, avec une idée simple et visionnaire : offrir une solution de location de camions souple, fiable et accessible aux professionnels de la région.
                D’abord acteur local, nous avons progressivement étendu notre rayonnement à l’ensemble du Grand Ouest, en concentrant notre expertise sur deux régions stratégiques : la Bretagne et les Pays de la Loire. Ce choix assumé nous a permis de construire des liens de proximité durables avec des artisans, des PME, des industriels et des collectivités locales, en leur proposant une réponse logistique adaptée à leurs enjeux quotidiens.
            </p>
            </section>
            <div className="image-presentation">
            <ImageHistorique />
            </div>
            <section className="historique-bottom">
            <p>Au fil des décennies, nous avons su évoluer : modernisation de la flotte, diversification des véhicules (camions standards, porteurs spécialisés, semi-remorques), développement de services associés comme l’entretien ou la location longue durée, et intégration progressive des outils numériques pour une gestion plus agile.
                Mais au-delà de la technologie et des équipements, c’est notre engagement humain et territorial qui fait notre force. Implantée au plus près des clients, notre équipe privilégie la réactivité, l’écoute et le service personnalisé.
                Aujourd’hui, avec plus de 50 ans d’expérience, nous sommes fiers de contribuer activement au dynamisme économique du Grand Ouest, en restant fidèles à nos racines et à notre mission : mettre la puissance du transport au service de ceux qui font vivre notre région.
            </p>
            </section>
        </div>
    );
};
export default Presentation;