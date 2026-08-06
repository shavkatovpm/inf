// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import { SITE } from './src/config/site.js';

export default defineConfig({
  site: SITE.origin,
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: { format: 'file' },

  // uz — prefikssiz (default), ru/en — prefiksli.
  // hreflang teglari Layout.astro da qo'lda quriladi, chunki bizga
  // uz|ru|en|x-default to'liq to'plami kerak.
  i18n: {
    defaultLocale: 'uz',
    locales: ['uz', 'ru', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    mdx(),
    sitemap({
      // Data sahifalari tez-tez yangilanadi — freshness signali GEO uchun muhim.
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        if (/\/(narxlar|kalkulyator)(\/|$)/.test(item.url)) {
          item.changefreq = 'daily';
          item.priority = 0.9;
        } else if (/\/(reyting|taqqoslash)(\/|$)/.test(item.url)) {
          item.priority = 0.9;
        } else if (item.url.replace(SITE.origin, '').replace(/\/(ru|en)/, '') === '/') {
          item.priority = 1.0;
        }
        return item;
      },
    }),
  ],
});
