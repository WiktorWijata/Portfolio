import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },

  // Development server config (used by: npm run dev)
  // Different port than ClientApp (5001) so both apps can run side by side during the redesign.
  // Plain HTTP for now (no basicSsl) since this app isn't wired into Portfolio.Web's SpaProxy yet —
  // add basicSsl() back if/when that cutover happens and HTTPS is required again.
  server: {
    port: 5002,
    strictPort: true,
  },

  // Build config (used by: npm run build)
  build: {
    outDir: 'build',
    emptyOutDir: true,
    manifest: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      // Two entry points: the portfolio app (index.html) and the OrchIDE UI docs (docs.html).
      input: {
        main: resolve(__dirname, 'index.html'),
        docs: resolve(__dirname, 'docs.html'),
      },
    },
  },
})
