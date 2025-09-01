process.env.APP_ENV = 'testing';
//require('dotenv').config({ path: '.env.testing' });

const axios = require('axios');
//const baseURL = process.env.BASE_URL || 'http://laravel-docker:80';
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';
//const BASE_URL = process.env.BASE_URL;

async function loginAsAdmin(BASE_URL) {
    try {
        console.log('URL de connexion dans login.js :', `${BASE_URL}/api/login`); // connexion URL
        const response = await axios.post(`${BASE_URL}/api/login`, {
            email: 'admin@ouestcamions.fr',
            password: 'AdminOuest123!',
        });

        console.log('Type de response.data :', typeof response.data);
        console.log('Réponse de l\'API :', response.data); // response 

        const token = response.data.data?.access_token?.token;
        if (!token) {
            throw new Error("Token non trouvé dans la réponse : structure inattendue.");
        }

        const authAxios = axios.create({
            baseURL: BASE_URL,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return { token, authAxios };
    } catch (error) {
        console.error('Erreur lors de la connexion admin :', error.response?.data || error.message);
        throw error;
    }
}

async function loginAsUser(BASE_URL) {
    try {
        console.log('URL de connexion dans login.js :', `${BASE_URL}/api/login`);
        const response = await axios.post(`${BASE_URL}/api/login`, {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        });

        const token = response.data.data?.access_token?.token;
        const authAxios = axios.create({
            baseURL: `${BASE_URL}/api`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return { token, authAxios };
    } catch (error) {
        console.error('Erreur lors de la connexion utilisateur :', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { loginAsAdmin, loginAsUser };
