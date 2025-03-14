import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomDatePicker from "../../components/CustomDatePicker";
import { Link } from "react-router-dom";

const TruckDetail = () => {
    const { id } = useParams();
    const [truck, setTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [durationTruck, setDurationTruck] = useState(0);

    // Add these states to fix the "not defined" errors
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const updateTruckDuration = useCallback((newDuration, newStartDate, newEndDate) => {
        setDurationTruck(newDuration); // Update duration
        setStartDate(newStartDate); // Update start date
        setEndDate(newEndDate); // Update end date
    }, []);

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

    const handleReservation = () => {
        const reservationData = {
            id: truck.id_truck,
            name: truck.name_truck,
            brand: truck.brand_truck,
            pricePerDay: truck.price_day_truck, // Vérifiez que ce champ existe
            pricePerWeek: truck.price_week_truck, // Vérifiez que ce champ existe
            pricePerMonth: truck.price_month_truck, // Vérifiez que ce champ existe
            pricePerYear: truck.price_year_truck, // Vérifiez que ce champ existe
            duration: durationTruck, // Vérifiez que la durée est correcte
            startDate: startDate?.toLocaleDateString("fr-FR"),
            endDate: endDate?.toLocaleDateString("fr-FR"),
        };

        console.log("Données enregistrées dans localStorage :", reservationData); // Vérifiez les valeurs stockées
        localStorage.setItem("reservation", JSON.stringify(reservationData));
    };

    return (
        <div>
            <h1 className="h1-truck-detail">{truck.brand_truck} {truck.name_truck}</h1>
            <div className="truck-detail-page">
                <div className="adBlock">
                    <div className="editoTruck">
                        <p>{truck.description_truck}</p>
                    </div>
                    <div className="truck-image-box">
                        <img src={`http://127.0.0.1:8000/storage/uploads/Truck/${truck.image_truck}`} className="truck-category-image" alt={`Camion ${truck.name_truck}`} />
                    </div>
                    <div>
                        <div className="adBlockDetail">
                            <div className="adBlockFeatures">
                                <h2>Caractéristiques</h2>
                                <p>Couleur : {truck.color_truck}</p>
                                <p>Longueur : {truck.length_truck}</p>
                                <p>Largeur : {truck.width_truck}</p>
                                <p>Hauteur : {truck.height_truck}</p>
                                <p>Kilométrage : {truck.km_truck}</p>
                            </div>
                            <div className="adBlockLocation">
                                <h2>Locations</h2>
                                <p>Prix à la journée : {truck.price_day_truck}</p>
                                <p>Prix à la semaine : {truck.price_week_truck}</p>
                                <p>Prix au mois : {truck.price_month_truck}</p>
                                <p>Prix à l'année : {truck.price_year_truck}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <aside>
                    <div>
                        <CustomDatePicker truck={truck} onDurationChange={updateTruckDuration} />
                    </div>
                    <Link to={`/cart`}>
                        <button className="truck-detail-button" onClick={handleReservation}>Réserver</button>
                    </Link>                        {/* direct link to reservation page */}
                </aside>
            </div>
        </div>
    );
};

export default TruckDetail;
