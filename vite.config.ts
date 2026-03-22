import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({plugins: [
    tailwindcss(), sveltekit(), SvelteKitPWA({
      outDir: 'build',
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [{
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
            networkTimeoutSeconds: 3,
          }
        }]
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
