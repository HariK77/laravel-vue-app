import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        vue({
            refresh: true,
        }),
        laravel({
            input: ['resources/sass/app.scss', 'resources/js/index.js'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@Pages": resolve(__dirname, "./resources/js/pages"),
            "@Api": resolve(__dirname, "./resources/js/api"),
            "@Components": resolve(__dirname, "./resources/js/components"),
            "@Utils": resolve(__dirname, "./resources/js/utils"),
            "@Helpers": resolve(__dirname, "./resources/js/helpers"),
            "@Store": resolve(__dirname, "./resources/js/store"),
        }
    }
});
