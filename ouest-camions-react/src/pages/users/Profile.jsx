import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { Link } from "react-router-dom";


const Profile = () => {
    const [user, setUser] = useState(null);  // Initialiser avec null, pas un tableau
    const [error, setError] = useState(null);  // Pour gérer les erreurs
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Décoder le token pour obtenir l'ID de l'utilisateur
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Aucun utilisateur trouvé');
                    return;
                }
                const decoded = jwtDecode(token);
                const userId = decoded.sub; // Assumes 'sub' est l'ID de l'utilisateur

                // Requête GET pour obtenir les données de l'utilisateur
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data);  // Assurez-vous que la réponse contient les données attendues
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
                setError('Impossible de récupérer les informations de l\'utilisateur');
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token'); // Supprimer le token
            navigate('/login'); // Rediriger vers la page de connexion
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    if (error) {
        return <div>{error}</div>;  // Afficher l'erreur s'il y en a
    }

    if (!user) {
        return <p>Chargement...</p>;  // Afficher un message de chargement tant que les données ne sont pas récupérées
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Profil</h1>
            <div className="space-y-2">
                <div><label className="font-semibold">Prénom :</label> {user.first_name}</div>
                <div><label className="font-semibold">Nom :</label> {user.last_name}</div>
                <div><label className="font-semibold">Entreprise :</label> {user.company}</div>
                <div><label className="font-semibold">SIREN :</label> {user.siren}</div>
                <div><label className="font-semibold">Adresse :</label> {user.address}</div>
                <div><label className="font-semibold">Code postal :</label> {user.postalCode}</div>
                <div><label className="font-semibold">Ville :</label> {user.town}</div>
                <div><label className="font-semibold">Email :</label> {user.email}</div>
            </div>
            <Link to="/cart">Votre réservation</Link>

            <button 
                onClick={handleLogout} 
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                Se déconnecter
            </button>
        </div>
    );
};

export default Profile;
