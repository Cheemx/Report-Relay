import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target : 'https://report-relay.onrender.com/', // add your render server link
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      } 
    },
  },
  plugins: [react()],
  base:'/'
})
