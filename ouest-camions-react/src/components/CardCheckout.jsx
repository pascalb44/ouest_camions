import React, { useEffect, useRef } from 'react';

const PaypalCheckout = () => {
    const paypalRef = useRef(null);

    useEffect(() => {
        const currentRef = paypalRef.current;
    
        const loadPaypal = () => {
            const reservation = JSON.parse(localStorage.getItem("reservation"));
            const amount = reservation?.amount || "0.01";
    
            if (window.paypal) {
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: { value: amount },
                            }],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const details = await actions.order.capture();
                        alert("Paiement PayPal effectué par " + details.payer.name.given_name);
    
                        const token = localStorage.getItem("token");
    
                        await fetch("http://localhost:3000/api/orders", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                start_date: reservation.startDate,
                                end_date: reservation.endDate,
                                amount: amount,
                                method_payment: "paypal",
                                trucks: reservation.trucks,
                                trailers: reservation.trailers, 
                            }),
                        });
    
                        localStorage.removeItem("reservation");
                        window.location.href = "/profil";
                    },
                    onError: (err) => {
                        console.error("Erreur PayPal :", err);
                    }
                }).render(currentRef);
            }
        };
    
        // Charger dynamiquement si non présent
        if (!window.paypal) {
            const script = document.createElement("script");
            script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=EUR"; // ou ton vrai client-id
            script.async = true;
            script.onload = loadPaypal;
            document.body.appendChild(script);
        } else {
            loadPaypal();
        }
    
        return () => {
            currentRef.innerHTML = "";
        };
    }, []);
    

    return <div ref={paypalRef}></div>;
};

export default PaypalCheckout;
 