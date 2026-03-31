# ---- Backend: Laravel + PHP 8.4 ----
FROM php:8.4-cli AS backend

# Dependencias del sistema
RUN apt-get update && apt-get install -y \
    git unzip curl sqlite3 libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Instalar dependencias PHP primero (cache de Docker layers)
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-interaction --prefer-dist

# Copiar el resto del proyecto
COPY . .

# Generar autoload optimizado y ejecutar scripts post-install
RUN composer dump-autoload --optimize

# Crear base de datos SQLite y directorio de storage
RUN mkdir -p database storage/app storage/framework/{cache,sessions,testing,views} storage/logs \
    && touch database/database.sqlite \
    && chmod -R 775 storage database

# Generar app key si no existe y JWT secret
RUN php artisan key:generate --force || true
RUN php artisan jwt:secret --force || true

# Correr migrations
RUN php artisan migrate --force || true

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
