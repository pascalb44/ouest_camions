const Axios = require('axios');
const { loginAsUser } = require('../utils/login');

Axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

let token = '';
let cartItemId = null;

beforeAll(async () => {
  token = await loginAsUser();
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
});


// CRUD except update because the user cannot modify the cart. The user must only add or remove an item.
describe('CRUD Panier - Tests d’intégration', () => {

  let truckId;

  test('Créer un élément dans le panier', async () => {
    try {
      const res = await Axios.post('/cart', {

        start_date: '2025-08-08',
        end_date: '2025-08-10',
        amount: 300,
        trucks: [14],
        trailers: [],
      });

      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('order');
      expect(res.data.order).toHaveProperty('id');
      expect(res.data.message).toMatch(/panier enregistré/i);
      cartItemId = res.data.order.id;
    }
    catch (error) {
      console.error('Erreur POST /cart:', error.response?.data || error.message);
      throw error;
    }
  });

  test('Récupérer les éléments du panier', async () => {
    const res = await Axios.get('/cart');
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

  truckId = 14; 
  test('Supprimer un camion du panier', async () => {
  const res = await Axios.delete(`/cart/${truckId}`); 
  expect(res.status).toBe(200);
  expect(res.data.message).toMatch(/supprimé/i);
  });

});
