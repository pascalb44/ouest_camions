import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Payment = () => {
    const [selectedPayments, setSelectedPayments] = useState({
        paypal: false,
        cb: false,
        sepa: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vous devez être connecté pour accéder à cette page.");
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setSelectedPayments((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };
    const handleSubmit = async () => {
        console.log("handleSubmit déclenché");
    
        const paymentMethod = Object.keys(selectedPayments).find(
            (key) => selectedPayments[key]
        );
    
        if (!paymentMethod) {
            alert("Veuillez choisir une méthode de paiement.");
            return;
        }
    
        const reservation = JSON.parse(localStorage.getItem("reservation"));
        if (!reservation) {
            alert("Aucune réservation trouvée.");
            return;
        }
    
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token introuvable.");
            navigate('/login');
            return;
        }
    
        try {
            const response = await axios.post("/api/orders", {
                start_date: reservation.startDate,
                end_date: reservation.endDate,
                amount: reservation.amount,
                method_payment: paymentMethod,
                trucks: reservation.trucks,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log("Commande créée avec succès", response.data);
            
            // Marquer que le paiement est effectué
            localStorage.setItem("paymentCompleted", "true");
            
            navigate('/orders');
        } catch (error) {
            console.error("Erreur lors de la création de la commande", error);
            if (error.response) {
                console.error("Détails de l'erreur:", error.response.data);
            }
        }
    };

    return (
        <div>
            <h2>Choisissez votre méthode de paiement</h2>
            <form>
                <ul>
                    <li>
                        <label>
                            <input type="checkbox" name="paypal" checked={selectedPayments.paypal} onChange={handleChange}/>
                            PayPal
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="cb" checked={selectedPayments.cb} onChange={handleChange}/>
                            Carte bancaire
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" name="sepa" checked={selectedPayments.sepa} onChange={handleChange}/>
                            Virement SEPA
                        </label>
                    </li>
                </ul>
                <button type="button" onClick={handleSubmit}>Confirmer la commande</button>
            </form>
        </div>
    );
};

export default Payment;
