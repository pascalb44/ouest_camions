import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const TrucksByCategory = () => {
    const { id } = useParams();  // get ID of the category
    const [categoryName, setCategoryName] = useState("");
    const [trucks, setTrucks] = useState([]);
    const isSingleTruck = trucks.length === 1; /* to avoid deformation on firefox with 2 trucks instead of 3 */

    const fetchTrucksByCategory = useCallback(async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/trucks/category/${id}`);

            if (res.data && res.data.trucks) {
                setCategoryName(res.data.category_name);
                setTrucks(res.data.trucks);
            } else {
                console.error("Pas de camions trouvés");
                setTrucks([]);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des camions :", error);
            setTrucks([]);
        }
    }, [id]);

    useEffect(() => {
        fetchTrucksByCategory();
    }, [fetchTrucksByCategory]);

    return (
        <div>
            <h1 className="h1-truck-by-category-name">{categoryName}</h1>  {/* name change on each page */}
            <div className="truck-by-category-list">
                {trucks.length > 0 ? (
                    trucks.map((truck) => (
                        <div key={truck.id} className={`truck-by-category-item ${isSingleTruck ? "single-truck" : ""}`}>

                            <div className="truck-by-category-name">
                                <p>{truck.brand_truck} {truck.name_truck}</p>
                            </div>
                            <div className="truck-by-category-image-box">
                                <img src={`http://127.0.0.1:8000/storage/uploads/Truck/${truck.image_truck}`} className="truck-by-category-image" alt={truck.name_truck} />
                            </div>
                            <div className="truck-by-category-content">
                                <p>{truck.km_truck} km</p>
                                <p>A partir de {truck.price_day_truck} /jour</p>

                                <div className="truck-by-category-button-to-trucks">
                                    <Link to={`/trucks/${truck.id}`}>En savoir plus</Link>
                                    {/* link to detail page of the truck */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun camion trouvé pour cette catégorie.</p>
                )}
            </div>
        </div>
    );
};

export default TrucksByCategory;
