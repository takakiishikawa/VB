#!/bin/bash
cd /home/site/wwwroot
php artisan config:cache
php artisan route:cache