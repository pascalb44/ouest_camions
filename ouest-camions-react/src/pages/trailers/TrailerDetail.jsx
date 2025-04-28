import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomDatePicker from "../../components/CustomDatePicker";
import { Link } from "react-router-dom";

const TrailerDetail = () => {
    const { id } = useParams();
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [durationTrailer, setDurationTrailer] = useState(0);

    // Add these states to fix the "not defined" errors
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const updateTrailerDuration = useCallback((newDuration, newStartDate, newEndDate) => {
        setDurationTrailer(newDuration); // Update duration
        setStartDate(newStartDate); // Update start date
        setEndDate(newEndDate); // Update end date
    }, []);

    useEffect(() => {
        const fetchTrailerDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/trailers/${id}`);
                setTrailer(response.data);
            } catch (error) {
                setError("Erreur lors du chargement de la remorque.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrailerDetail();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!trailer) return <p>Aucune donnée disponible.</p>;

    const handleReservation = () => {
        if (!startDate || !endDate) {
            alert("Veuillez sélectionner des dates valides.");
            return;
        }
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);

        const newReservation = {
            id: trailer.id,
            name: trailer.name_trailer,
            brand: trailer.brand_trailer,
            pricePerDay: trailer.price_day_trailer,
            pricePerWeek: trailer.price_week_trailer,
            pricePerMonth: trailer.price_month_trailer,
            pricePerYear: trailer.price_year_trailer,
            duration: durationTrailer,
            startDate: startDate,
            endDate: endDate,
            type: "trailer",
        };
        const existingReservations = JSON.parse(localStorage.getItem("reservations")) || [];

        const isTrailerAlreadyBooked = existingReservations.some(reservation => {
            if (reservation.id === trailer.id) { 
                const existingStartDate = new Date(reservation.startDate);
                const existingEndDate = new Date(reservation.endDate);

                 
                return (newStartDate <= existingEndDate && newEndDate >= existingStartDate);
            }
            return false;
        });

        if (isTrailerAlreadyBooked) {
            alert("Ce remorque est déjà réservé sur cette période. Veuillez choisir d'autres dates.");
            return;
        }

        existingReservations.push(newReservation);
        localStorage.setItem("reservations", JSON.stringify(existingReservations));

        alert("La réservation a bien été ajoutée au panier mais n'est visible que des utilisateurs connectés !");
        window.location.href = "/cart";
    };

    return (
        <div>
            <Link to="/categories-trailers/" className="trailer-btn-return">Retour à la liste</Link>
            <div className="trailer-detail-page">
                <h1 className="h1-trailer-detail">{trailer.brand_trailer} {trailer.name_trailer}</h1>
                <div className="edito-trailer">
                    <p>{trailer.description_trailer}</p>
                </div>
                <section className="trailer-detail-top">
                    <div className="trailer-detail-block">
                        <div className="trailer-image-box">
                            <img src={`http://127.0.0.1:8000/storage/uploads/trailer/${trailer.image_trailer}`} className="trailer-image" alt={`remorque ${trailer.name_trailer}`} />
                        </div>
                    </div>
                    <div className="trailer-block-features">
                        <div className="trailer-detail-features">
                            <h2>Caractéristiques</h2>
                            <p>Couleur : {trailer.color_trailer}</p>
                            <p>Longueur : {trailer.length_trailer}</p>
                            <p>Largeur : {trailer.width_trailer}</p>
                            <p>Hauteur : {trailer.height_trailer}</p>
                            <p>Charge utile : {trailer.load_trailer}</p>
                        </div>
                        <div className="trailer-detail-location">
                            <h2>Locations</h2>
                            <p>Prix à la journée : {trailer.price_day_trailer} euros</p>
                            <p>Prix à la semaine : {trailer.price_week_trailer} euros</p>
                            <p>Prix au mois : {trailer.price_month_trailer} euros</p>
                            <p>Prix à l'année : {trailer.price_year_trailer} euros</p>
                        </div>
                    </div>
                </section>
                <div>
                    <CustomDatePicker trailer={trailer} onDurationChange={updateTrailerDuration} />
                </div>
                <button className="trailer-detail-button" onClick={() => handleReservation(trailer)}>
                    Réserver {/* direct link to reservation page */}
                </button>
            </div>
        </div>
    );
};

export default TrailerDetail;
