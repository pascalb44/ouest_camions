FROM php:8.2-apache AS base
ARG MODE=test

# Installer dépendances PHP
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

# Apache config
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

WORKDIR /var/www/app

# Installer Composer 2.8.3
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2.8.3 /usr/bin/composer /usr/local/bin/composer

# Copier composer.json pour cache Docker
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Copier le reste du code
COPY . .

# Copier le .env selon le MODE
COPY .env.${MODE} .env

# Permissions
RUN chown -R www-data:www-data /var/www/app \
    && chmod -R 775 /var/www/app/storage

# Storage link Laravel
RUN php artisan storage:link

EXPOSE 80
CMD ["apache2-foreground"]
