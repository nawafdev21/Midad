// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: بدّل هذا بالدومين الفعلي بعد ربطه.
  site: 'https://midad.example',
  integrations: [sitemap()]
});