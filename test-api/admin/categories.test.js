process.env.APP_ENV = 'testing';
require('dotenv').config({ path: '.env.testing' });

//const BASE_URL = process.env.BASE_URL || 'http://laravel-docker:80';
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';


const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { loginAsAdmin } = require('../utils/login');
jest.setTimeout(20000);

let authAxios;
let token;


beforeAll(async () => {
    ({ token } = await loginAsAdmin(BASE_URL));
    authAxios = axios.create({
        // baseURL: process.env.BASE_URL || 'http://mysql_db:8000/api', // pour GitHub/Docker
        baseURL: `${BASE_URL}/api/admin/`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });

});


// login admin
describe('Admin API - CategoryTrailer CRUD avec login', () => {

    test('Vérifie si connection et token', () => {
        expect(token).toBeTruthy();
    });


    // CRUD for categories_trailers
    // categories_trailers create

    test('login and create a new trailer category', async () => {
        const form = new FormData();
        form.append('name_category_trailer', 'TestCat-' + Date.now());
        form.append('description', 'Catégorie test créée via Jest');

        const imagePath = path.resolve(__dirname, 'icone_semitrailer.jpg');
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }
        form.append('image_category_trailer', fs.createReadStream(imagePath));

        try {
            const response = await authAxios.post('categories-trailers', form, {
                headers: {
                    ...form.getHeaders()
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

    test('return 200 on /admin/categories-trailers', async () => {
        try {
            const response = await authAxios.get('categories-trailers');
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories', error.response?.data || error.message);
            throw error;
        }
    });

    // categories_trailers update

    test('update the category description', async () => {
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
            const createResponse = await authAxios.post('categories-trailers', form, {
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

            const updateResponse = await authAxios.patch(`categories-trailers/${categoryId}`, updateData, {
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

    test('login and delete a trailer category', async () => {
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
            const createResponse = await authAxios.post('categories-trailers', form, {
                headers: {
                    ...form.getHeaders(),
                    'APP_ENV': 'testing',
                },
            });

            expect(createResponse.status).toBe(201);
            expect(createResponse.data).toHaveProperty('data');
            const categoryId = createResponse.data.data.id;

            // Delete the category
            const deleteResponse = await authAxios.delete(`categories-trailers/${categoryId}`);

            expect(deleteResponse.status).toBe(200);
            console.log('Catégorie supprimée :', categoryId);
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie', error.response?.data || error.message);
            throw error;
        }
    });
});




// CRUD for categories_trucks
describe('Admin CategoryTruck CRUD', () => {

    test('Vérifie si connexion et token', () => {
        expect(token).toBeTruthy();   // token est maintenant défini
    });

    // categories_trucks create

    test('login and create a new truck category', async () => {
        const form = new FormData();
        form.append('name_category_truck', 'TestCat-' + Date.now());

        const imagePath = path.resolve(__dirname, 'camion_IA2.jpg');
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }
        form.append('image_category_truck', fs.createReadStream(imagePath));

        try {
            const response = await authAxios.post('categories-trucks', form, {
                headers: {
                    ...form.getHeaders()
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

    test('return 200 on /admin/categories-trucks', async () => {
        try {
            const response = await authAxios.get('categories-trucks');
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories', error.response?.data || error.message);
            throw error;
        }
    });



    // categories_trucks update

    test('login, create and update the truck category ', async () => {
        const form = new FormData();
        form.append('name_category_truck', 'TestCat-' + Date.now());
        const imagePath = path.resolve(__dirname, 'camion_IA2.jpg');

        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }

        form.append('image_category_truck', fs.createReadStream(imagePath));

        try {
            // Create the category
            const createResponse = await authAxios.post('categories-trucks', form, {
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

            const updateResponse = await authAxios.patch(`categories-trucks/${categoryId}`, updateData, {
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

    test(' login and delete a truck category', async () => {
        const form = new FormData();
        form.append('name_category_truck', 'TestCat-' + Date.now());

        const imagePath = path.resolve(__dirname, 'icone_semitrailer.jpg');
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at path: ${imagePath}`);
        }
        form.append('image_category_truck', fs.createReadStream(imagePath));

        try {
            // Create the category
            const createResponse = await authAxios.post('categories-trucks', form, {
                headers: {
                    ...form.getHeaders()
                },
            });

            expect(createResponse.status).toBe(201);
            expect(createResponse.data).toHaveProperty('data');
            const categoryId = createResponse.data.data.id;

            // Delete the category
            const deleteResponse = await authAxios.delete(`categories-trucks/${categoryId}`);

            expect(deleteResponse.status).toBe(200);
            console.log('Catégorie supprimée :', categoryId);
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie', error.response?.data || error.message);
            throw error;
        }
    });
});