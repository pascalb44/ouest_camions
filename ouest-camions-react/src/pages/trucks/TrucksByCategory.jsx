import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const TrucksByCategory = () => {
    const { id } = useParams();  // get ID of the categoryL
    const [categoryName, setCategoryName] = useState("");
    const [trucks, setTrucks] = useState([]);


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
            <h1 className="h1-truck-category-name">{categoryName}</h1>  {/* name change on each page */}
            <div className="truck-category-list">
                {trucks.length > 0 ? (
                    trucks.map((truck) => (
                        <div key={truck.id} className="truck-category-item">
                            <div className="truck-category-name">
                                <p>{truck.brand_truck}</p>
                                <p>{truck.name_truck}</p>
                            </div>
                            <div className="truck-category-image-box">
                                <img src={`http://127.0.0.1:8000/storage/uploads/Truck/${truck.image_truck}`} className="truck-category-image" alt={truck.name_truck} />
                            </div>
                            <div className="truck-category-image-caption">
                                <Link to={`/trucks/${truck.id}`}>
                                    En savoir plus
                                    {/* link to detail page of the truck */}
                                </Link>
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
