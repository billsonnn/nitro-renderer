// vite.config.js
import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

const resolvePath = str => resolve(__dirname, str);

export default defineConfig({
    plugins: [
        typescript({
            'target': 'es6',
            'rootDir': resolvePath('./src'),
            'declaration': true,
            exclude: resolvePath('./node_modules/**'),
            allowSyntheticDefaultImports: true
        }),
        ViteMinifyPlugin()
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'nitro-renderer',
            fileName: 'nitro-renderer'
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '~': resolve(__dirname, 'node_modules')
        }
    },
    server: {
        host: '127.0.0.1'
    }
});
