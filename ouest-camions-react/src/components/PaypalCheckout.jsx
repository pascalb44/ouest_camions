import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaypalCheckout = () => {
  const paypalRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();
  const hasRendered = useRef(false);

  useEffect(() => {
    const scriptId = "paypal-sdk";
    const existingScript = document.getElementById(scriptId);

    const loadPaypalScript = () => {
      if (!existingScript) {
        const script = document.createElement("script"); /* seller account */
        script.src = `https://www.paypal.com/sdk/js?client-id=AaIHlzqZ6B_9pqy0L4MusknH8T_8F8H0qetd9iFIRrIUNInfmmoM7kOjU5pVxADkNamRDCBEamouY-jH&currency=EUR`;        
        script.id = scriptId;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
      } else {
        setSdkReady(true);
      }
    };

    loadPaypalScript();
  }, []);

  useEffect(() => {
    if (sdkReady && window.paypal && paypalRef.current && !hasRendered.current) {
      hasRendered.current = true; // ✅ pour éviter le double render

      // 🧹 Nettoyage du container avant de rendre le bouton
      paypalRef.current.innerHTML = "";

      const reservation = JSON.parse(localStorage.getItem("reservation"));
      const amount = reservation?.amount || "0.01";

      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount.toString() } }],
          });
        },

        onApprove: async (data, actions) => {
          // Capture the payment details
          await actions.order.capture();

          // Now let's send the data to the backend
          try {
            const token = localStorage.getItem("token");
            //const user_id = localStorage.getItem("user_id");

            console.log({
              reservations: reservation.reservations,
              amount: reservation.amount,
              status: "payé",
            });
            
            const response = await fetch("http://localhost:8000/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({                
                reservations: reservation.reservations,
                amount: reservation.amount,
                status: "payé",
              }),
            });

            if (!response.ok) {
              throw new Error("Erreur lors de l'enregistrement de la commande");
            }

            // Clean up and navigate
            localStorage.removeItem("reservation");
            localStorage.removeItem("reservations");
            navigate("/orders");

          } catch (error) {
            console.error("Erreur de paiement ou d'enregistrement :", error);
            alert("Une erreur est survenue. Veuillez contacter le support.");
          }
        },

        onError: (err) => {
          console.error("Erreur PayPal :", err);
        }
      }).render(paypalRef.current);
    }
  }, [sdkReady, navigate]);

  return <div ref={paypalRef}></div>;
};

export default PaypalCheckout; 