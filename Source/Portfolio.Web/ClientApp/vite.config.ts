import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        basicSsl()
    ],
    
    // Development server config (used by: npm run dev)
    // Active only during local development WITHOUT Docker
    // ASP.NET Core SpaProxy connects to this server
    server: {
        port: 5001,
        strictPort: true
        // HTTPS provided by basicSsl() plugin
    },
    
    // Build config (used by: npm run build)
    // Active during Docker build and production deployments
    // Outputs static files to be served by ASP.NET Core
    build: {
        outDir: 'build',        // Output directory (copied to wwwroot in Docker)
        emptyOutDir: true,      // Clean directory before build
        manifest: true,         // Generate manifest.json for asset tracking
        assetsInlineLimit: 4096 // Inline assets smaller than 4KB as base64 (includes SVG icons)
    }
})