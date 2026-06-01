import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/' בפיתוח (localhost:5173), יחסי ('./') בבנייה כדי שיעבוד ב-GitHub Pages
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? './' : '/',
}));
