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
            const res = await axios.get("http://127.0.0.1:8000/api/categories-trucks");
            setCategoriesTrucks(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement des catégories :", error);
        }
    };

    const deleteCategoryTruck = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://127.0.0.1:8000/api/categories-trucks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Met à jour les catégories localement sans refaire une requête API
            setCategoriesTrucks(categoriesTrucks.filter(categoryTruck => categoryTruck.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie :", error);
            alert("Erreur lors de la suppression de la catégorie.");
        }
    };


      return (
            <div className="container mt-5">
                <h1>Liste des catégories</h1>
    
                <div className="mb-3">
                    <Link to="/categories-trucks/add" className="btn btn-primary">
                        Ajouter une catégorie
                    </Link>
                </div>
     <tbody>
                        {categoriesTrucks.map((categoryTruck) => (
                            <tr key={categoryTruck.id}>
                                <td>{categoryTruck.name}</td>
                                <td>
                                    <img 
                                        src={`http://127.0.0.1:8000/storage/uploads/categories-trucks/${categoryTruck.image}`} 
                                        alt={categoryTruck.name} width="75px" className="category-trailer-image"/>
                                </td>
                                <td>
                                    <Link to={`/categories-trucks/edit/${categoryTruck.id}`} className="btn btn-success me-2">
                                        Modifier
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => deleteCategoryTruck(categoryTruck.id)}>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </div>
        );
    };
    
    export default CategoriesTrucks;