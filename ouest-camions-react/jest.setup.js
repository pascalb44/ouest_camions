// jest.setup.js
require('dotenv').config({ path: '.env.testing' });
require('@testing-library/jest-dom');

// Mocks to avoid bugs in node_modules
jest.mock('axios');
jest.mock('date-fns/locale', () => ({ fr: {} }));