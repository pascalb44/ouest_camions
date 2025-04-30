import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Trucks = () => {
    const [Trucks, setTrucks] = useState([]);

    useEffect(() => {
        displayTrucks();
    }, []);

    const displayTrucks = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/trucks`);
            setTrucks(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement des camions :", error);
        }
    };

    const deleteTruck = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/trucks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTrucks(Trucks.filter(truck => truck.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression des camions :", error);
            alert("Erreur lors de la suppression.");
        }
    };

    return (
        <div className="admin-trucks-page">
                        <Link to="/admin/" className="admin-truck-btn-return">Retour au dashboard</Link>
            <h1 className="h1-admin-trucks">Liste des camions</h1>

            <div className="admin-truck-btn-add-container">
                <Link to="/admin/trucks/add" className="admin-truck-btn-add">Ajouter un camion</Link>
            </div>
            <table className="table-admin-truck">
                <thead>
                    <tr className="admin-truck-menu"> {/*diminutive for admin because screen not too large*/}
                        <th>Image</th>
                        <th>Marque</th>
                        <th>Catégorie</th>
                        <th>Nom</th>
                        <th className="admin-truck-menu-description">Desc</th>
                        <th>Coul</th>
                        <th>Long</th>
                        <th>Larg</th>
                        <th>Haut</th>
                        <th>Charge</th>
                        <th>Km</th>
                        <th>Durée</th>
                        <th>Px/jour</th>
                        <th>Px/semaine</th>
                        <th>Px/mois</th>
                        <th>Px/an</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Trucks.map((truck) => (
                        <tr className="admin-truck-unite" key={truck.id}>
                            <td className="admin-truck-image-container">
                                <img src={`${process.env.REACT_APP_API_URL}/storage/uploads/truck/${truck.image_truck}`} alt={truck.name} width="75px" className="admin-truck-image" />
                            </td>
                            <td className="admin-truck-detail">{truck.brand_truck}</td>
                            <td className="admin-truck-detail">{truck.categories_trucks?.name_category_truck}</td>
                            <td className="admin-truck-detail">{truck.name_truck}</td>
                            <td className="admin-truck-detail">{truck.description_truck}</td>
                            <td className="admin-truck-detail">{truck.color_truck}</td>
                            <td className="admin-truck-detail">{truck.lenght_truck}</td>
                            <td className="admin-truck-detail">{truck.width_truck}</td>
                            <td className="admin-truck-detail">{truck.height_truck}</td>
                            <td className="admin-truck-detail">{truck.load_truck}</td>
                            <td className="admin-truck-detail">{truck.km_truck}</td>
                            <td className="admin-truck-detail">{truck.duration_truck}</td>
                            <td className="admin-truck-detail">{truck.price_day_truck}</td>
                            <td className="admin-truck-detail">{truck.price_week_truck}</td>
                            <td className="admin-truck-detail">{truck.price_month_truck}</td>
                            <td className="admin-truck-detail">{truck.price_year_truck}</td>

                            <td className="admin-trucks-buttons">
                                <Link to={`/admin/trucks/edit/${truck.id}`} className="admin-truck-update-btn">Modifier</Link>
                                <button className="admin-truck-delete-btn" onClick={() => {
                                    if (window.confirm("Es-tu sûr de vouloir supprimer ce camion ? Cette action est irréversible.")) {
                                        deleteTruck(truck.id);
                                    }
                                }}>
                                    Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            { /* for tablette lanscape + mobile */}
            <div className="admin-trucks-cards">
                {Trucks.map((truck) => (
                    <div className="admin-truck-unit" key={truck.id}>
                        <div className="admin-truck-top-line">
                            <div className="admin-truck-image-container-mobile">
                                <img src={`${process.env.REACT_APP_API_URL}/storage/uploads/truck/${truck.image_truck}`} alt={truck.name_truck} className="admin-truck-image" />
                            </div>
                            <div className="admin-truck-fields">
                                <div><strong>Marque :</strong> {truck.brand_truck}</div>
                                <div><strong>Modèle :</strong> {truck.name_truck}</div>
                                <div><strong>Catégorie :</strong> {truck.categories_trucks?.name_category_truck || "N/A"}</div>
                                <div><strong>Description :</strong> <span className="admin-truck-menu-description">{truck.description_truck}</span></div>                                <div><strong>Couleur :</strong> {truck.color_truck}</div>
                                <div><strong>Longueur :</strong> {truck.lenght_truck}</div>
                                <div><strong>Largeur :</strong> {truck.width_truck}</div>
                                <div><strong>Hauteur :</strong> {truck.height_truck}</div>
                                <div><strong>Charge max :</strong> {truck.load_truck}</div>
                                <div><strong>Kilométrage :</strong> {truck.km_truck}</div>
                                <div><strong>Durée :</strong> {truck.duration_truck}</div>
                                <div><strong>Prix jour :</strong> {truck.price_day_truck}</div>
                                <div><strong>Prix semaine :</strong> {truck.price_week_truck}</div>
                                <div><strong>Prix mois :</strong> {truck.price_month_truck}</div>
                                <div><strong>Prix année :</strong> {truck.price_year_truck}</div>
                            </div>
                        </div>
                        <div className="admin-trucks-buttons">
                            <Link to={`/admin/trucks/edit/${truck.id}`} className="admin-truck-update-btn">Modifier</Link>
                            <button className="admin-truck-delete-btn" onClick={() => {
                                if (window.confirm("Cela va supprimer le camion, voulez-vous confimer?")) {
                                    deleteTruck(truck.id);
                                }
                            }}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Trucks;