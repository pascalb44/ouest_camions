const { expect, test, describe, beforeAll } = require('@jest/globals');
const axios = require('axios');

const FormData = require('form-data');
const fs = require('fs');
const path = require('path');


const Axios = axios.create({
    baseURL: 'http://localhost:8000/api', /* no localhost for local but necessary for tests in github */
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

let user = {}; /* no const to modify user after */
let authAxios; // for authentification

//-----------------------------
// UTILS 
//-----------------------------



async function login(credentials) {
   
        const res = await Axios.post('/login', credentials); // request 
        const { user: userData, access_token } = res.data.data; // user data 
        const token = access_token.token; // token  
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        user = {
            ...userData,
            token,
        };
        authAxios = axios.create({
            baseURL: 'http://127.0.0.1:8000/api',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        

        //console.log('Utilisateur connecté :', user); // get data user + token 

        return token;
    
}




//-----------------------------
// TEST 
//-----------------------------




// login of the user + admin  = ok


describe("User Login", () => {
    test("Vérifie si l'utilisateur peut se connecter et obtenir un token", async () => {
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


// route register = ok but ni siren

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

// crud by admin : create categories-trailers = ok in the base 
/*
const fs = require('fs'); 
const path = require('path'); // to get image 
const FormData = require('form-data'); // to get data of image

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
*/

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
    const loginResponse = await Axios.post('http://127.0.0.1:8000/api/login', {
        email: 'admin@ouestcamions.fr',
        password: 'AdminOuest123!',
    });

    if (loginResponse.status === 200 && loginResponse.data.token) {
        token = loginResponse.data.token;
    } else {
        throw new Error('Token non reçu dans la réponse ou requête de login échouée');
    }
});

test('Vérifie si l\'utilisateur peut se connecter et obtenir un token', () => {
    expect(token).toBeTruthy();
});

test('should login, create then update the category description', async () => {
    const createResponse = await authAxios.post(
        'http://127.0.0.1:8000/api/admin/categories-trailers',
        {
            name_category_trailer: 'Remorque test',
            description: 'Description test',
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    expect(createResponse.status).toBe(200);
    categoryId = createResponse.data.data.id_category_trailer;
    expect(categoryId).toBeTruthy();

    const filePath = path.join(__dirname, 'semitrailer_rideau_3.jpg');
    expect(fs.existsSync(filePath)).toBe(true);

    const formData = new FormData();
    formData.append('name_category_trailer', 'Remorque test mise à jour');
    formData.append('description', 'Description mise à jour via Jest');
    formData.append(
        'image_category_trailer',
        fs.createReadStream(filePath)
    );

    const updateResponse = await authAxios.patch(
        `http://127.0.0.1:8000/api/admin/categories-trailers/${categoryId}`,
        formData,
        {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${token}`,
            },
        }
    );

    console.log('Réponse de mise à jour :', updateResponse.data);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data.message).toMatch(/mise à jour/i);  // Vérifie le champ message ou adapte selon la réponse
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



// crud by user : create cart


/*
describe('Commande - Ajouter un camion au panier', () => {
    test('devrait créer une commande avec le camion 33', async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        await login(credentials);

        const payload = {
            start_date: '2025-05-12',
            end_date: '2025-05-14',
            amount: 650,
            method_payment: 'none',
            trucks: [33],
            trailers: [],
        };
    
            console.log('Payload envoyé à /cart :', payload);
            await authAxios.post('/cart', payload); 

            const response = await authAxios.get('/cart');     
           

            expect(response.status).toBe(200);
            const lastOrder = response.data[response.data.length - 1];
            expect(lastOrder.trucks[0].truck).toBe(33); // Verif if truck 33 is in the order

            console.log('Réponse brute:', JSON.stringify(response.data, null, 2));
        
    });
});
*/

/*

describe('Panier - Ajout d\'élément au panier', () => {
    test('devrait ajouter un camion au panier sans paiement', async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        await login(credentials); 

        const payload = {
            start_date: '2025-05-01',
            end_date: '2025-05-03',
            amount: 805, 
            method_payment: 'none', // Sans paiement
            trucks: [28], // Ajouter un camion dans le panier
            trailers: [], 
        };
        
            console.log('Payload envoyé à /orders :', payload);
            const response = await authAxios.post('/orders', payload);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('order');
            expect(response.data.order.trucks[0].id_truck).toBe(28); // Vérifie que le camion a bien été ajouté au panier
            console.log('Commande ajoutée au panier :', response.data.order);
       
    });

    test('devrait récupérer les éléments du panier de l\'utilisateur', async () => {
        // Récupérer le panier de l'utilisateur connecté
        const response = await authAxios.get('/cart');

        console.log('Contenu du panier :', response.data);

        // Vérifie que le panier contient au moins un camion
        expect(response.status).toBe(200);
        expect(response.data.trucks).toHaveLength(1); // Le panier doit contenir un camion
        expect(response.data.trucks[0].id_truck).toBe(28); // Vérifie que c'est bien le camion avec l'ID 28
    });
});

*/

//  read cart of the user 5 = ok 

/*

describe("Vérification d'un camion dans le panier", () => {
    test("Vérifie si le camion 28 est dans le panier de l'utilisateur 5", async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        await login(credentials);

        const res = await Axios.get('/cart'); // Requête pour récupérer les réservations en cours (panier)
        const cart = res.data;
        const camionId = 28;

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

/*  read all the orders of the user  = ok  */
/*

describe("User orders", () => {
    test("Vérifie si l'acheteur a des commandes", async () => {
        const credentials = {
//            email: 'ulysse31@odyssee.fr',
  //          password: 'ulysse31',

             email: 'robert@transportslenantais.fr', // id user = 5
             password: 'robert44',
        };

        await login(credentials);

        const res = await Axios.get('/orders');
        const orders = res.data;

        expect(orders.length).toBeGreaterThan(0);

        const camionPresent = orders.some(item => item.id_user === 123); // id of the user
        expect(camionPresent).toBe(true);

        console.log('List des commandes du user  :', orders);
    });
});*

*/







// if truck 28 is in the orders of the user 5  = ok

/*
describe("Commande d'un camion spécifique", () => {
    test("Vérifie si le camion 28 est dans les commandes du user 5", async () => {
        const credentials = {
            email: 'robert@transportslenantais.fr',
            password: 'robert44',
        };

        await login(credentials);

        const res = await Axios.get('/orders');
        const orders = res.data;
        const camionId = 28;

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



describe('API accessibility test', () => {
    test('should return status 200 for /trucks/27', async () => {
        const response = await Axios.get('/trucks/27');
        expect(response.status).toBe(200);
        console.log('detail du truck 27 :', response.data); // data = details of the truck 27 

    });
});




// test to open page trailers/1 by visitor = ok  



describe('API accessibility test', () => {
    test('should return status 200 for /trailers/1', async () => {
        const response = await Axios.get('/trailers/1');
        expect(response.status).toBe(200);
        console.log('detail de la remorque 1 :', response.data); // data = details of the trailer n°1 
    });
});

*/

