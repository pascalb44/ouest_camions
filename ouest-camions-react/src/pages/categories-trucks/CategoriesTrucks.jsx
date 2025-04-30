import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


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


    return (
        <div>
            <div className="top-categories-trucks">
                <Link to="/" className="categories-truck-btn-return">Accueil</Link>
                <h1 className="h1-categories-trucks" >Ouestcamions, des camions pour tous vos usages</h1>

            </div>
            <div className="categories-trucks-list">
                {categoriesTrucks.map((truck) => (
                    <div key={truck.id} className="categories-trucks-item">
                        <div className="categories-trucks-name">
                            <p>{truck.name_category_truck || "Nom indisponible"}</p>
                        </div>
                        <div className="category-truck-image-box">
                            <img src={`${process.env.REACT_APP_API_URL}/storage/uploads/CategoryTruck/${truck.image_category_truck}`} className="category-truck-image category-truck-image-specialized" alt="camion disponible en location" />
                            {/* image_category_truck is the name of the picture in the table category_truck */}
                        </div>
                        <div className="category-truck-button-to-trucks-by-category-block">
                            <div className="category-truck-button-to-trucks-by-category">
                                <Link to={`/trucks-by-category/${truck.id}`}>
                                    En savoir plus
                                    {/* link to gallery of trucks */}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesTrucks;
