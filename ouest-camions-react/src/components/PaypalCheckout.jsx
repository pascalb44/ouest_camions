import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";


const PaypalCheckout = () => {
  const paypalRef = useRef(null);
  const navigate = useNavigate();
  const hasRendered = useRef(false);



  useEffect(() => {
    if (!window.paypal || !paypalRef.current || hasRendered.current) return;

    hasRendered.current = true;
    paypalRef.current.innerHTML = "";

    const reservation = JSON.parse(localStorage.getItem("reservation"));
    const amount = reservation?.amount || "0.01";

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: amount.toString() }
          }]
        });
      },

      onApprove: async (data, actions) => {
        try {
          await actions.order.capture();
          const paypalOrderId = data.orderID;

          const token = localStorage.getItem("token");
          const reservation = JSON.parse(localStorage.getItem("reservation"));


          const formatDateForSQL = (date) => {
            const parsed = new Date(date);
            if (isNaN(parsed.getTime())) {
              console.error("Date invalide :", date);
              return null; 
            }
            return format(parsed, "yyyy-MM-dd HH:mm:ss");
          };

          if (!reservation?.startDate || !reservation?.endDate) {
            alert("Les dates de réservation sont manquantes ou invalides.");
            return;
          }
          const payload = {
            start_date: formatDateForSQL(reservation.startDate),
            end_date: formatDateForSQL(reservation.endDate),
            amount: reservation.amount,
            method_payment: "paypal",
            trucks: reservation.trucks || [],
            trailers: reservation.trailers || [],
            paypal_order_id: paypalOrderId,
          };


          console.log(JSON.parse(localStorage.getItem("reservation")));
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            },
            body: JSON.stringify(payload)
          });

          const contentType = response.headers.get("content-type");
          const rawText = await response.text();

          if (contentType && contentType.includes("application/json")) {
            const result = JSON.parse(rawText);

            if (!response.ok) {
              console.error("Code HTTP :", response.status);
              console.error("Réponse serveur :", result);
              throw new Error("Erreur lors de l'enregistrement de la commande");
            }

            console.log("Réponse API :", result);
            localStorage.removeItem("reservation");
            localStorage.removeItem("reservations");
            navigate("/orders");
          } else {
            console.error("Réponse non-JSON :", rawText);
            throw new Error("Réponse invalide reçue du serveur.");
          }
        } catch (error) {
          console.error("Erreur de paiement ou d'enregistrement :", error);
          alert("Une erreur est survenue. Veuillez contacter le support.");
        }
      },

      onError: (err) => {
        console.error("Erreur PayPal :", err);
      }
    }).render(paypalRef.current);
  }, [navigate]);


  return (
    <div id="paypal-wrapper">
      <div id="paypal-button-container" ref={paypalRef}></div>
    </div>
  );
};

export default PaypalCheckout;