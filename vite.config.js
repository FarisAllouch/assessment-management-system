import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'serve' ? '/' : '/',
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
})
