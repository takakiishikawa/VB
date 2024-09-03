#!/bin/bash
cd /home/site/wwwroot
php artisan config:cache
php artisan route:cache
# php-fpm is usually started by Azure, but we'll include it just in case
php-fpm