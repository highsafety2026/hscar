import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-admin',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'admin.html')
      }
    }
  },
  server: {
    port: 5001,
    host: true
  }
})
