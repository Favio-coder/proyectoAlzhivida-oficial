import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',  // carpeta de tu código fuente
      extension: ['.js', '.jsx', '.ts', '.tsx'],  // extensiones a instrumentar
      cypress: true,   // habilita soporte para Cypress
      requireEnv: false,  // instrumentar siempre, no solo si env está activo
    }),
  ],
  server: {
    port: 5173,
    cors: true, 
  },
})
