import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    root: './clients8',
    base: './',
    plugins: [react()],
    optimizeDeps: {
      include: ['lucide-react']  // 👈 force bundling
    },
    build: {
      outDir: 'dist'
    }
  })
  
  
  