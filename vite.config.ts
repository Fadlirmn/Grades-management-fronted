import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Simulasi __dirname untuk ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  root:'',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ ke folder src
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Dukungan asset
  assetsInclude: ['**/*.svg', '**/*.csv'],
})