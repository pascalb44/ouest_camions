FROM node:lts-alpine

WORKDIR /app


# Configuration npm pour éviter erreurs tarballs
RUN npm config set registry https://registry.npmjs.org

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

RUN npm cache clean --force

# Installer dépendances avec legacy-peer-deps
RUN npm ci --legacy-peer-deps --no-audit --prefer-offline --no-fund

# Copier le reste des fichiers test-api
COPY . .

# Commande par défaut pour lancer les tests d'intégration
CMD ["npm", "run", "test:integration"]
