# Étape 1 : Build React
FROM node:lts-alpine AS build-stage

WORKDIR /app

# Configuration NPM (without clean cache)
RUN npm config set registry https://registry.npmjs.org

# Copy dependancies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps --no-audit --progress=false

# Copy rest of project
COPY . .

# Build application
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine AS production-stage

# Copy build React to Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# ustom Nginx configuration (if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

