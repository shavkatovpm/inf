// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import { SITE } from './src/config/site.js';

// Sitemapdagi sana build vaqtini emas, mazmunning haqiqiy yangilanishini bildiradi.
const DATA_LAST_MODIFIED = new Date('2026-08-05T00:00:00.000Z');
const POLICY_LAST_MODIFIED = new Date('2026-08-06T00:00:00.000Z');

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
      serialize(item) {
        const pathname = new URL(item.url).pathname
          .replace(/^\/(ru|en)(?=\/|$)/, '') || '/';
        const isPolicy = /\/(data-policy|qollanma\/visa-siz-telegram-stars)$/.test(pathname);
        return { ...item, lastmod: isPolicy ? POLICY_LAST_MODIFIED : DATA_LAST_MODIFIED };
      },
    }),
  ],
});
