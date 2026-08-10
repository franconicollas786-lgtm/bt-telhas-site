import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Defina DISABLE_HMR=true para desativar o hot reload (útil em alguns ambientes ou proxies).
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
