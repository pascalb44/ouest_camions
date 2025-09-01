process.env.APP_ENV = 'testing';
require('dotenv').config({ path: '.env.testing' });

const Axios = require('axios');
const { loginAsUser } = require('../utils/login');
//const BASE_URL = process.env.BASE_URL || 'http://laravel-docker:80';
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';

//Axios.defaults.baseURL = process.env.BASE_URL || 'http://laravel-docker:80';

let authAxios = null;
let cartItemId = null;

beforeAll(async () => {
  ({ authAxios } = await loginAsUser(BASE_URL));
  //axios.defaults.baseURL = BASE_URL;
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
});


// CRUD except update because the user cannot modify the cart. The user must only add or remove an item.
describe('CRUD Panier - Tests d’intégration', () => {

  let truckId;

  test('Créer un élément dans le panier', async () => {
    const payload = {

      start_date: '2025-08-08',
      end_date: '2025-08-10',
      amount: 120,
      method_payment: 'none',
      trucks: [14],
      trailers: [],
    };

    const res = await authAxios.post('/cart', payload)

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('order');
    expect(res.data.order).toHaveProperty('id');
    expect(res.data.message).toMatch(/panier enregistré/i);
    cartItemId = res.data.order.id;
  });

  test('Afficher le panier', async () => {
    const res = await authAxios.get('/cart');
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('data');
    expect(res.data.data).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        amount: expect.any(String),
        method_payment: 'none',
        start_date: expect.any(String),
        end_date: expect.any(String),
        trucks: expect.any(Array),
        trailers: expect.any(Array),
      })
    );
  });

  test('Supprimer le panier', async () => {
    const res = await authAxios.delete(`/orders/${cartItemId}`);
    expect(res.status).toBe(200);
  });
});