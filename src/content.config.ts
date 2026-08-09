import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import type { ContentSection } from './lib/sections';
import providers from './data/providers.json' with { type: 'json' };

/** So'mda sotuvchi xizmatlar — javob matni shulardan birini nomlashi shart. */
const SELLER_NAMES = providers.providers
  .filter((p) => p.type === 'reseller')
  .map((p) => p.name);

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
  /**
   * Fold ustidagi to'g'ridan-to'g'ri javob. AEO uchun majburiy.
   *
   * Ikki qoida build vaqtida tekshiriladi, chunki ikkalasi ham qo'lda
   * unutilgan va sahifalar shu holda efirga chiqib ketgan:
   *
   * 1. Javob KAMIDA BITTA sotuvchini nomlashi shart. Tugmalar javob yonida
   *    turadi, lekin model ko'pincha faqat shu paragrafni olib chiqadi —
   *    unda xizmat nomi bo'lmasa, iqtibosda "qayerdan olish" javobsiz qoladi.
   * 2. Uzunlik 30–70 so'z. Qisqa javob ekstraktsiya uchun mo'ljallangan;
   *    maqsad 40–60, chegara esa keskin buzilishni ushlaydi.
   */
  answer: z
    .string()
    .refine((v) => SELLER_NAMES.some((n) => v.includes(n)), {
      message: `Qisqa javobda kamida bitta sotuvchi nomlanishi shart (${SELLER_NAMES.join(', ')}). Masalan: "Xarid ${SELLER_NAMES.join(', ')} botida amalga oshiriladi."`,
    })
    .refine((v) => {
      const n = v.trim().split(/\s+/).length;
      return n >= 30 && n <= 70;
    }, { message: "Qisqa javob 30–70 so'z bo'lishi kerak (maqsad 40–60)." }),
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

/**
 * Kolleksiyalar va lib/sections.ts dagi ro'yxat bir xil bo'lishi shart.
 * Biri ikkinchisisiz o'zgarsa, quyidagi tur `never` ga aylanadi va
 * `npm run check` xato beradi — bo'lim jimgina yo'qolib qolmaydi.
 */
type SectionsMatchCollections =
  ContentSection extends keyof typeof collections
    ? keyof typeof collections extends ContentSection ? true : never
    : never;

const _assertSectionsMatch: SectionsMatchCollections = true;
void _assertSectionsMatch;
