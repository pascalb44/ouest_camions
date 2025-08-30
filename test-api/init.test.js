process.env.APP_ENV = 'testing';
require('dotenv').config({ path: '.env.testing' });

const { expect, test, beforeAll } = require('@jest/globals');
const axios = require('axios');
const BASE_URL = process.env.BASE_URL || 'http://laravel-docker:80';
const { loginAsAdmin } = require('./utils/login');
jest.setTimeout(30000);

let token;

beforeAll(async () => {
    const { token: t } = await loginAsAdmin(BASE_URL);
    token = t;
});

test('Vérifie si l\'utilisateur peut se connecter et obtenir un token', () => {
    expect(token).toBeTruthy();
});

test('Exemple : récupérer l\'env Laravel', async () => {
    const authAxios = axios.create({
        baseURL: BASE_URL,
        headers: { Authorization: `Bearer ${token}` },
    });

    const res = await authAxios.get('/check-env');
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('APP_ENV', 'testing');
});

/*
const { expect, test, describe, beforeAll } = require('@jest/globals');
const axios = require('axios');

const FormData = require('form-data');
const fs = require('fs');
const path = require('path');


const Axios = axios.create({
    //baseURL: 'http://127.0.0.1:8000/api', // no localhost for local but necessary for tests in github
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

let user = {}; // no const to modify user after
let authAxios; // for authentification

//-----------------------------
// UTILS
//-----------------------------



async function login(credentials) {

    const res = await Axios.post('/login', credentials); // request
    console.log('Réponse login:', res.data);  // <-- voir ce qui arrive
    const { user: userData, access_token } = res.data.data; // user data
    const token = access_token.token; // token
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    user = {
        ...userData,
        token,
    };
    authAxios = axios.create({
        baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });


    //console.log('Utilisateur connecté :', user); // get data user + token

    return {
        token,
        user: userData,
    };
}

*/


//-----------------------------
// TEST
//-----------------------------

/*
let token = ''; // global to stock token

describe("User Login", () => {
    test("Vérifie si l'utilisateur peut se connecter et obtenir un token", async () => {
        const credentials = {
        //    email: 'robert@transportslenantais.fr', // for users tests
        //    password: 'robert44',
            email: 'admin@ouestcamions.fr',   // for admin tests
            password: 'AdminOuest123!',
        };

        const loginResponse = await login(credentials); // login() return token

        token = loginResponse.token; // Stock token in a global to re-use

        expect(token).toBeDefined();
        expect(typeof token).toBe("string");
        expect(loginResponse.user.email).toBe('robert@transportslenantais.fr'); // verif if user is good
        //   expect(loginResponse.user.email).toBe('admin@ouestcamions.fr'); // verif if admin is good
    });
});

*/
/*

describe('Admin API - CategoryTrailer Creation with login', () => {
    test('should login and create a new trailer category', async () => {
        const credentials = {
            email: 'admin@ouestcamions.fr', // admin
            password: 'AdminOuest123!',
        };

        const loginResponse = await login(credentials);
        const token = loginResponse.token; // token after admin login

        // FormData trailer catégory
        const form = new FormData();
        form.append('name_category_trailer', 'TestCat-' + Date.now());
        form.append('description', 'Catégorie test créée via Jest');
        const imagePath = path.resolve(__dirname, 'camion_IA2.jpg');
        form.append('image_category_trailer', fs.createReadStream(imagePath));
        try {
            const response = await authAxios.post(
                '/admin/categories-trailers',
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // use token in headers
                        ...form.getHeaders(),
                    },
                }
            );

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('data');
            console.log('Catégorie créée :', response.data.data);
        } catch (error) {
            console.error('Erreur lors de la création de catégorie', error.response?.data || error.message);
            throw error;
        }
    });
});

/*


// login of the user + admin  = ok
/*

describe("User Login", () => {
    test("Verif if user can connect and have token", async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr', // for user tests
            password: 'robert44',
            // email: 'admin@ouestcamions.fr',   // for admin tests
            // password: 'AdminOuest123!',
        };

        const token = await login(credentials);

        expect(token).toBeDefined();
        expect(typeof token).toBe("string");
        expect(user.email).toBe('robert@transportslenantais.fr'); // for user tests
        // expect(user.email).toBe('admin@ouestcamions.fr'); // for admin tests
        expect(user.token).toBe(token);

    });
});


// route register = ok but with no siren file

/*
describe('Registration API', () => {
    test('should register a new user successfully', async () => {
        const form = new FormData();
        const response = await Axios.post('/register', {
            first_name: 'Henri',
            last_name: 'Depanne',
            email: 'henri@depanne.com',
            password: 'password123',
            password_confirmation: 'password123',
            company: 'Depanne 24',
            address: '123 rue de la gare',
            postal_code: '53000',
            town: 'Laval',
            phone: '123-456-7890',
        });

        expect(response.status).toBe(200);
        expect(response.data.meta.status).toBe('success');
        expect(response.data.data.user).toHaveProperty('first_name', 'Henri');
        expect(response.data.data.user).toHaveProperty('email', 'henri@depanne.com');
        expect(response.data.data.access_token).toHaveProperty('token');
    });
});
*/

