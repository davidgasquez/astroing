// @ts-check
import { defineConfig } from 'astro/config';

import playformCompress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
    site: 'https://davidgasquez.github.io',
    base: '/astroing',
    prefetch: {
        prefetchAll: true,
    },
    trailingSlash: "never",
    build: {
        format: 'file',
    },
    // Avoid Vite pre-bundling Chart.js in dev; prevents stale optimized-dep 504s
    vite: {
        optimizeDeps: {
            exclude: ["chart.js", "chart.js/auto"],
        },
    },
    integrations: [
        playformCompress({}),
    ],
});
