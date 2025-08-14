const axios = require('axios');
async function loginAsAdmin() {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            email: 'admin@ouestcamions.fr',
            password: 'AdminOuest123!'
        });
        return response.data.data.access_token.token;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.response?.data || error.message);
        throw error;
    }
}
async function loginAsUser() {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            email: 'robert@transportslenantais.fr',
            password: 'robert44'
        });
        return response.data.data.access_token.token;
    } catch (error) {
        console.error('Erreur lors de la connexion utilisateur :', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { loginAsAdmin, loginAsUser };