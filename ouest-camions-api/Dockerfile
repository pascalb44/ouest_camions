# ---------- Stage de base ----------
FROM php:8.2-apache AS base
ARG MODE=test

# Install dependancies PHP
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
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Define work folder
WORKDIR /var/www/app

# Install Composer 2.8.3
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.8.3 /usr/bin/composer /usr/local/bin/composer

# Copy only what is necessary for Composer and artisan
COPY composer.json composer.lock ./
COPY bootstrap bootstrap/
COPY artisan ./

COPY .env.${MODE} .env

# Install dependancies PHP (without scripts to avoid artisan and all the code)
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts 

COPY . .

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

RUN php artisan storage:link

# Apache
EXPOSE 80

# run command
CMD ["apache2-foreground"]
