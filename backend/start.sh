#!/bin/sh

set -e

PORT=${PORT:-8000}

echo "Starting Estele Laravel application on port $PORT"

sed -i "s/listen 8000;/listen $PORT;/" /etc/nginx/sites-available/default

php artisan config:clear
php artisan cache:clear

php artisan storage:link || true

php artisan migrate --force

# Seed database when explicitly enabled
if [ "${RUN_SEEDERS:-false}" = "true" ]; then
    echo "Running database seeders..."
    php artisan db:seed --force
    echo "Database seeders completed."
fi

php artisan config:cache

php-fpm -D

nginx -g "daemon off;"
