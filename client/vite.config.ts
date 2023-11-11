import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080,
    host: '0.0.0.0',
    hmr: {
      port: 6113,
    }
  },
  build: {
    outDir: './build'
  }
})