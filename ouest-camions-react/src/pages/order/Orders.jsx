import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vous devez être connecté pour voir vos commandes.");
            return navigate("/login");
        }

        axios.get("http://localhost:8000/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log("Données reçues :", response.data);
            setOrders(response.data);
            
        })
        .catch(error => {
            console.error("Erreur lors du chargement des commandes :", error);
            alert("Erreur lors du chargement des commandes.");
        });
    }, [navigate]);

    if (!orders.length) {
        return <p>Aucune commande trouvée.</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Vos commandes</h1>
            {orders.map((order) => (
                <div key={order.id} className="mb-8 border p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Commande #{order.order_number}</h2>
                    <p><strong>Dates :</strong> {order.start_date} → {order.end_date}</p>
                    <p><strong>Montant :</strong> {order.amount} €</p>
                    <p><strong>Payée le :</strong> {order.date_payment}</p>
                    <p><strong>Méthode :</strong> {order.method_payment}</p>

                    {order.trucks.length > 0 && (
                        <>
                            <h3 className="mt-4 font-bold">Camions :</h3>
                            <ul className="list-disc ml-6">
                                {order.trucks.map(truck => (
                                    <li key={truck.id}>
                                        {truck.brand_truck} {truck.name_truck}
                                        <p><strong>Dates :</strong> {order.start_date} → {order.end_date}</p>

                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {order.trailers.length > 0 && (
                        <>
                            <h3 className="mt-4 font-bold">Remorques :</h3>
                            <ul className="list-disc ml-6">
                                {order.trailers.map(trailer => (
                                    <li key={trailer.id}>
                                        {trailer.brand_trailer} ({trailer.name_trailer})
                                        <p><strong>Dates :</strong> {order.start_date} → {order.end_date}</p>

                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}

            <Link to="/profile" className="text-blue-600 underline mt-6 block">Retour au profil</Link>
        </div>
    );
};

export default Orders;
 