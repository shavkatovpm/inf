// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import { SITE } from './src/config/site.js';
import providers from './src/data/providers.json' with { type: 'json' };

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(ROOT, 'src/content');
const SECTIONS = ['taqqoslash', 'xavfsizlik', 'qollanma'];
const LOCALES = ['uz', 'ru', 'en'];

/**
 * 'YYYY-MM-DD' → sitemap kutadigan to'liq ISO satri.
 * @param {string} day
 * @returns {string}
 */
const asLastmod = (day) => new Date(`${day}T00:00:00.000Z`).toISOString();

// Ma'lumotdan quriladigan sahifalar (bosh sahifa, narxlar, reyting, pillar'lar,
// kalkulyator, mezonlar) providers.json bilan birga yangilanadi — shuning uchun
// ularning lastmod'i tekshiruv sanasidan keladi, build vaqtidan emas.
const DATA_LAST_MODIFIED = asLastmod(providers.verifiedAt);

// Faqat qo'lda yoziladigan huquqiy matn. Kontentga bog'liq emas.
const POLICY_LAST_MODIFIED = asLastmod('2026-08-06');

/**
 * Maqolalarning lastmod sanasi frontmatterdagi `updated` dan olinadi —
 * JSON-LD `dateModified` ham aynan shu maydondan quriladi, ya'ni sitemap
 * bilan structured data hech qachon bir-biriga zid sana ko'rsatmaydi.
 *
 * Bo'lim indeksi o'sha bo'limdagi eng yangi maqola sanasini oladi.
 *
 * @returns {Map<string, string>} lokalli pathname → ISO lastmod
 */
function collectContentDates() {
  /** @type {Map<string, string>} */
  const dates = new Map();
  // 'YYYY-MM-DD' satrlari leksikografik tartibda ham to'g'ri solishtiriladi.
  /** @type {Map<string, string>} */
  const newestPerSection = new Map();

  for (const section of SECTIONS) {
    for (const locale of LOCALES) {
      const dir = path.join(CONTENT_DIR, section, locale);
      if (!fs.existsSync(dir)) continue;

      const prefix = locale === 'uz' ? '' : `/${locale}`;

      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.mdx')) continue;

        const frontmatter = fs.readFileSync(path.join(dir, file), 'utf8').split('---')[1] ?? '';
        const updated = frontmatter.match(/^updated:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m)?.[1];
        if (!updated) {
          throw new Error(`Frontmatterda "updated" yo'q yoki formati noto'g'ri: ${section}/${locale}/${file}`);
        }

        dates.set(`${prefix}/${section}/${file.replace(/\.mdx$/, '')}`, asLastmod(updated));

        const indexPath = `${prefix}/${section}`;
        const current = newestPerSection.get(indexPath);
        if (!current || updated > current) newestPerSection.set(indexPath, updated);
      }
    }
  }

  for (const [indexPath, day] of newestPerSection) dates.set(indexPath, asLastmod(day));
  return dates;
}

const CONTENT_DATES = collectContentDates();

export default defineConfig({
  site: SITE.origin,
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  // build.format ataylab berilmagan: Vercel adapteri uni 'directory' ga
  // majburlaydi, shuning uchun bu yerda qiymat berish faqat chalg'itadi.

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
        const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        const withoutLocale = pathname.replace(/^\/(ru|en)(?=\/|$)/, '') || '/';

        const lastmod = CONTENT_DATES.get(pathname)
          ?? (withoutLocale === '/data-policy' ? POLICY_LAST_MODIFIED : DATA_LAST_MODIFIED);

        return { ...item, lastmod };
      },
    }),
  ],
});
