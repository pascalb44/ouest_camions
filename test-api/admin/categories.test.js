process.env.APP_ENV = 'testing';

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { loginAsAdmin } = require('../utils/login');
require('dotenv').config({ path: '.env.testing' });

let authAxios;
let token;

beforeAll(async () => {
    token = await loginAsAdmin();
    authAxios = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
});

const buildForm = (fields, imgField, imgFile) => {
    const form = new FormData();
    for (const [k, v] of Object.entries(fields)) form.append(k, v);
    const imagePath = path.resolve(__dirname, imgFile);
    if (!fs.existsSync(imagePath)) throw new Error(`Image missing: ${imagePath}`);
    form.append(imgField, fs.createReadStream(imagePath));
    return form;
};

const createCategory = async (url, fields, imgField, imgFile) => {
    const form = buildForm(fields, imgField, imgFile);
    const res = await authAxios.post(url, form, {
        headers: { ...form.getHeaders(), APP_ENV: 'testing' },
    });
    expect(res.status).toBe(201);
    return res.data.data.id;
};

describe('Check API ENV', () => {
    test('Laravel utilise .env.testing', async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/check-env');
        expect(res.status).toBe(200);
        expect(res.data).toMatchObject({
            APP_ENV: 'testing',
            DB_DATABASE: 'ouest_camions_test',
        });
    });
});

describe('Admin API - CategoryTrailer CRUD', () => {
    test('token disponible', () => expect(token).toBeTruthy());

    test('create trailer category', async () => {
        await createCategory('/admin/categories-trailers',
            { name_category_trailer: 'TestCat-' + Date.now(), description: 'Cat test' },
            'image_category_trailer',
            'icone_semitrailer.jpg'
        );
    });

    test('list trailer categories', async () => {
        const res = await authAxios.get('/admin/categories-trailers');
        expect(res.status).toBe(200);
    });

    test('update trailer category', async () => {
        const id = await createCategory('/admin/categories-trailers',
            { name_category_trailer: 'TestCat-' + Date.now(), description: 'Cat test' },
            'image_category_trailer',
            'icone_semitrailer.jpg'
        );
        const updateData = { name_category_trailer: 'TestCat-' + Date.now(), description: 'Maj via Jest' };
        const res = await authAxios.patch(`/admin/categories-trailers/${id}`, updateData, {
            headers: { 'Content-Type': 'application/json' },
        });
        expect(res.status).toBe(200);
    });

    test('delete trailer category', async () => {
        const id = await createCategory('/admin/categories-trailers',
            { name_category_trailer: 'TestCat-' + Date.now(), description: 'Cat test' },
            'image_category_trailer',
            'icone_semitrailer.jpg'
        );
        const res = await authAxios.delete(`/admin/categories-trailers/${id}`);
        expect(res.status).toBe(200);
    });
});

describe('Admin API - CategoryTruck CRUD', () => {
    test('create truck category', async () => {
        await createCategory('/admin/categories-trucks',
            { name_category_truck: 'TestCat-' + Date.now() },
            'image_category_truck',
            'camion_IA2.jpg'
        );
    });

    test('list truck categories', async () => {
        const res = await authAxios.get('/admin/categories-trucks');
        expect(res.status).toBe(200);
    });

    test('update truck category', async () => {
        const id = await createCategory('/admin/categories-trucks',
            { name_category_truck: 'TestCat-' + Date.now() },
            'image_category_truck',
            'camion_IA2.jpg'
        );
        const updateData = { name_category_truck: 'TestCat-' + Date.now(), description: 'Maj via Jest' };
        const res = await authAxios.patch(`/admin/categories-trucks/${id}`, updateData, {
            headers: { 'Content-Type': 'application/json' },
        });
        expect(res.status).toBe(200);
    });

    test('delete truck category', async () => {
        const id = await createCategory('/admin/categories-trucks',
            { name_category_truck: 'TestCat-' + Date.now() },
            'image_category_truck',
            'icone_semitrailer.jpg'
        );
        const res = await authAxios.delete(`/admin/categories-trucks/${id}`);
        expect(res.status).toBe(200);
    });
});


