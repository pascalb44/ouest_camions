const path = require('path');

module.exports = {
    // Charge env variables before each test
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // setup testing-library après env
    // Transforme with Babel
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },

    transformIgnorePatterns: [
        "node_modules/(?!axios|date-fns)"
    ],


    // Mock style files (css/scss)
    moduleNameMapper: {
        '\\.(css|scss|sass)$': path.resolve(__dirname, 'styleMock.js'),
        '\\.(gif|ttf|eot|svg|png|mp4)$': path.resolve(__dirname, 'fileMock.js'),
        '^axios$': require.resolve('axios/dist/node/axios.cjs')
    },

    testEnvironment: 'jsdom',
    testMatch: [
        '<rootDir>/src/unit/**/*.test.js'
    ],
};