/*

describe('Register API test', () => {
    test('should register a new user with siren file', async () => {
        const form = new FormData();

        form.append('first_name', 'Test');
        form.append('last_name', 'User');
        form.append('email', `testuser_${Date.now()}@example.com`);
        form.append('password', 'password123');
        form.append('company', 'TestCompany');
        form.append('address', '123 Test St');
        form.append('postal_code', '75000');
        form.append('town', 'Paris');
        form.append('phone', '0600000000');

        // fichier siren (ex: image test dans /tests/files/siren.jpg)
        const filePath = path.join(__dirname, 'files', 'extrait-kbis-entreprise.jpg');
        form.append('siren', fs.createReadStream(filePath));

        const response = await Axios.post('/register', form, {
            headers: form.getHeaders(),
        });

        expect(response.status).toBe(200);
        expect(response.data.data.user).toBeDefined();
        expect(response.data.data.user.email).toContain('testuser_');
    });
});

*/


// crud by admin : create categories-trailers = ok in the base + site local + postman but no test
/*
const fs = require('fs');
const path = require('path'); // to get image
const FormData = require('form-data'); // to get data of image
*/
/*
describe('Admin API - CategoryTrailer Creation with login', () => {
   test('should login and create a new trailer category', async () => {
       const credentials = {
           email: 'admin@ouestcamions.fr', // admin
           password: 'AdminOuest123!',
       };

       await login(credentials); // login

       // FormData
       const form = new FormData();
       form.append('name_category_trailer', 'TestCat-' + Date.now());
       form.append('description', 'Catégorie test créée via Jest');
       form.append('image_category_trailer', fs.createReadStream(path.join(__dirname, 'camion_IA2.jpg')) // image in test-api file for the tests
       );

       try {
           const response = await Axios.post(
               '/admin/categories-trailers',
               form,
               {
                   headers: {
                       ...form.getHeaders(),
                   },
               }
           );

           expect(response.status).toBe(201);
           expect(response.data).toHaveProperty('data');
           console.log('Catégorie créée :', response.data.data);
       } catch (error) {
           console.error('Erreur lors de la création de catégorie', error.response?.data || error.message);
           throw error;
       }
   });
});



// crud by admin : read categories-trailers = ok

/*


beforeAll(async () => {
    const credentials = {
        email: 'admin@ouestcamions.fr',
        password: 'AdminOuest123!',
    };
    const loginResponse = await Axios.post('/login', credentials);
    const token = loginResponse.data.data.access_token.token;

    // Configurer authAxios avec le token
    authAxios = Axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
});

describe('Admin API tests', () => {
    test('should return 200 on /admin/categories-trailers', async () => {
        const res = await authAxios.get('/admin/categories-trailers');
        expect(res.status).toBe(200);
    });
});

*/

// crud by admin : update categories-trailers


