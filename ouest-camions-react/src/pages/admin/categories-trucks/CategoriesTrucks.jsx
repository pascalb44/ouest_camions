import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const CategoriesTrucks = () => {
    const [categoriesTrucks, setCategoriesTrucks] = useState([]);

    useEffect(() => {
        displayCategoriesTrucks();
    }, []);

    const displayCategoriesTrucks = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories-trucks`);
            setCategoriesTrucks(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement des catégories :", error);
        }
    };

    const deleteCategoryTruck = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/categories-trucks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Met à jour les catégories localement sans refaire une requête API
            setCategoriesTrucks(categoriesTrucks.filter(categoryTruck => categoryTruck.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie :", error);
            alert("Erreur lors de la suppression.");
        }
    };

    return (
        <div>
            <Link to="/admin/" className="admin-truck-btn-return">Retour au dashboard</Link>
            <div className="admin-categories-trucks-page">

                <h1 className="h1-admin-categories-trucks">Liste des catégories de camions</h1>
                <div>
                    <Link to="/admin/categories-trucks/add" className="admin-categories-trucks-btn-add">
                        Ajouter une catégorie
                    </Link>
                </div>
                <table className="admin-categories-trucks-container">
                    <tbody>
                        {categoriesTrucks.map((categoryTruck) => (
                            <tr key={categoryTruck.id} className="admin-categories-trucks-item">
                                <div className="admin-categories-trucks-line">
                                    <td className="admin-category-truck-name">{categoryTruck.name_category_truck}</td>
                                    <td>
                                        <img src={`${process.env.REACT_APP_API_URL}/storage/uploads/CategoryTruck/${categoryTruck.image_category_truck}`}
                                            alt={categoryTruck.name} width="75px" className="admin-category-truck-image" />
                                    </td>
                                </div>
                                <td className="admin-categories-trucks-buttons">
                                    <Link to={`/admin/categories-trucks/edit/${categoryTruck.id}`} className="admin-category-truck-update-btn">
                                        Modifier
                                    </Link> {/* same presentation than a Link but with a button */}
                                    <button className="admin-category-truck-delete-btn" style={{ background: 'red', border: 'none', color: 'white', textDecoration: 'none' }}
                                        onClick={() => {
                                            if (window.confirm("Es-tu sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.")) {
                                                deleteCategoryTruck(categoryTruck.id);
                                            }
                                        }}>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoriesTrucks;