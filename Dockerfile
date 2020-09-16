FROM php:7.4-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN apt-get update && \
    apt-get install -y libxml2-dev

RUN a2enmod rewrite

RUN a2enmod headers

COPY . /var/www/html/

# Use custom php.ini
COPY ./custom-php.ini /usr/local/etc/php/conf.d/custom-php.ini
