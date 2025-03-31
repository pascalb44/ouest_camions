import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);  // to manage errors

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token'); // to get user Id 
                if (!token) {
                    setError('Aucun utilisateur trouvé');
                    return;
                }
                const decoded = jwtDecode(token);
                const userId = decoded.sub; // 'sub' = user Id

                const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
                setError('Impossible de récupérer les informations de l\'utilisateur');
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {   /*  to deconnect */
        try {
            const token = localStorage.getItem('token');
            console.log("Token avant logout:", token); // if token 

            const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Réponse logout:", response.data);

            localStorage.removeItem('token');
            localStorage.removeItem('paymentMethod');
            localStorage.removeItem('reservation');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');

            window.location.href = "/login"; /* redirect to login page after connection */
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error.response ? error.response.data : error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="profile-block">
            <h1 className="h1-profile">Profil</h1>
            <div className="profile">
                <div className="form-group-profile"><label className="label-profile">Prénom :</label> {user.first_name}</div>
                <div className="form-group-profile"><label className="label-profile">Nom :</label> {user.last_name}</div>
                <div className="form-group-profile"><label className="label-profile">Entreprise :</label> {user.company}</div>
                <div className="form-group-profile"><label className="label-profile">SIREN :</label> {user.siren}</div>
                <div className="form-group-profile"><label className="label-profile">Adresse :</label> {user.address}</div>
                <div className="form-group-profile"><label className="label-profile">Code postal :</label> {user.postal_code}</div>
                <div className="form-group-profile"><label className="label-profile">Ville :</label> {user.town}</div>
                <div className="form-group-profile"><label className="label-profile">Email :</label> {user.email}</div>
                <div className="form-group-profile"><label className="label-profile">Téléphone :</label> {user.phone}</div>
                <div className="profile-button-group">
                    <Link to="/cart" className="link-cart">Votre panier</Link>
                    <Link to="/orders" className="link-orders">Vos commandes</Link>
                    <button onClick={handleLogout} className="logout-button">Déconnexion</button>
                    <Link to={`/user/edit-user/${user.id}`} className="link-edit-user">Gestion</Link> {/* get id of the user to manage it*/}
                </div>
            </div>
        </div>
    );
};

export default Profile;