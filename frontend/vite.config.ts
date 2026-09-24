import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' -> rutas relativas para que funcione publicado en
// GitHub Pages bajo cualquier subruta (https://usuario.github.io/repo/).
// En desarrollo, /api se redirige al backend (puerto 4000).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
