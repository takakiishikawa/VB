#!/bin/bash
cd /home/site/wwwroot
echo "Starting application"
php artisan config:cache
php artisan route:cache