/* process.env.APP_ENV = 'testing';

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { loginAsAdmin } = require('../utils/login');
require('dotenv').config({ path: '.env.testing' });


let authAxios;
let token;

beforeAll(async () => {
    token = await loginAsAdmin(); // to get token

    authAxios = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
});


describe('Check API ENV', () => {
    test('Vérifie que Laravel utilise .env.testing', async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/check-env');
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('APP_ENV', 'testing');
        expect(res.data).toHaveProperty('DB_DATABASE', 'ouest_camions_test');
    });
});




// login admin
describe('Admin API - CategoryTrailer CRUD avec login', () => {

    test('Vérifie si l\'utilisateur peut se connecter et obtenir un token', () => {
        expect(token).toBeTruthy();
    });


    // CRUD for categories_trailers

    // categories_trailers create

    test('should login and create a new trailer category', async () => {
        const form = new FormData();
        form.append('name_category_trailer', 'TestCat-' + Date.now());
        form.append('description', 'Catégorie test créée via Jest');

        const imagePath = path.resolve(__dirname, 'icone_semitrailer.jpg');
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }
        form.append('image_category_trailer', fs.createReadStream(imagePath));

        try {
            const response = await authAxios.post('/admin/categories-trailers', form, {
                headers: {
                    ...form.getHeaders(),
                    'APP_ENV': 'testing',
                },
            });

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('data');
            console.log('Catégorie créée :', response.data.data);
        } catch (error) {
            console.error('Erreur lors de la création de catégorie', error.response?.data || error.message);
            throw error;
        }
    });

    // return to categories_trailers

    test('should return 200 on /admin/categories-trailers', async () => {
        try {
            const response = await authAxios.get('/admin/categories-trailers');
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories', error.response?.data || error.message);
            throw error;
        }
    });

    // categories_trailers update

    test('should login, create then update the category description', async () => {
        const form = new FormData();
        form.append('name_category_trailer', 'TestCat-' + Date.now());
        form.append('description', 'Catégorie test créée via Jest');
        const imagePath = path.resolve(__dirname, 'icone_semitrailer.jpg');

        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }

        form.append('image_category_trailer', fs.createReadStream(imagePath));

        try {
            // Create the category
            const createResponse = await authAxios.post('/admin/categories-trailers', form, {
                headers: {
                    ...form.getHeaders(),
                    'APP_ENV': 'testing',
                },
            });

            expect(createResponse.status).toBe(201);
            expect(createResponse.data).toHaveProperty('data');

            const categoryId = createResponse.data.data.id;
            console.log('Catégorie créée avec ID :', categoryId);

            // Update the category description
            const updateData = {
                name_category_trailer: 'TestCat-' + Date.now(),
                description: 'Catégorie test crée et mise à jour via Jest'
            };

            console.log('Données envoyées pour la mise à jour :', updateData);

            const updateResponse = await authAxios.patch(`/admin/categories-trailers/${categoryId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            expect(updateResponse.status).toBe(200);
            expect(updateResponse.data).toHaveProperty('data');
            console.log('Catégorie mise à jour :', updateResponse.data.data);
        } catch (error) {
            console.error('Erreur lors de la création ou de la mise à jour de la catégorie', error.response?.data || error.message);
            throw error;
        }
    });

    // categories_trailers delete

    test('should login and delete a trailer category', async () => {
        const form = new FormData();
        form.append('name_category_trailer', 'TestCat-' + Date.now());
        form.append('description', 'Catégorie test créée via Jest');

        const imagePath = path.resolve(__dirname, 'icone_semitrailer.jpg');
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }
        form.append('image_category_trailer', fs.createReadStream(imagePath));

        try {
            // Create the category
            const createResponse = await authAxios.post('/admin/categories-trailers', form, {
                headers: {
                    ...form.getHeaders(),
                    'APP_ENV': 'testing',
                },
            });

            expect(createResponse.status).toBe(201);
            expect(createResponse.data).toHaveProperty('data');
            const categoryId = createResponse.data.data.id;

            // Delete the category
            const deleteResponse = await authAxios.delete(`/admin/categories-trailers/${categoryId}`);

            expect(deleteResponse.status).toBe(200);
            console.log('Catégorie supprimée :', categoryId);
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie', error.response?.data || error.message);
            throw error;
        }
    });
});




// CRUD for categories_trucks
describe('Admin API - CategoryTruck CRUD avec login', () => {


    // categories_trucks create

    test('should login and create a new truck category', async () => {
        const form = new FormData();
        form.append('name_category_truck', 'TestCat-' + Date.now());

        const imagePath = path.resolve(__dirname, 'camion_IA2.jpg');
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }
        form.append('image_category_truck', fs.createReadStream(imagePath));

        try {
            const response = await authAxios.post('/admin/categories-trucks', form, {
                headers: {
                    ...form.getHeaders(),
                    'APP_ENV': 'testing',
                },
            });

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('data');
            console.log('Catégorie créée :', response.data.data);
        } catch (error) {
            console.error('Erreur lors de la création de catégorie', error.response?.data || error.message);
            throw error;
        }
    });

    // return to categories_trucks

    test('should return 200 on /admin/categories-trucks', async () => {
        try {
            const response = await authAxios.get('/admin/categories-trucks');
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories', error.response?.data || error.message);
            throw error;
        }
    });



    // categories_trucks update

    test('should login, create then update the truck category ', async () => {
        const form = new FormData();
        form.append('name_category_truck', 'TestCat-' + Date.now());
        const imagePath = path.resolve(__dirname, 'camion_IA2.jpg');

        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }

        form.append('image_category_truck', fs.createReadStream(imagePath));

        try {
            // Create the category
            const createResponse = await authAxios.post('/admin/categories-trucks', form, {
                headers: {
                    ...form.getHeaders(),
                    'APP_ENV': 'testing',
                },
            });

            expect(createResponse.status).toBe(201);
            expect(createResponse.data).toHaveProperty('data');

            const categoryId = createResponse.data.data.id;
            console.log('Catégorie créée avec ID :', categoryId);

            // Update the category description
            const updateData = {
                name_category_truck: 'TestCat-' + Date.now(),
                description: 'Catégorie test mise à jour via Jest'
            };

            console.log('Données envoyées pour la mise à jour :', updateData);

            const updateResponse = await authAxios.patch(`/admin/categories-trucks/${categoryId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            expect(updateResponse.status).toBe(200);
            expect(updateResponse.data).toHaveProperty('data');
            console.log('Catégorie mise à jour :', updateResponse.data.data);
        } catch (error) {
            console.error('Erreur lors de la création ou de la mise à jour de la catégorie', error.response?.data || error.message);
            throw error;
        }
    });

    // categories_trucks delete

    test('should login and delete a truck category', async () => {
        const form = new FormData();
        form.append('name_category_truck', 'TestCat-' + Date.now());

        const imagePath = path.resolve(__dirname, 'icone_semitrailer.jpg');
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }
        form.append('image_category_truck', fs.createReadStream(imagePath));

        try {
            // Create the category
            const createResponse = await authAxios.post('/admin/categories-trucks', form, {
                headers: {
                    ...form.getHeaders(),
                    'APP_ENV': 'testing',
                },
            });

            expect(createResponse.status).toBe(201);
            expect(createResponse.data).toHaveProperty('data');
            const categoryId = createResponse.data.data.id;

            // Delete the category
            const deleteResponse = await authAxios.delete(`/admin/categories-trucks/${categoryId}`);

            expect(deleteResponse.status).toBe(200);
            console.log('Catégorie supprimée :', categoryId);
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie', error.response?.data || error.message);
            throw error;
        }
    });
});
*/