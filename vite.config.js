import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      '/rides': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }, 
      '/drivers': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/users': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
    }    
  }

})
