
/*   to get user data 
const { expect, describe } = require('@jest/globals');
const axios = require('axios');

const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


//-----------------------------
// UTILS 
//-----------------------------

async function login(credentials) {
    try {
        const res = await Axios.post('/login', credentials);
        const token = res.data.data.access_token.token;

        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    } catch (error) {
        throw new Error(`Erreur login : ${error.response?.data?.message || error.message}`);
    }
}

//-----------------------------
// TEST 
//-----------------------------

describe("User Login", () => {
    test("Vérifie si l'utilisateur peut se connecter et obtenir un token", async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        const token = await login(credentials);

        expect(token).toBeDefined();
        expect(typeof token).toBe("string");
    });
});
*/