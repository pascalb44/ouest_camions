import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const CategoriesTrailers = () => {
    const [categoriesTrailers, setCategoriesTrailers] = useState([]);

    useEffect(() => {
        displayCategoriesTrailers();
    }, []);

    const displayCategoriesTrailers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories-trailers`);
            setCategoriesTrailers(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement des catégories :", error);
        }
    };

    /* delete */
    const deleteCategoryTrailer = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/categories-trailers/${id}`, { /* only admin */
                headers: { Authorization: `Bearer ${token}` },
            });

            setCategoriesTrailers(categoriesTrailers.filter(categoryTrailer => categoryTrailer.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie :", error);
            alert("Erreur lors de la suppression de la catégorie.");
        }
    };

    return (
        <div>
            <Link to="/admin/" className="admin-categories-trailer-btn-return">Retour au dashboard</Link>
            <div className="admin-categories-trailers-container">

                <h1 className="h1-admin-categories-trailers">Liste des catégories</h1>

                <div className="admin-categories-trailers-btn-add-container">
                    <Link to="/admin/categories-trailers/add" className="admin-category-trailer-btn-add">Ajouter une catégorie</Link>
                </div>

                <table className="admin-categories-trailers-table">
                    <thead>
                        <tr className="admin-categories-trailers-menu">
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesTrailers.map((categoryTrailer) => (
                            <tr className="admin-category-trailer-unite" key={categoryTrailer.id}>
                                <td className="admin-category-trailer-name">{categoryTrailer.name_category_trailer}</td>
                                <td className="admin-category-trailer-description">{categoryTrailer.description}</td>
                                <td className="admin-category-trailer-image-container">
                                    <img src={`${process.env.REACT_APP_API_URL}/storage/uploads/CategoryTrailer/${categoryTrailer.image_category_trailer}`}
                                        alt={categoryTrailer.name} width="75px" className="admin-category-trailer-image" />
                                </td>
                                <td className="admin-categories-trailers-buttons">
                                    <Link to={`/admin/categories-trailers/edit/${categoryTrailer.id}`} className="admin-category-trailer-update-btn">Modifier</Link>
                                    <button className="admin-category-trailer-delete-btn" onClick={() => {
                                        if (window.confirm("Es-tu sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.")) {
                                            deleteCategoryTrailer(categoryTrailer.id);
                                        }
                                    }}>
                                        Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoriesTrailers;
