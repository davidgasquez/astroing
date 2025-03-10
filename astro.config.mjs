// @ts-check
import { defineConfig } from 'astro/config';

import playformCompress from '@playform/compress';
import react from '@astrojs/react';

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
    integrations: [
        playformCompress({}),
        react(),
    ],
});
