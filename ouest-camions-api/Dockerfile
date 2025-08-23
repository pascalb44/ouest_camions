# ---------- Stage de base ----------
FROM php:8.2-apache AS base
ARG MODE=test

# Installer les dépendances PHP
RUN apt-get update && apt-get install -y \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install zip \
    && docker-php-ext-install mysqli pdo pdo_mysql

# Config Apache
COPY .env.testing /var/www/app/.env
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Définir le répertoire de travail
WORKDIR /var/www/app

# Installer Composer 2.8.3
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.8.3 /usr/bin/composer /usr/local/bin/composer

# Copier uniquement ce qui est nécessaire pour Composer et artisan
COPY composer.json composer.lock ./
COPY bootstrap bootstrap/
COPY artisan ./

# Copier le bon .env selon le MODE
# MODE=test => .env.testing
# MODE=prod => .env.prod
COPY .env.${MODE} .env

# Installer les dépendances PHP (sans scripts pour éviter artisan qui nécessite tout le code)
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts 

# Copier le reste du code
COPY . .

# Permissions
RUN chown -R www-data:www-data /var/www/app \
    && chmod -R 775 /var/www/app/storage

# Créer le lien storage de Laravel
RUN php artisan storage:link

# Exposer le port Apache
EXPOSE 80

# Commande de lancement
CMD ["apache2-foreground"]
