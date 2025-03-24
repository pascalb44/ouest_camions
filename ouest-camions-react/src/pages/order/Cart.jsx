import { useState, useEffect } from "react";
import { calculatePrice } from "../../utils/utils";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";


const Cart = () => {
    const [reservations, setReservations] = useState([]);
    const [totalTruckPrice, setTotalTruckPrice] = useState(0);
    const [totalTrailerPrice, setTotalTrailerPrice] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user_id");

        if (!token || !user) {
            // Clear reservations if not authenticated
            localStorage.removeItem("reservations");
            setReservations([]);
            return; // Exit early
        }

        const storedData = localStorage.getItem("reservations");

        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);

                let totalTruck = 0;
                let totalTrailer = 0;

                const updatedReservations = parsedData.map((reservation) => {
                    const pricePerDay = parseFloat(reservation.pricePerDay);
                    const pricePerWeek = parseFloat(reservation.pricePerWeek);
                    const pricePerMonth = parseFloat(reservation.pricePerMonth);
                    const pricePerYear = parseFloat(reservation.pricePerYear);

                    const price = calculatePrice(
                        reservation.duration,
                        pricePerDay,
                        pricePerWeek,
                        pricePerMonth,
                        pricePerYear
                    );

                    if (reservation.type === "truck") {
                        totalTruck += price;
                    } else if (reservation.type === "trailer") {
                        totalTrailer += price;
                    }

                    return { ...reservation, calculatedPrice: price };
                }).filter(Boolean);

                setReservations(updatedReservations);
                setTotalTruckPrice(totalTruck);
                setTotalTrailerPrice(totalTrailer);
            } catch (error) {
                console.error("Erreur lors du parsing des réservations :", error);
            }
        }

        const checkAuth = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                localStorage.removeItem("reservations");
                setReservations([]);
            }
        };

        checkAuth();
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    const handleProceedToPayment = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Vous devez être connecté pour procéder au paiement.");
            return;
        }

        localStorage.setItem("reservations", JSON.stringify(reservations));
    };

    const handleClearCart = () => {
        if (window.confirm("Voulez-vous vraiment vider votre panier ?")) {
            localStorage.removeItem("reservations");
            setReservations([]);
            setTotalTruckPrice(0);
            setTotalTrailerPrice(0);
        }
    };
    
    const handleRemove = (id) => {
        const updatedReservations = reservations.filter(res => res.id !== id);
        // Sauvegarder la liste mise à jour dans le localStorage
        localStorage.setItem("reservations", JSON.stringify(updatedReservations));
        // Optionnel : rafraîchir la page pour afficher les changements immédiatement
        window.location.reload();
    };


    if (reservations.length === 0) {
        return <p>Aucune réservation en cours. Soit vous n'êtes pas connecté, soit votre panier est vide</p>;
    }
    const formatDate = (date) => {
        return format(new Date(date), "dd MMMM yyyy", { locale: fr }); // french dates
    }

    return (
        <div>
            <h1 className="h1">Votre panier de réservation</h1>
            <div className="cart">
                <h2>Réservation camions</h2>
                {reservations.length === 0 ? (
                    <p>Aucun camion dans votre panier.</p>
                ) : (
                    reservations
                        .filter((r) => r.type === "truck")
                        .map((truck, index) => (
                            <div key={index}>
                                <p><strong>Camion :</strong> {truck.brand} {truck.name}</p>
                                <p><strong>Durée retenue :</strong> {truck.duration} jours du {formatDate(truck.startDate)} au {formatDate(truck.endDate)}</p>
                                <p><strong>Prix :</strong> {truck.calculatedPrice} €</p>
                                <button onClick={() => handleRemove(truck.id)}>Supprimer cette réservation</button>
                            </div>
                        ))
                )}

                <h2>Réservation remorques</h2>
                {reservations.length === 0 ? (
                    <p>Aucune remorque dans votre panier.</p>
                ) : (
                    reservations
                        .filter((r) => r.type === "trailer")
                        .map((trailer, index) => (
                            <div key={index}>
                                <p><strong>Remorque :</strong> {trailer.brand} {trailer.name}</p>
                                <p><strong>Durée retenue :</strong> {trailer.duration} jours du {formatDate(trailer.startDate)} au {formatDate(trailer.endDate)}</p>
                                <p><strong>Prix :</strong> {trailer.calculatedPrice} €</p>
                                <button onClick={() => handleRemove(trailer.id)}>Supprimer cette réservation</button>
                            </div>
                        ))
                )}
                <h2>Total de la réservation</h2>
                <p><strong>Prix total :</strong> {totalTruckPrice + totalTrailerPrice} €</p>

                <Link to={`/payment`} onClick={handleProceedToPayment}>Payer</Link>
                <button onClick={() => window.location.href = "/"}>Continuez vos réservations</button>
                <button className="clear-cart-button" onClick={handleClearCart}>
                    Vider le panier 🗑️
                </button>
            </div>
        </div>
    );
};

export default Cart;
