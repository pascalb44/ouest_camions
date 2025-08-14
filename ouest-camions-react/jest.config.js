const path = require('path');

module.exports = {
    // Charge les variables d'environnement avant chaque test
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // setup testing-library après env
    // Transformer avec Babel (tu dois avoir un babel.config.js ou .babelrc configuré)
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },

    transformIgnorePatterns: [
        '/node_modules/(?!(axios|date-fns)/)', 
    ],

    // Mock les fichiers styles (css/scss)
    moduleNameMapper: {
        '\\.(css|scss|sass)$': path.resolve(__dirname, 'styleMock.js'),
        '\\.(gif|ttf|eot|svg|png|mp4)$': path.resolve(__dirname, 'fileMock.js'),
    },

    testEnvironment: 'jsdom', 
};
