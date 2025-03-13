import { useState, useEffect } from "react";
import { calculatePrice } from "../../utils/utils"; // get the function in the specialized file
import { Link } from "react-router-dom";


const Cart = () => {
    const [reservation, setReservation] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedData = localStorage.getItem("reservation"); // get reservation datas
        if (storedData) {
            const parsedData = JSON.parse(storedData); // Convert datas in object JavaScript

            // prices in base are strings (with euros), to calculate prices we have to translate in numbers and remove "euros"
            const pricePerDay = parseFloat(parsedData.pricePerDay.replace(" euros", ""));
            const pricePerWeek = parseFloat(parsedData.pricePerWeek.replace(" euros", ""));
            const pricePerMonth = parseFloat(parsedData.pricePerMonth.replace(" euros", ""));
            const pricePerYear = parseFloat(parsedData.pricePerYear.replace(" euros", ""));

            const price = calculatePrice(
                parsedData.duration,
                pricePerDay,
                pricePerWeek,
                pricePerMonth,
                pricePerYear
            );
            setReservation(parsedData);
            setTotalPrice(price);
        }
    }, []);

    if (!reservation) {
        return <p>Aucune réservation en cours.</p>;
    }

    return (
        <div>
            <h1 className="h1">Votre réservation</h1>
            <div className="cart">

                <h2>Réservation camion</h2>
                    <p><strong>Camion :</strong> {reservation.brand} {reservation.name}</p>

                    <p><strong>Durée retenue :</strong> {reservation.duration} jours du {reservation.startDate} au {reservation.endDate}</p>
                    <p><strong>Prix total camions:</strong> {totalPrice > 0 ? `${totalPrice} €` : "Non calculé"} </p>
                <h2>Réservation remorque</h2>
                    <p><strong>Remorque :</strong> {reservation.brand} {reservation.name}</p>
                    <p><strong>Durée retenue :</strong> {reservation.duration} jours du {reservation.startDate} au {reservation.endDate}</p>
                    <p><strong>Prix total remorques :</strong> {totalPrice > 0 ? `${totalPrice} €` : "Non calculé"} </p>

                <h2>Réservation totale</h2>
                    <p><strong>Prix total :</strong> {totalPrice > 0 ? `${totalPrice} €` : "Non calculé"} + {totalPrice > 0 ? `${totalPrice} €` : "Non calculé"} </p>

                <h2>Méthode de paiement</h2>
                    <ol>
                        <li>paypal</li>
                        <li>CB</li>
                        <li>virement SEPA</li>
                    </ol>
                    <Link to={`/payment`}>Valider</Link>
            </div>
        </div>
    );
};

export default Cart;
