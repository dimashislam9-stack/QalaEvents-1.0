import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 5000,
    // Disable HMR websocket to avoid handshake/network issues in restricted environments
    hmr: false,
    // Proxy to backend during local development. Ensure your backend runs on port 3000.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },

    // Reduce spurious reloads on Windows/OneDrive by ignoring common noisy paths and temp files
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/.DS_Store',
        '**/Thumbs.db',
        '**/*~',
        '**/*.tmp',
        '**/~*',
        '**/public/**',
        '**/*-journal',
        '**/OneDrive/**'
      ]
    }
  },
  build: {
    outDir: 'dist'
  }
})