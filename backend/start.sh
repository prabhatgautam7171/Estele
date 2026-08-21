#!/bin/sh

set -e

PORT=${PORT:-8000}

echo "Starting Estele Laravel application on port $PORT"

sed -i "s/listen 8000;/listen $PORT;/" /etc/nginx/sites-available/default

php artisan config:clear
php artisan cache:clear

php artisan storage:link || true

php artisan migrate --force

php artisan config:cache

php-fpm -D

nginx -g "daemon off;"
