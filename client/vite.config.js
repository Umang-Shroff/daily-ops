import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: 'https://daily-ops.onrender.com/',
        changeOrigin: true,
      },
    }
  },
  build: {
    outDir: 'dist'
  },
  server: {
    historyApiFallback: true
  }
})
