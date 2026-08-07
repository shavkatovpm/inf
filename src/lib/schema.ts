/**
 * JSON-LD node yasovchi yordamchilar.
 * Barchasi sof funksiya — sahifalar shu yerdan node yig'ib Schema.astro ga beradi.
 */
import { SITE, localeUrl } from '../config/site.js';
import type { Locale } from '../i18n/ui';
import { type ProductId, sellersOf, starsPerUnit } from './providers';

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
 * Mahsulot + barcha sotuvchilarning narxlari — BITTA Product node.
 *
 * Nima uchun provayder boshiga alohida Product emas: Infogram sotuvchi emas,
 * u taqqoslash nashri. Google'ning "product snippet" (merchant listing emas)
 * shakli aynan shu holat uchun: sahifa mahsulot entity'si haqida, sotuvchilar
 * esa `AggregateOffer` ichidagi alohida `Offer`lar sifatida beriladi.
 * Har sotuvchining nomi bilan alohida "Product" e'lon qilish esa biz sotmaydigan
 * tovarni sotayotgandek ko'rsatadi — bu structured data mismatch xavfi.
 *
 * `availability` ATAYLAB berilmaydi. Birinchidan, u uchinchi tomonning
 * ombori haqidagi da'vo — biz uni tekshira olmaymiz, ya'ni saytning
 * "tekshirilmagan qiymat yozilmaydi" qoidasiga zid. Ikkinchidan, `price` +
 * `availability` juftligi Google uchun "merchant listing" signali bo'lib,
 * biz sotmaydigan tovar uchun shippingDetails / hasMerchantReturnPolicy
 * ogohlantirishlarini keltirib chiqaradi.
 *
 * `null` qaytsa — e'lon qilingan narx yo'q, node umuman chiqarilmaydi.
 */
export function productAggregateNode(
  product: Extract<ProductId, 'stars' | 'premium'>,
  locale: Locale,
  path: string,
) {
  const productName = product === 'stars' ? 'Telegram Stars' : 'Telegram Premium';
  const monthLabel = (months: number) => (
    locale === 'uz' ? 'oy' : locale === 'ru' ? 'мес.' : months === 1 ? 'month' : 'months'
  );
  const descriptions: Record<Locale, string> = {
    uz: `O‘zbekistonda so‘mda to‘lov qabul qiladigan xizmatlarda ${productName} uchun e’lon qilingan narxlar.`,
    ru: `Опубликованные цены на ${productName} в сервисах Узбекистана, принимающих оплату в сумах.`,
    en: `Published ${productName} prices from services in Uzbekistan that accept payment in UZS.`,
  };

  const offers: { '@type': string; name: string; price: number; [k: string]: unknown }[] = [];

  for (const p of sellersOf(product)) {
    const seller = { '@type': 'Organization', name: p.name, url: p.site };

    if (product === 'stars') {
      const packages = p.products?.stars?.packages ?? [];
      if (packages.length > 0) {
        for (const pkg of packages) {
          offers.push({
            '@type': 'Offer',
            name: `${pkg.qty} Telegram Stars — ${p.name}`,
            price: pkg.price,
            priceCurrency: 'UZS',
            seller,
          });
        }
      } else {
        const unit = starsPerUnit(p);
        if (unit !== null) {
          offers.push({
            '@type': 'Offer',
            name: `1 Telegram Star — ${p.name}`,
            price: unit,
            priceCurrency: 'UZS',
            seller,
          });
        }
      }
    } else {
      for (const plan of p.products?.premium?.plans ?? []) {
        offers.push({
          '@type': 'Offer',
          name: `Telegram Premium — ${plan.months} ${monthLabel(plan.months)} — ${p.name}`,
          price: plan.price,
          priceCurrency: 'UZS',
          seller,
        });
      }
    }
  }

  if (offers.length === 0) return null;

  const prices = offers.map((o) => o.price);

  return {
    '@type': 'Product',
    '@id': `${localeUrl(path, locale)}#product-${product}`,
    name: productName,
    description: descriptions[locale],
    // Mahsulot Telegram'niki — sotuvchining emas.
    brand: { '@type': 'Brand', name: 'Telegram' },
    image: `${SITE.origin}/og-image-frame.png`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'UZS',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: offers.length,
      offers,
    },
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
