import React from 'react';
import ImageAgences from '../components/ImageAgences';

//import axios from "axios";
const Agences = () => {
    return (
        <div>
            <h1 className='h1-agencies'>Nos agences</h1>
            <ImageAgences /> {/* map on the agence page*/}
            <div className="bloc-agencies1">
                <div className="bloc-agencies">
                    <p>
                        <span style={{ fontWeight: 'bold' }}>Agence de Nantes</span><br />
                        12 Rue de la pacification<br />
                        44000 Nantes<br />
                        Téléphone : 02 40 12 34 56
                    </p>
                </div>
                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence de Rennes</span><br />
                    15 Boulevard de la démocratie<br />
                        35000 Rennes<br />
                        Téléphone : 02 99 12 34 56
                    </p>
                </div>
                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence de Brest</span><br />
                        8 Rue Jean Valjean<br />
                        29200 Brest<br />
                        Téléphone : 02 98 12 34 56
                    </p>
                </div>
            </div>
            <div className="bloc-agencies2">

                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence de Lorient</span><br />
                        21 Avenue de la monarchie<br />
                        56100 Lorient<br />
                        Téléphone : 02 97 12 34 56
                    </p>
                </div>
                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence de Vannes</span><br />
                        3 Rue des échoppes<br />
                        56000 Vannes<br />
                        Téléphone : 02 97 45 67 89
                    </p>
                </div>
                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence de Angers</span><br />
                        7 Place du Rassemblement<br />
                        49000 Angers<br />
                        Téléphone : 02 41 12 34 56
                    </p>
                </div>
            </div>
            <div className="bloc-agencies3">
                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence du Mans</span><br />
                        19 Rue des manceaux<br />
                        72000 Le Mans<br />
                        Téléphone : 02 43 12 34 56
                    </p>
                </div>
                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence de Saint-Nazaire</span><br />
                        24 Boulevard de la mer<br />
                        44600 Saint-Nazaire<br />
                        Téléphone : 02 40 67 89 01
                    </p>
                </div>
                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence de Quimper</span><br />
                        11 Rue du menhir<br />
                        29000 Quimper<br />
                        Téléphone : 02 98 99 88 77
                    </p>
                </div>
            </div>
            <div className="bloc-agencies4">
                <div className="bloc-agencies">
                    <p>
                    <span style={{ fontWeight: 'bold' }}>Agence de La Roche-sur-Yon</span><br />
                        Place de l'empereur<br />
                        85000 La Roche-sur-Yon<br />
                        Téléphone : 02 51 12 34 56
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Agences;