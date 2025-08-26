// client/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to avoid CORS issues during development
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})