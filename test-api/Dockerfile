FROM node:lts-alpine

WORKDIR /app

# Configuration npm pour éviter erreurs tarballs
RUN npm config set registry https://registry.npmjs.org

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer dépendances avec legacy-peer-deps
RUN npm install --legacy-peer-deps --no-audit --progress=false

# Copier le reste des fichiers test-api
COPY . .

# Commande par défaut pour lancer les tests d'intégration
CMD ["npm", "run", "test:integration"]
