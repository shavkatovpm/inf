import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, localeUrl } from '../config/site.js';
import { CONTENT_SECTIONS } from '../lib/sections';
import { VERIFIED_AT, sellersOf, starsPerUnit, premiumPrice, uzs } from '../lib/providers';

/**
 * RSS — freshness signali.
 * Data sahifalari + barcha uz maqolalari, yangilanish sanasi bo'yicha.
 */
export const GET: APIRoute = async (context) => {
  const cheapestStar = Math.min(...sellersOf('stars').map((p) => starsPerUnit(p)!));
  const cheapest12 = Math.min(
    ...sellersOf('premium').map((p) => premiumPrice(p, 12)).filter((v): v is number => v !== null),
  );

  const items: Parameters<typeof rss>[0]['items'] = [
    {
      title: `Telegram Stars va Premium narxlari yangilandi — ${VERIFIED_AT}`,
      link: localeUrl('/', 'uz'),
      pubDate: new Date(VERIFIED_AT),
      description:
        `1 Star ${uzs(cheapestStar)} so'mdan, Premium 12 oy ${uzs(cheapest12)} so'mdan. ` +
        `Taqqoslangan xizmatlar va ochiq mezonlar bo'yicha segment reytingi.`,
    },
    {
      title: 'Telegram Stars kalkulyatori',
      link: localeUrl('/kalkulyator', 'uz'),
      pubDate: new Date(VERIFIED_AT),
      description: "Kerakli miqdorni kiriting — narx barcha xizmatlar bo'yicha hisoblanadi.",
    },
  ];

  for (const section of CONTENT_SECTIONS) {
    const entries = (await getCollection(section)).filter((e: any) => e.id.startsWith('uz/'));
    for (const e of entries as any[]) {
      const slug = e.id.split('/').slice(1).join('/');
      items.push({
        title: e.data.title,
        link: localeUrl(`/${section}/${slug}`, 'uz'),
        pubDate: new Date(e.data.updated),
        description: e.data.answer,
      });
    }
  }

  items.sort((a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0));

  return rss({
    title: SITE.name,
    description: SITE.tagline.uz,
    site: context.site ?? SITE.origin,
    customData: '<language>uz-UZ</language>',
    items,
  });
};
