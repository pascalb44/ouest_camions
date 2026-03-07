const { overrideDevServer } = require('customize-cra');

module.exports = {
  webpack: function (config, env) {
    return config;
  },
  devServer: overrideDevServer(
    (config) => {
      // Supprime les options obsolètes
      delete config.onAfterSetupMiddleware;
      delete config.onBeforeSetupMiddleware;
      delete config.https; // <-- Supprime l'option https non supportée

      // Ajoute la nouvelle option setupMiddlewares
      config.setupMiddlewares = (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
        const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
        const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
        const paths = require('react-scripts/config/paths');

        middlewares.push(
          evalSourceMapMiddleware(devServer),
          redirectServedPath(paths.publicUrlOrPath),
          noopServiceWorkerMiddleware(paths.publicUrlOrPath)
        );
        return middlewares;
      };
      return config;
    }
  )
};
