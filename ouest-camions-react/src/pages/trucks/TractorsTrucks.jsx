import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const TractorsTrucks = () => {
    const [tractorsTrucks, setTractorsTrucks] = useState([]);

    useEffect(() => {
        displayTractorsTrucks();
    }, []);

    const displayTractorsTrucks = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/trucks");
            const filteredTrucks = res.data.filter(truck => truck.id_category_truck === 2); /* get only the trucks with id_category_truck = 2 = tractors */
            setTractorsTrucks(filteredTrucks);
        
        } catch (error) {
            console.error("Erreur lors du chargement des camions :", error);
        }
    };



    return (
        <div>
            <h1 className="h1-tractor-trucks">Tous nos camions tracteurs</h1>
            <div className="tractor-trucks-list">
                {tractorsTrucks.map((truck) => (
                    <div
                        key={truck.id}
                        className="tractor-trucks-item">
                        <div className="tractor-trucks-name">
                        <p>{truck.brand_truck}</p>
                            <p>{truck.name_truck}</p>

                        </div>
                        <div className="tractor-truck-image-box">
                            <img src={`http://127.0.0.1:8000/storage/uploads/Truck/${truck.image_truck}`} className="tractor-truck-image" alt="tracteur disponible" />
                            {/* image_truck is the name of the picture in the table trucks */}
                        </div>
                        <div className="tractor-truck-image-caption">
                        <Link to={`/tractor-truck-detail/${truck.id}`}>    
                              En savoir plus
                                {/* link to detail page of the truck */}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TractorsTrucks;
