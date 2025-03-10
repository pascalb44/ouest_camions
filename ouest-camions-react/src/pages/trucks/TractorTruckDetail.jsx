import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TractorTruckDetail = () => {
    const [truckDetail, setTruckDetail] = useState(null);
    const { id } = useParams(); // Récupère l'ID depuis l'URL

    const displayTruckDetail = useCallback(async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/trucks/${id}`);
            setTruckDetail(res.data); // Récupère les détails du camion avec l'ID
        } catch (error) {
            console.error("Erreur lors du chargement des détails du camion :", error);
        }
    }, [id]); // La fonction est maintenant mémorisée et dépend de l'ID

    useEffect(() => {
        displayTruckDetail();
    }, [id, displayTruckDetail]); // Ajoute la fonction mémorisée ici

    if (!truckDetail) return <p>Chargement...</p>;

    return (
        <div>
            <h1 className="h1-tractor-truck">{truckDetail.brand_truck} {truckDetail.name_truck}</h1>
            <p>{truckDetail.description_truck}</p>
            <div className="tractor-truck-image-box">
                <img
                    src={`http://127.0.0.1:8000/storage/uploads/Truck/${truckDetail.image_truck}`}
                    className="tractor-truck-image"
                    alt={`Camion ${truckDetail.name_truck}`}
                />
            </div>
        </div>
    );
};

export default TractorTruckDetail;
