// @ts-check
import { defineConfig } from 'astro/config';

import playformCompress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
    site: 'https://davidgasquez.github.io',
    base: 'astroing',
    prefetch: {
        prefetchAll: true,
    },
    integrations: [
        playformCompress({}),
    ],
});
