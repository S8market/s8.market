import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    allowedHosts: ['s8-client.onrender.com', 's8market.com', 'www.s8market.com', 'https://s8-bank-officer.onrender.com', 'https://s8test.onrender.com'],
  }
});
