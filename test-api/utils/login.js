process.env.APP_ENV = 'testing';
require('dotenv').config({ path: '.env.testing' });

const axios = require('axios');

const baseURL = process.env.BASE_URL || 'http://laravel-docker:80/api';

async function loginAsAdmin() {
    try {
        const response = await axios.post(`${baseURL}/login`, {
            email: 'admin@ouestcamions.fr',
            password: 'AdminOuest123!',
        });

        const token = response.data.data.access_token.token;        
        const authAxios = axios.create({
            baseURL,
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

async function loginAsUser() {
    try {
        const response = await axios.post(`${baseURL}/login`, {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        });

        const token = response.data.data.access_token.token;

        const authAxios = axios.create({
            baseURL,
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