/*
let token = '';
let categoryId;

beforeAll(async () => {
    const { token: t } = await login({
        email: 'admin@ouestcamions.fr',
        password: 'AdminOuest123!',
    });
    token = t;
});
test('Vérifie si l\'utilisateur peut se connecter et obtenir un token', () => {
    expect(token).toBeTruthy();
});
test('should login, create then update the category description', async () => {
    const filePath = path.join(__dirname, 'semitrailer_rideau_3.jpg');
    expect(fs.existsSync(filePath)).toBe(true);

    // --- Création ---
    const formDataCreate = new FormData();
    formDataCreate.append('name_category_trailer', 'Remorque test');
    formDataCreate.append('description', 'Description test');
    formDataCreate.append(
        'image_category_trailer',
        fs.createReadStream(filePath)
    );

    const createResponse = await authAxios.post(

        '/admin/categories-trailers',
        formDataCreate,
        {
            headers: {
                ...formDataCreate.getHeaders(),
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log('createResponse status:', createResponse.status);
console.log('createResponse full:', createResponse.data);

    expect(createResponse.status).toBe(201);
    const categoryId = createResponse.data.data.id;
    expect(categoryId).toBeTruthy();

    // --- Mise à jour ---
    const formData = new FormData();
    formData.append('name_category_trailer', 'Remorque test mise à jour');
    formData.append('description', 'Description mise à jour via Jest');
    formData.append('image_category_trailer', fs.createReadStream(filePath));

    const updateResponse = await authAxios.patch(
        `admin/categories-trailers/${categoryId}`,
        formData,
        {
            headers: {
                ...formData.getHeaders(),
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );


    console.log('Réponse de mise à jour :', updateResponse.data);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data.message).toMatch(/mise à jour/i);
    expect(updateResponse.data.data.description).toBe('Description mise à jour via Jest');
});

*/


// crud by admin : destroy categories-trailers : ok

/*
describe('Admin API - CategoryTrailer Deletion with login', () => {
    test('should login and delete a trailer category', async () => {
        const credentials = {
            email: 'admin@ouestcamions.fr', // admin
            password: 'AdminOuest123!',
        };

        const token = await login(credentials); // get login
        const categoryId = 13; // ID of the category to delete
        try {
            const response = await authAxios.delete(
                `http://127.0.0.1:8000/api/admin/categories-trailers/${categoryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            expect(response.status).toBe(200);
            expect(response.data.status).toBe('Catégorie de remorque supprimée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie', error.response?.data || error.message);
            throw error;
        }
    });
});
*/



// crud by user : create account
// crud by user : update account


// crud by user : create cart






// crud by user : update cart
// crud by user : destroy cart

// crud by user : create order
// crud by user : update order
// crud by user : destroy order



// crud by user : create cart : ok


// test ok
/*

describe('Panier - Ajout d\'élément au panier', () => {
    test('ajoute un camion + une remorque au panier sans paiement', async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        const loginResponse = await login(credentials);
        const token = loginResponse.token;
        const authAxios = axios.create({
            baseURL: 'http://127.0.0.1:8000/api',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const payload = {
            start_date: '2025-05-25',
            end_date: '2025-07-21',
            amount: 512,
            method_payment: 'none', // no paid
            trucks: [33], // add truck in cart
            trailers: [8],
        };

        let response;

        try {
            console.log('Payload envoyé à /orders :', payload);
            response = await authAxios.post('/cart', payload);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('order');
            expect(response.data.order.trucks[0].id).toBe(33);
            console.log('Commande ajoutée au panier :', response.data.order);

        } catch (error) {
            console.error('Erreur lors de la requête /orders:', error.response?.data || error.message);
            throw error;
        }
    });
});
*/

// test ok
/*
describe("Vérification camion 33 + remorque 8 dans le panier", () => {
    test('récupérer les éléments du panier de l\'utilisateur', async () => {
        // get user cart
        const response = await authAxios.get('/cart');

        console.log('Contenu du panier :', response.data);

        // Verif if cart = truck + trailer
        expect(response.status).toBe(200);
        expect(response.data.trucks).toHaveLength(1); // less 1 truck
        expect(response.data.trucks[0].id).toBe(33); // check if truck with id 33
        expect(response.data.trailers[0].id).toBe(8); // check trailer with id 8
    });
});
*/



//  read cart of the user 5 = ok


/*
describe("Vérification d'un camion dans le panier", () => {
    test("Vérifie si le camion 33 est dans le panier de l'utilisateur 5", async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        await login(credentials);

        const res = await Axios.get('/cart'); // Requête pour récupérer les réservations en cours (panier)
        const cart = res.data;
        const camionId = 33;

        const camionDansPanier = cart.some(reservation =>
            reservation.trucks?.some(truck => truck.id === camionId)
        );

        expect(camionDansPanier).toBe(true);

        console.log(`Panier avec camion ${camionId} :`, cart.filter(reservation =>
            reservation.trucks?.some(truck => truck.id === camionId)
        ));
    });
});

*/

