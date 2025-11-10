import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/app/pages', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/app/components', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/app/layouts', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/app/hooks', import.meta.url)),
      '@providers': fileURLToPath(new URL('./src/app/providers', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/app/router', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/app/utils', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/app/lib', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/app/data', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/app/styles', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/app/types', import.meta.url))
    }
  }
})
