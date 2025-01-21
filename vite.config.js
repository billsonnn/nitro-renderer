// vite.config.js
import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        typescript({
            'target': 'es6',
            'rootDir': './src',
            'declaration': true,
            exclude: './node_modules/**',
            allowSyntheticDefaultImports: true
        })
    ],
    build: {
        lib: {
            entry: resolve('./src/index.ts'),
            name: 'nitro-renderer',
            formats: ['es', 'cjs'],
            fileName: format => `nitro-renderer.${format}.js`
        }
    },
    server: {
        host: '127.0.0.1'
    }
});
