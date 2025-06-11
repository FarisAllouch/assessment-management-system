import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Dev server config
    return {
      plugins: [react()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost/assessment-management-system-main',
            changeOrigin: true,
            secure: false
          }
        }
      }
    }
  } else {
    // Build config for production
    return {
      plugins: [react()],
      base: './'
    }
  }
})