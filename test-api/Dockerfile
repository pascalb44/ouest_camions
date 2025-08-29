# Étape 1 : image Node
FROM node:lts-alpine

# work folder
WORKDIR /app

# Configuration npm pour éviter problèmes de tarballs
RUN npm config set registry https://registry.npmjs.org
RUN npm config set cache /tmp/npm-cache --global

# Copier uniquement package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances de façon tolérante
RUN npm ci --legacy-peer-deps --no-audit --prefer-offline --no-fund \
  && chmod +x node_modules/.bin/jest 

# Copier le reste des fichiers du projet
COPY . .

# juste avant de lancer les tests
RUN mkdir -p /app/storage/logs && chmod -R 777 /app/storage

# Commande par défaut : lancer les tests d'intégration
CMD ["npm", "run", "test:integration"]
