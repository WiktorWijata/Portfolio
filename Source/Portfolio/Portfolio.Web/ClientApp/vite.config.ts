import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
// `vitest/config` re-exports Vite's `defineConfig` typed with the extra `test` field below (used by
// `npm run test`) — plain `vite`/`vite build` ignore that field, so one config file covers both.
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],

  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },

  // Vitest config (used by: npm run test). `css: true` actually processes .css files instead of Vitest's
  // default empty-module stub — needed because src/docs/api/tokens.ts reads theme CSS via `?raw` imports;
  // stubbed-empty files would silently make every token lookup return nothing.
  test: {
    css: true,
  },

  // Development server config (used by: npm run dev)
  // Port and HTTPS (via basicSsl()) match Portfolio.Web.csproj's SpaProxyServerUrl, so `dotnet run`
  // can proxy to this dev server.
  server: {
    port: 5001,
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
