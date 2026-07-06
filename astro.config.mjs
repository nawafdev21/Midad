// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  // TODO: بدّل هذا بالدومين المخصص بعد ربطه لاحقاً.
  site: 'https://midad-zeta.vercel.app',

  // server عشان لوحة /keystatic تشتغل — كل صفحات الموقع العادية
  // معلّمة يدوياً بـ prerender = true عشان تضل مبنية Static.
  output: 'server',

  integrations: [sitemap(), react(), markdoc(), keystatic()],
  adapter: vercel()
});