/**
 * JSON-LD node yasovchi yordamchilar.
 * Barchasi sof funksiya — sahifalar shu yerdan node yig'ib Schema.astro ga beradi.
 */
import { SITE, localeUrl } from '../config/site.js';
import type { Locale } from '../i18n/ui';
import { type Provider, type ProductId, starsPerUnit, premiumPrice } from './providers';

const ORG_ID = `${SITE.origin}/#organization`;
const SITE_ID = `${SITE.origin}/#website`;

export function organizationNode(locale: Locale) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.origin,
    description: SITE.tagline[locale],
    email: SITE.email,
    // Nashr sifatida pozitsiya — sotuvchi emas.
    knowsAbout: ['Telegram Stars', 'Telegram Premium', 'Telegram Gifts', 'Uzbekistan'],
  };
}

export function websiteNode(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    url: SITE.origin,
    publisher: { '@id': ORG_ID },
    description: SITE.tagline[locale],
  };
}

export function breadcrumbNode(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: localeUrl(item.path, locale),
    })),
  };
}

export function articleNode(opts: {
  locale: Locale;
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: localeUrl(opts.path, opts.locale),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

/** Bo'lim indekslari maqola emas — ular materiallar kolleksiyasidir. */
export function collectionPageNode(opts: {
  locale: Locale;
  name: string;
  description: string;
  path: string;
  mainEntity?: Record<string, unknown>;
}) {
  return {
    '@type': 'CollectionPage',
    '@id': `${localeUrl(opts.path, opts.locale)}#collection`,
    name: opts.name,
    description: opts.description,
    url: localeUrl(opts.path, opts.locale),
    isPartOf: { '@id': SITE_ID },
    ...(opts.mainEntity ? { mainEntity: opts.mainEntity } : {}),
  };
}

export function faqNode(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    })),
  };
}

export function howToNode(opts: { name: string; steps: { name: string; text: string }[] }) {
  return {
    '@type': 'HowTo',
    name: opts.name,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * Provayder + narxni Product/Offer sifatida beradi.
 * Narx ma'lumotini LLM uchun to'g'ridan-to'g'ri strukturali qiladi —
 * bozorda bu darajada qilingan boshqa sayt yo'q.
 */
export function productOfferNode(p: Provider, product: ProductId, locale: Locale = 'uz') {
  const offers: Record<string, unknown>[] = [];
  const productName = product === 'stars' ? 'Telegram Stars' : 'Telegram Premium';
  const descriptions: Record<Locale, string> = {
    uz: `${p.name} xizmatidagi ${productName} paketlari va O‘zbekiston so‘midagi e’lon qilingan narxlar.`,
    ru: `Пакеты ${productName} в сервисе ${p.name} и опубликованные цены в узбекских сумах.`,
    en: `${productName} packages from ${p.name} and their published prices in Uzbek soums.`,
  };
  const monthLabel = (months: number) => (
    locale === 'uz' ? 'oy' : locale === 'ru' ? 'мес.' : months === 1 ? 'month' : 'months'
  );

  if (product === 'stars') {
    const unit = starsPerUnit(p);
    for (const pkg of p.products?.stars?.packages ?? []) {
      offers.push({
        '@type': 'Offer',
        name: `${pkg.qty} Telegram Stars`,
        price: pkg.price,
        priceCurrency: 'UZS',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: p.name, url: p.site },
      });
    }
    if (offers.length === 0 && unit !== null) {
      offers.push({
        '@type': 'Offer',
        name: '1 Telegram Star',
        price: unit,
        priceCurrency: 'UZS',
        seller: { '@type': 'Organization', name: p.name, url: p.site },
      });
    }
  } else if (product === 'premium') {
    for (const plan of p.products?.premium?.plans ?? []) {
      offers.push({
        '@type': 'Offer',
        name: `Telegram Premium — ${plan.months} ${monthLabel(plan.months)}`,
        price: plan.price,
        priceCurrency: 'UZS',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: p.name, url: p.site },
      });
    }
  }

  return {
    '@type': 'Product',
    name: `${p.name} — ${productName}`,
    image: `${SITE.origin}/og-image.png`,
    description: descriptions[locale],
    brand: { '@type': 'Brand', name: p.name },
    offers,
  };
}

/** Reyting ro'yxati — ItemList. LLM listicle'ni shundan o'qiydi. */
export function itemListNode(opts: {
  name: string;
  items: { name: string; url: string; description?: string }[];
}) {
  return {
    '@type': 'ItemList',
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((x, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: x.name,
      url: x.url,
      ...(x.description ? { description: x.description } : {}),
    })),
  };
}

/** Dataset — /api/narxlar.json ni iqtibos olinadigan manba sifatida e'lon qiladi. */
export function datasetNode(opts: { locale: Locale; modified: string }) {
  return {
    '@type': 'Dataset',
    name: 'Telegram Stars / Premium narxlari — O‘zbekiston',
    description:
      'O‘zbekistondagi Telegram Stars, Premium va Gifts provayderlarining e’lon qilingan narxlari, to‘lov usullari va yetkazish vaqtlari.',
    url: localeUrl('/narxlar', opts.locale),
    dateModified: opts.modified,
    creator: { '@id': ORG_ID },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${SITE.origin}/api/narxlar.json`,
      },
    ],
  };
}
