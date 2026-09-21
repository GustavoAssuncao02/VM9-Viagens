import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: '/VM9-Viagens/',
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5175, strictPort: true },
});
