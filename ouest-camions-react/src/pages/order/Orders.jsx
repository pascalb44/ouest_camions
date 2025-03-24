import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {
    const [cartItems, setCartItems] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si le paiement a été effectué avant d'afficher la page
        const paymentCompleted = localStorage.getItem("paymentCompleted");
        if (!paymentCompleted) {
            alert("Vous devez procéder au paiement avant de pouvoir accéder à cette page.");
            navigate("/cart"); // ou "/payment" selon où tu veux rediriger
        }

        const storedReservation = localStorage.getItem("reservation");
        const storedPaymentMethod = localStorage.getItem("paymentMethod");

        if (storedReservation) {
            setCartItems(JSON.parse(storedReservation));
        }
        if (storedPaymentMethod) {
            setPaymentMethod(JSON.parse(storedPaymentMethod));
        }
    }, [navigate]);

    if (!cartItems) {
        return <p>Aucune commande en cours.</p>;
    }

    return (
        <div>
            <h1>Vos commandes</h1>
            <h2>Détails de la commande</h2>
            <p><strong>Camion :</strong> {cartItems.brand} {cartItems.name}</p>
            <p><strong>Durée :</strong> {cartItems.duration} jours</p>
            <p><strong>Prix total :</strong> {cartItems.price}</p>

            <h2>Méthode de paiement</h2>
            {paymentMethod ? (
                <ul>
                    {paymentMethod.paypal && <li>PayPal</li>}
                    {paymentMethod.cb && <li>Carte bancaire</li>}
                    {paymentMethod.sepa && <li>Virement SEPA</li>}
                </ul>
            ) : (
                <p>Aucune méthode de paiement sélectionnée.</p>
            )}

            <Link to={`/profile`}>Votre compte</Link>
        </div>
    );
};

export default Orders;