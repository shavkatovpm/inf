import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Kontent kolleksiyalari.
 *
 * Fayl tuzilmasi: src/content/<bo'lim>/<locale>/<slug>.mdx
 * `id` shundan `<locale>/<slug>` ko'rinishida chiqadi, marshrutlar
 * shu bo'yicha filtrlanadi — hreflang pariteti buzilsa build'da ko'rinadi.
 */

const articleSchema = z.object({
  title: z.string(),
  /** <title> uchun — bo'lmasa title ishlatiladi. */
  metaTitle: z.string().optional(),
  description: z.string(),
  /** Fold ustidagi to'g'ridan-to'g'ri javob. AEO uchun majburiy. */
  answer: z.string(),
  published: z.string(),
  updated: z.string(),
  /** Bo'limlar ichida tartib. */
  order: z.number().default(100),
  /** CTA mahsuloti; umumiy/xavfsizlik maqolalarida stars default. */
  product: z.enum(['stars', 'premium', 'gifts']).default('stars'),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  /** HowTo schema uchun — bo'lsa qadamlar qo'shiladi. */
  steps: z.array(z.object({ name: z.string(), text: z.string() })).default([]),
});

const taqqoslash = defineCollection({
  loader: glob({ base: './src/content/taqqoslash', pattern: '**/*.mdx' }),
  schema: articleSchema,
});

const xavfsizlik = defineCollection({
  loader: glob({ base: './src/content/xavfsizlik', pattern: '**/*.mdx' }),
  schema: articleSchema,
});

const qollanma = defineCollection({
  loader: glob({ base: './src/content/qollanma', pattern: '**/*.mdx' }),
  schema: articleSchema,
});

export const collections = { taqqoslash, xavfsizlik, qollanma };
