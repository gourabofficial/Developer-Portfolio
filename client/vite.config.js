import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
    server: {
    host: '0.0.0.0', // This allows external connections
    port: 5173, // Default Vite port (you can change this if needed)
  },
})