import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import jwtDecode from 'jwt-decode'; // Importation de la bibliothèque
import { jwtDecode } from 'jwt-decode'; // Utilisation de l'export nommé


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const token = response.data.data.access_token.token;
            setToken(token);
            localStorage.setItem('token', token);

            const decodedToken = jwtDecode(token);

            const userId = decodedToken.id;  // users
            const userRole = decodedToken.role; // admin
            localStorage.setItem('user_id', userId);
            localStorage.setItem('role', userRole);



            // Configuration du header par défaut pour les futures requêtes
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            console.log('Utilisateur connecté :', response.data.data.user);

            navigate('/profile');
            if (userRole === 1) {
                navigate('/admin');
            } else {
                navigate('/profile');
            }
        }
        catch (err) {
            setError(err.response?.data?.message || 'Utilisateur non reconnu !!');
        }
    };


    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            {error && <div>{error}</div>}
            {token && <div>Token JWT: {token}</div>}
        </div>
    );
};

export default LoginForm;
