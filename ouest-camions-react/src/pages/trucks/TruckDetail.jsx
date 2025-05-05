import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomDatePicker from "../../components/CustomDatePicker";
import { useNavigate } from "react-router-dom";

const TruckDetail = () => {
    const { id } = useParams();
    const [truck, setTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [durationTruck, setDurationTruck] = useState(0);

    const navigate = useNavigate();

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
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/trucks/${id}`);
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
        if (!startDate || !endDate) {
            alert("Veuillez sélectionner des dates valides.");
            return;
        }
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);

        const newReservation = {
            id: truck.id,
            name: truck.name_truck,
            brand: truck.brand_truck,
            pricePerDay: truck.price_day_truck,
            pricePerWeek: truck.price_week_truck,
            pricePerMonth: truck.price_month_truck,
            pricePerYear: truck.price_year_truck,
            duration: durationTruck,
            startDate: startDate,
            endDate: endDate,
            type: "truck",
        };
        const existingReservations = JSON.parse(localStorage.getItem("reservations")) || [];

        const isTruckAlreadyBooked = existingReservations.some(reservation => {
            if (reservation.id === truck.id) { // Compare only reservations of the same truck
                const existingStartDate = new Date(reservation.startDate);
                const existingEndDate = new Date(reservation.endDate);

                // Vérif if there is no same dates 
                return (newStartDate <= existingEndDate && newEndDate >= existingStartDate);
            }
            return false;
        });

        if (isTruckAlreadyBooked) {
            alert("Ce camion est déjà réservé sur cette période. Veuillez choisir d'autres dates.");
            return;
        }

        // Add nex reservation
        existingReservations.push(newReservation);
        localStorage.setItem("reservations", JSON.stringify(existingReservations));

        alert("La réservation a bien été ajoutée au panier mais n'est visible que des utilisateurs connectés !");
        window.location.href = "/cart";
    };

    return (
        <div>
            <button onClick={() => navigate(-1)} className="truck-btn-return-to-category-truck">Retour à la liste</button>
            <h1 className="h1-truck-detail">{truck.brand_truck} {truck.name_truck}</h1>
            <div className="truck-detail-page">
                <div className="truck-detail">
                    <div className="edito-truck">
                        <p>{truck.description_truck}</p>
                    </div>
                    <div className="truck-image-box">
                        <img src={`${process.env.REACT_APP_API_URL}/storage/uploads/Truck/${truck.image_truck}`} className="truck-image" alt={`Camion ${truck.name_truck}`} />
                    </div>
                    <div className="truck-detail-block">
                        <div className="truck-detail-block-1">
                            <h2 className="h2-truck-detail">Caractéristiques</h2>
                            <div className="truck-detail-features">
                                <p>Couleur : {truck.color_truck}</p>
                                <p>Longueur : {truck.length_truck}</p>
                                <p>Largeur : {truck.width_truck}</p>
                                <p>Hauteur : {truck.height_truck}</p>
                                <p>Kilométrage : {truck.km_truck}</p>
                                <p>Charge utile : {truck.load_truck}</p>
                            </div>
                        </div>
                        <div className="truck-detail-block-2">

                            <h2 className="h2-truck-detail">Locations</h2>
                            <div className="truck-detail-location">
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
                    <div className="truck-detail-button-to-reservation">
                        <button className="truck-detail-button-to-reservation-btn" onClick={() => handleReservation(truck)}>
                            Réserver {/* direct link to reservation page */}
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TruckDetail;
