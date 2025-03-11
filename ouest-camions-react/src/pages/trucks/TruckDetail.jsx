import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomDatePicker from "../../components/CustomDatePicker";


const TruckDetail = () => {
    const { id } = useParams();
    const [truck, setTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [durationTruck, setDurationTruck] = useState(0);

    const updateTruckDuration = useCallback((newDuration) => {
        setDurationTruck(newDuration);
    }, []);
    <CustomDatePicker truck={truck} onDurationChange={updateTruckDuration} />

    useEffect(() => {
        const fetchTruckDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/trucks/${id}`);
                setTruck(response.data);
            } catch (error) {
                setError("Erreur lors du chargement du camion.");
            } finally {
                setLoading(false);
            }
        };

        fetchTruckDetail();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!truck) return <p>Aucune donnée disponible.</p>;


    return (
        <div>
            <h1 className="h1-truck-detail">{truck.brand_truck} {truck.name_truck}</h1>
            <div className="truck-detail-page">
                <div className="adBlock"> {/* truck detail block */}
                    <div className="editoTruck">
                        <p>{truck.description_truck}</p>
                    </div>
                    <div className="truck-image-box">
                        <img src={`http://127.0.0.1:8000/storage/uploads/Truck/${truck.image_truck}`} className="truck-category-image" alt={`Camion ${truck.name_truck}`} />
                    </div>
                    <h2>Caractéristiques</h2>
                    <p>Couleur : {truck.color_truck}</p>
                    <p>Longueur : {truck.length_truck}</p>
                    <p>Largeur : {truck.width_truck}</p>
                    <p>Hauteur : {truck.height_truck}</p>
                    <p>Kilométrage : {truck.km_truck}</p>
                    <h2>Locations</h2>
                    <p>Durée de location minimum recommandée : {truck.duration_truck}</p>
                    <p>Durée de location : {durationTruck} jour(s)</p>
                    <p>Prix à la journée : {truck.price_day_truck}</p>
                    <p>Prix à la semaine : {truck.price_week_truck}</p>
                    <p>Prix au mois : {truck.price_month_truck}</p>
                    <p>Prix à l'année : {truck.price_year_truck}</p>
                </div>
                <aside>
                    <div>
                        <CustomDatePicker truck={truck} onDurationChange={updateTruckDuration} /> {  /* component with  duration calculated  */}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TruckDetail;
