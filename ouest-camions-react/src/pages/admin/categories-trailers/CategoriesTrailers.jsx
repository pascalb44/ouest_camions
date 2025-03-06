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

    const deleteCategoryTrailer = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://127.0.0.1:8000/api/categories-trailers/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Met à jour les catégories localement sans refaire une requête API
            setCategoriesTrailers(categoriesTrailers.filter(categoryTrailer => categoryTrailer.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie :", error);
            alert("Erreur lors de la suppression de la catégorie.");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Liste des catégories</h1>

            <div className="mb-3">
                <Link to="/categories-trailers/add" className="btn btn-primary">
                    Ajouter une catégorie
                </Link>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesTrailers.map((categoryTrailer) => (
                        <tr key={categoryTrailer.id}>
                            <td>{categoryTrailer.name}</td>
                            <td>
                                <img 
                                    src={`http://127.0.0.1:8000/storage/uploads/CategoryTrailer/${categoryTrailer.image_category_trailer}`} 
                                    alt={categoryTrailer.name} width="75px" className="category-trailer-image"/>
                            </td>
                            <td>
                                <Link to={`/categories-trailers/edit/${categoryTrailer.id}`} className="btn btn-success me-2">
                                    Modifier
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteCategoryTrailer(categoryTrailer.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesTrailers;
