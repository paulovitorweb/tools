import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        portal: resolve(import.meta.dirname, 'index.html'),
        crontab: resolve(import.meta.dirname, 'tools/crontab/index.html'),
        imc: resolve(import.meta.dirname, 'tools/imc/index.html'),
        timestamp: resolve(import.meta.dirname, 'tools/timestamp/index.html'),
        jwt: resolve(import.meta.dirname, 'tools/jwt/index.html'),
        uuid: resolve(import.meta.dirname, 'tools/uuid/index.html'),
        hashes: resolve(import.meta.dirname, 'tools/hashes/index.html'),
        senhas: resolve(import.meta.dirname, 'tools/senhas/index.html'),
        diff: resolve(import.meta.dirname, 'tools/diff/index.html'),
        lorem: resolve(import.meta.dirname, 'tools/lorem/index.html'),
        caracteres: resolve(import.meta.dirname, 'tools/caracteres/index.html'),
        kafka: resolve(import.meta.dirname, 'tools/kafka/index.html'),
        json: resolve(import.meta.dirname, 'tools/json/index.html'),
        pixEndToEnd: resolve(import.meta.dirname, 'tools/pix-end-to-end/index.html'),
        sortearNumeros: resolve(import.meta.dirname, 'tools/sortear-numeros/index.html'),
        sortearNomes: resolve(import.meta.dirname, 'tools/sortear-nomes/index.html'),
      },
    },
  },
});
