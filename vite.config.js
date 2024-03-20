import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import axios from 'axios';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/Index.jsx'],
            refresh: true,
        }),
        react(),
    ],
});
