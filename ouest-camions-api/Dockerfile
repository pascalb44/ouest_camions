FROM php:8.2-apache
ARG MODE=test
 
# Install dépendancies PHP
RUN apt-get update && apt-get install -y \ 
    libfreetype-dev \ 
    libjpeg62-turbo-dev \ 
    libpng-dev \ 
    zlib1g-dev \ 
    libzip-dev \ 
    unzip \ 
    && docker-php-ext-configure gd --with-freetype --with-jpeg \ 
    && docker-php-ext-install -j$(nproc) gd \ 
    && docker-php-ext-install zip \ 
    && docker-php-ext-install mysqli pdo pdo_mysql 
 
# Copy file to conteneur
COPY . /var/www/app 

# current repertory
WORKDIR /var/www/app 

# Copy of environement
COPY .env.${MODE} .env
COPY vhost.conf /etc/apache2/sites-available/000-default.conf 
 
RUN a2enmod rewrite 
 
RUN chown -R www-data:www-data /var/www/app \ 
    && chmod -R 775 /var/www/app/storage 

RUN chown -R www-data:www-data /var/www/app/storage

# Install composer
# Configure environement variable
ENV COMPOSER_ALLOW_SUPERUSER=1 
COPY --from=composer:2.6.5 /usr/bin/composer /usr/local/bin/composer 
 
# Install dependencies
COPY composer.json ./ 
RUN composer install
RUN php artisan storage:link