import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// host: true => dev server same WiFi par phone se khulta hai
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
})
