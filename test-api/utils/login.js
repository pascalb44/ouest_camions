process.env.APP_ENV = 'testing';
require('dotenv').config({ path: '.env.testing' });

const axios = require('axios');
const baseURL = process.env.BASE_URL || 'http://laravel-docker:80';

async function loginAsAdmin(BASE_URL) {
    try {
        const response = await axios.post(`${BASE_URL}/api/login`, {
            email: 'admin@ouestcamions.fr',
            password: 'AdminOuest123!',
        });

        const token = response.data.access_token;
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

async function loginAsUser(BASE_URL) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        });

        const token = response.data.access_token;

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
