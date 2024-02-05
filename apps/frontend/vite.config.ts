/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // local api
        changeOrigin: true,
      }
    }
  },

  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: 'v8',
      reporter: ["text", "html"],
    },
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    setupFiles: "./src/test/setupTests.ts",
  },

  plugins: [react()],
})
