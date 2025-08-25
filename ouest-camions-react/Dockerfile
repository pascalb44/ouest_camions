# Étape 1 : Build React
FROM node:lts-alpine AS build-stage

WORKDIR /app

# Configuration NPM (sans nettoyage du cache)
RUN npm config set registry https://registry.npmjs.org

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install --legacy-peer-deps --no-audit --progress=false

# Copie du reste du projet
COPY . .

# Build de l'application
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine AS production-stage

# Copie du build React vers Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# Configuration Nginx personnalisée (si nécessaire)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