/*  read cart of the user = ok */
/*
        describe("User cart", () => {


            test("Vérifie si l'utilisateur a un panier non vide", async () => {
                const res = await Axios.get('/cart');

                console.log('Panier utilisateur :', res.data);

                // if orders has one element minimum
                expect(Array.isArray(res.data)).toBe(true);
                expect(res.data.length).toBeGreaterThan(0);
            });
        });

*/

/*  read all the orders of the user  = no  */


/*
describe("User orders", () => {
    test("Vérifie si l'acheteur a des commandes", async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        const token = await login(credentials);
        expect(token).toBeDefined();

        // Effectuer la requête pour récupérer les commandes de l'utilisateur
        const res = await authAxios.get('/orders');

        // Vérifier que la réponse est réussie
        expect(res.status).toBe(200); // Vérifie que le statut HTTP est 200 OK

        const orders = res.data;

        // Vérifier que l'utilisateur a des commandes
        expect(orders.length).toBeGreaterThan(0);

        // Vérifier qu'une des commandes appartient à l'utilisateur connecté
        const camionPresent = orders.some(order => order.id_user === user.id);
        expect(camionPresent).toBe(true);

        console.log('Liste des commandes du user :', orders);

        // Optionnel : vérifier les propriétés d'une commande pour être sûr de la structure
        if (orders.length > 0) {
            const order = orders[0];
            expect(order).toHaveProperty('id'); // Assurez-vous que chaque commande a un ID
            expect(order).toHaveProperty('start_date');
            expect(order).toHaveProperty('end_date');
            expect(order).toHaveProperty('amount');
        }
    });
});


*/







// if truck is in the orders of the user 5  = ok

/*
describe("Commande d'un camion spécifique", () => {
    test("Vérifie si le camion 33 est dans les commandes du user 5", async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        await login(credentials);

        const res = await Axios.get('/orders');
        const orders = res.data;
        const camionId = 33;

        const camionCommandé = orders.some(order =>
            order.trucks?.some(truck => truck.id === camionId)
        );

        expect(camionCommandé).toBe(true);

        console.log(`Commandes avec camion ${camionId} :`, orders.filter(order =>
            order.trucks?.some(truck => truck.id === camionId)
        ));
    });
});
*/



// page contacts : ok

/*
describe('API accessibility test', () => {
    test('should return status 200 for /contacts', async () => {
        const response = await Axios.get('/contacts');
        expect(response.status).toBe(200);
        console.log('page contact :', response.data); // all the messages of the users

    });
});

*/
/*
// page login : ok


describe('API accessibility test', () => {
    test('should return status 200 for /login', async () => {
        const response = await Axios.get('/login');
        expect(response.status).toBe(200);

    });
});
*/



// test to open page categories-trucks by user = ok

/* oui

describe('API accessibility test', () => {
    test('should return status 200 for /categories-trucks', async () => {
        const response = await Axios.get('/categories-trucks');
        expect(response.status).toBe(200);
    });
});


*/

// don't work in back

/*
describe('API accessibility test', () => {
    test('should return status 200 for /cgv', async () => {
        const response = await Axios.get('/cgv');
        expect(response.status).toBe(200);
    });
});

*/

// test to open public page trailers-by-category/2

/*

describe('API accessibility test', () => {
    test('should return status 200 for /trailers/category/2', async () => {
        const response = await Axios.get('/trailers-by-category/2 ');
        expect(response.status).toBe(200);
    });
});


// test to open public page categories-trucks/1 = ok



describe('API accessibility test', () => {
    test('should return status 200 for /trucks/category/1', async () => {
        const response = await Axios.get('/trucks/category/1');
        expect(response.status).toBe(200);
    });
});




// page detail

// test to open page trucks/27 = ok

*/
/*

describe('API accessibility test', () => {
    test('should return status 200 for /trucks/15', async () => {
        const response = await Axios.get('/trucks/15');
        expect(response.status).toBe(200);
        console.log('detail du truck 15 :', response.data); // data = details of the truck 15
    });
});

*/


// test to open page trailers/1 by visitor = ok  


/*
describe('API accessibility test', () => {
    test('should return status 200 for /trailers/1', async () => {
        const response = await Axios.get('/trailers/1');
        expect(response.status).toBe(200);
        console.log('detail de la remorque 1 :', response.data); // data = details of the trailer n°1 
    });
});


*/