#  Build stage
FROM node:lts-alpine AS build-stage
ARG MODE=test

WORKDIR /app

#  Dépendances système nécessaires pour compiler certains modules
RUN apk add --no-cache python3 make g++

#  Copie des fichiers de dépendances
COPY package*.json ./


RUN npm config set registry https://registry.npmmirror.com

#  Mise à jour de npm + nettoyage du cache
RUN npm install -g npm@latest
RUN npm cache clean --force

#  Installation des dépendances avec options de résilience
RUN npm install --legacy-peer-deps --no-audit --progress=false
#RUN npm ci --no-audit --progress=false

#  Copie du reste du projet
COPY . .

#  Copie du bon fichier .env selon le mode
COPY .env.${MODE} .env

#  Build de l'application
RUN npm run build

#  Production stage
FROM nginx:alpine AS production-stage

#  Copie du build React dans Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

#  Configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
