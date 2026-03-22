import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({plugins: [
    tailwindcss(), sveltekit(), SvelteKitPWA({
      outDir: 'build',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        globDirectory: 'build',
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/_app\//],
      },
      manifest: {
        name: 'SigmaControl',
        short_name: 'Control',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
      }
    })
]});
