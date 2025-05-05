import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // if user is connected and if is admin
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // if no token
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.role !== 1) { 
                navigate('/profile'); // if no admin
                return;
            }
        } catch (error) {
            console.error('Erreur lors du décodage du token:', error);
            navigate('/login'); // if token invalid
            return;
        }

        // get content of dashboard
        axios.get('http://127.0.0.1:8000/api/admin/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            console.log(response);
            setMessage(response.data.message);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du dashboard', error);
            setError("Erreur lors du chargement du tableau de bord.");
        });
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <div>
            <h1 className="h1-dashboard">Gestion du site</h1>
            {error && <p className="text-red-500">{error}</p>}
            <p>{message}</p>
            <ul className="admin-dashboard-list">
                <li><Link to="/admin/categories-trailers">Gestion des catégories de remorques</Link></li>
                <li><Link to="/admin/trucks">Gestion des camions</Link></li>
                <li><Link to="/admin/trailers">Gestion des remorques</Link></li>
                <li><Link to="/admin/categories-trucks">Gestion des catégories de camions</Link></li>
                <li><Link to="/admin/orders">Gestion des commandes</Link></li>
                <li><Link to="/admin/users">Gestion des clients</Link></li>
            </ul>
            <button onClick={handleLogout} className="btn-to-login"> 
                Se déconnecter {/* go to login page */}
            </button>
        </div>
    );
};

export default Dashboard;
