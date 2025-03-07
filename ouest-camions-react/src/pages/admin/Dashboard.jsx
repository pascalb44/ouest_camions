import React, { useEffect, useState } from 'react';
import axios from 'axios';import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [message, setMessage] = useState('');
   
    useEffect(() => {
        axios.get('/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response); 
            setMessage(response.data.message);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du dashboard', error);
        });
    }, []);



    return (
        <div>
            <h1>Tableau de Bord Admin</h1>
            <p>{message}</p>
            <ul>
                <li><Link to="/admin/categories-trailers">Gestion des catégories de remorques</Link></li>
                <li><Link to="/admin/contacts">Gestion des contacts</Link></li>
                <li><Link to="/admin/trucks">Gestion des camions</Link></li>
                <li><Link to="/admin/trailers">Gestion des remorques</Link></li>
                <li><Link to="/admin/category-trucks">Gestion des catégories de camions</Link></li>
               <li><Link to="/admin/orders">Gestion des commandes </Link></li>
               <li><Link to="/admin/users">Gestion des clients </Link></li>

            </ul>
        </div>
    );
};

export default Dashboard;