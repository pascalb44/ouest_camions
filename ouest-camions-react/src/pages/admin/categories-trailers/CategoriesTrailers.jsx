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
            const res = await axios.get("http://127.0.0.1:8000/api/categories-trailers");
            setCategoriesTrailers(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement des catégories :", error);
        }
    };

    /* delete */ 
    const deleteCategoryTrailer = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://127.0.0.1:8000/api/admin/categories-trailers/${id}`, { /* only admin */
                headers: { Authorization: `Bearer ${token}` },
            });

            setCategoriesTrailers(categoriesTrailers.filter(categoryTrailer => categoryTrailer.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie :", error);
            alert("Erreur lors de la suppression de la catégorie.");
        }
    };

    return (
        <div className="admin-category-trailer-container mt-5">
            <h1>Liste des catégories</h1>

            <div className="admin-category-trailer-btn-add-container">
                <Link to="/admin/categories-trailers/add" className="admin-category-trailer-btn-add">Ajouter une catégorie</Link>
            </div>

            <table className="table">
                <thead>
                    <tr className="admin-category-trailer-menu">
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
                                <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTrailer/${categoryTrailer.image_category_trailer}`} 
                                    alt={categoryTrailer.name} width="75px" className="admin-category-trailer-image"/>
                            </td>
                            <td className="admin-categories-trailers-buttons">
                                <Link to={`/admin/categories-trailers/edit/${categoryTrailer.id}`} className="admin-category-trailer-update-btn">Modifier</Link>
                                <button className="admin-category-trailer-delete-btn" onClick={() => deleteCategoryTrailer(categoryTrailer.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesTrailers;
