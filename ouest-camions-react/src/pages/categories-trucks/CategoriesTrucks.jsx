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
            const res = await axios.get("http://127.0.0.1:8000/api/categories-trucks");
            setCategoriesTrucks(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement des catégories :", error);
        }
    };


    return (
        <div>
            <h1 className="h1-categories-trucks">Ouest camions, c'est Tous nos camions</h1>

            <div className="categories-trucks-list">
                {categoriesTrucks.map((truck) => (
                    <div key={truck.id}
                        className="categories-trucks-item">
                        <div className="categories-trucks-name">
                            <p>{truck.name_category_truck || "Nom indisponible"}</p>
                        </div>
                        <div className="category-truck-image-box">
                            <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTruck/${truck.image_category_truck}`} className="category-truck-image" alt="camion disponible en location" />
                            {/* image_category_truck is the name of the picture in the table category_truck */}
                        </div>
                        <div className="category-truck-image-caption">

                        <Link to={`/trucks-by-category/${truck.id}`}>
                                                 En savoir plus
                                {/* link to detail page of the trucks */}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesTrucks;
