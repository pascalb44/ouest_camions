import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Trailers = () => {
    const [trailers, settrailers] = useState([]);

    useEffect(() => {
        displaytrailers();
    }, []);

    const displaytrailers = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/trailers");
            settrailers(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement des remorques :", error);
        }
    };

    const deletetrailer = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://127.0.0.1:8000/api/admin/trailers/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            settrailers(trailers.filter(trailer => trailer.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression des remorques :", error);
            alert("Erreur lors de la suppression.");
        }
    };

    return (
        <div className="admin-trailers-page">
            <Link to="/admin/" className="admin-trailer-btn-return">Retour au dashboard</Link>
            <h1 className="h1-admin-trailers">Liste des remorques</h1>
            <div className="admin-trailer-btn-add-container">
                <Link to="/admin/trailers/add" className="admin-trailer-btn-add">Ajouter une remorque</Link>
            </div>



            { /* for admin */}
            {trailers.map((trailer) => (
                <div className="admin-trailer-list" key={trailer.id}>
                    <div className="admin-trailer-list-block">
                        <div className="admin-trailer-bloc-left">
                            <div><strong>Marque :</strong> {trailer.brand_trailer}</div>
                            <div><strong>Modèle :</strong> {trailer.name_trailer}</div>
                            <div><strong>Catégorie :</strong> {trailer.categories_trailers?.name_category_trailer || "N/A"}</div>
                            <div className="admin-trailer-image-container">
                                <img src={`http://127.0.0.1:8000/storage/uploads/trailer/${trailer.image_trailer}`} alt={trailer.name_trailer} className="admin-trailer-image" />
                            </div>
                        </div>
                        <div className="admin-trailer-bloc-right">
                            <div><strong>Description :</strong> <span className="admin-trailer-description-list">{trailer.description_trailer}</span></div>
                            <div><strong>Couleur :</strong> {trailer.color_trailer}</div>
                            <div><strong>Longueur :</strong> {trailer.lenght_trailer}</div>
                            <div><strong>Largeur :</strong> {trailer.width_trailer}</div>
                            <div><strong>Hauteur :</strong> {trailer.height_trailer}</div>
                            <div><strong>Charge max :</strong> {trailer.load_trailer}</div>
                            <div><strong>Kilométrage :</strong> {trailer.km_trailer}</div>
                            <div><strong>Durée :</strong> {trailer.duration_trailer}</div>
                            <div><strong>Prix jour :</strong> {trailer.price_day_trailer}</div>
                            <div><strong>Prix semaine :</strong> {trailer.price_week_trailer}</div>
                            <div><strong>Prix mois :</strong> {trailer.price_month_trailer}</div>
                            <div><strong>Prix année :</strong> {trailer.price_year_trailer}</div>
                        </div>
                    </div>
                    <div className="admin-trailers-buttons">
                        <Link to={`/admin/trailers/edit/${trailer.id}`} className="admin-trailer-update-btn">Modifier</Link>
                        <button className="admin-trailer-delete-btn" onClick={() => {
                            if (window.confirm("Cela va supprimer le remorque, voulez-vous confimer?")) {
                                deletetrailer(trailer.id);
                            }
                        }}>Supprimer</button>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Trailers;