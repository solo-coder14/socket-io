import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 3000,
    proxy: {
      '/products': {
        target: BACKEND_URL,
        changeOrigin: true,
      },
      '/socket.io': {
        target: BACKEND_URL,
        changeOrigin: true,
        ws: true,
      }
    }
  },
})
