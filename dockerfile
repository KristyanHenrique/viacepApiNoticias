# =========================================================
# STAGE 1 - Composer
# =========================================================
FROM composer:2 AS composer

WORKDIR /var/www

COPY backend/composer.json backend/composer.lock ./

RUN composer install \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts


# =========================================================
# STAGE 2 - Backend Laravel
# =========================================================
FROM php:8.4-fpm AS backend

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql \
        gd \
        zip \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Dependências instaladas
COPY --from=composer /var/www/vendor ./vendor

# Código Laravel
COPY backend/ .

# Arquivo de ambiente
COPY backend/.env .env

# Permissões
RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache

EXPOSE 8000

CMD ["php-fpm"]


# =========================================================
# STAGE 3 - Frontend React
# =========================================================
FROM node:20 AS frontend

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

EXPOSE 3000


# =========================================================
# STAGE 4 - Nginx
# =========================================================
FROM nginx:alpine AS nginx

# Remove configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Configuração do Nginx
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Frontend React compilado
COPY --from=frontend /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]