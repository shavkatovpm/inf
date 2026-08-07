import raw from '../data/providers.json';
import type { Locale } from '../i18n/ui';

export type ProductId = 'stars' | 'premium' | 'gifts';

export interface Provider {
  id: string;
  name: string;
  /** reseller — so'mda sotadi, reytingda qatnashadi. official — taqqoslash bazasi. */
  type: 'reseller' | 'official';
  /** Xarid CTA'lari yo'naltiriladigan tijoriy xizmat. Reytingga ta'sir qilmaydi. */
  primary?: boolean;
  site: string;
  bot: string | null;
  domainCreated: string | null;
  payments: string[];
  paymentsI18n?: Partial<Record<Locale, string[]>>;
  deliveryMinutes: { min: number | null; max: number | null; claim: string };
  deliveryClaim?: Partial<Record<Locale, string>>;
  nameI18n?: Partial<Record<Locale, string>>;
  /** Ochiq sahifada e'lon qilingan yakunlangan buyurtmalar soni. Review emas. */
  completedOrders?: number | null;
  publicReviews: { count: number | null; page: string | null; dated: boolean };
  moneyBackGuarantee: boolean | null;
  requirements?: string[];
  requirementsI18n?: Partial<Record<Locale, string[]>>;
  products: any;
}

export const PROVIDERS = raw.providers as Provider[];
export const VERIFIED_AT = raw.verifiedAt;
export const WEIGHTS = raw.$methodology.weights as Record<string, number>;
export const SOURCES = raw.sources as Record<string, unknown>;

/** Asosiy xizmat — barcha CTA shunga boradi. */
export const PRIMARY = PROVIDERS.find((p) => p.primary) ?? PROVIDERS[0];

/** Ko'rinadigan provider matnlari sahifa tiliga mos bo'lishi shart. */
export function providerName(p: Provider, locale: Locale): string {
  return p.nameI18n?.[locale] ?? p.name;
}

export function deliveryClaim(p: Provider, locale: Locale): string {
  return p.deliveryClaim?.[locale] ?? p.deliveryMinutes.claim;
}

export function providerRequirements(p: Provider, locale: Locale): string[] {
  return p.requirementsI18n?.[locale] ?? p.requirements ?? [];
}

export function providerPayments(p: Provider, locale: Locale): string[] {
  return p.paymentsI18n?.[locale] ?? p.payments;
}

function hasProduct(p: Provider, product: ProductId): boolean {
  const entry = p.products?.[product];
  if (!entry) return false;
  if (entry.available === false) return false;
  if (product === 'stars') return typeof entry.perUnit === 'number';
  if (product === 'premium') return Array.isArray(entry.plans) && entry.plans.length > 0;
  return entry.available === true;
}

/** Mahsulotni so'mda sotadigan xizmatlar — narx jadvali va reyting shulardan quriladi. */
export function sellersOf(product: ProductId): Provider[] {
  return PROVIDERS.filter((p) => p.type === 'reseller' && hasProduct(p, product));
}

/**
 * Rasmiy yo'llar (Fragment, Telegram ilovasi).
 * Narxi so'mda e'lon qilinmaydi — taqqoslashda talab/cheklov ustuni sifatida
 * ko'rsatiladi. Reytingda qatnashmaydi, bot havolasi yo'q.
 */
export function officialRoutes(): Provider[] {
  return PROVIDERS.filter((p) => p.type === 'official');
}

/** Stars — 1 dona uchun so'm. */
export function starsPerUnit(p: Provider): number | null {
  return p.products?.stars?.perUnit ?? null;
}

/** Premium — berilgan oy uchun narx (yo'q bo'lsa null). */
export function premiumPrice(p: Provider, months: number): number | null {
  const plan = p.products?.premium?.plans?.find((x: any) => x.months === months);
  return plan?.price ?? null;
}

/** Premium — 1 oyga tushadigan o'rtacha narx, tariflarni solishtirish uchun. */
export function premiumPerMonth(p: Provider, months: number): number | null {
  const price = premiumPrice(p, months);
  return price === null ? null : Math.round(price / months);
}

/** Stars — ixtiyoriy miqdor uchun narx. Paket bo'lsa paketdan, bo'lmasa perUnit dan. */
export function starsPrice(p: Provider, qty: number): number | null {
  const s = p.products?.stars;
  if (!s || typeof s.perUnit !== 'number') return null;
  const exact = s.packages?.find((x: any) => x.qty === qty);
  if (exact) return exact.price;
  // flatRate=false bo'lsa e'lon qilingan narx faqat boshlang'ich — taxminiy deb belgilanadi.
  return s.perUnit * qty;
}

/**
 * Narx provayder tomonidan tayyor paket sifatida e'lon qilinganmi.
 * Faqat shu holatda jadvalda belgisiz ko'rsatiladi.
 */
export function isStarsPriceListed(p: Provider, qty: number): boolean {
  return p.products?.stars?.packages?.some((x: any) => x.qty === qty) === true;
}

/**
 * Narx ochiq ma'lumotdan kelib chiqadimi — ya'ni "eng arzon" belgisiga
 * da'vogar bo'la oladimi.
 *
 * Paket narxi ham, e'lon qilingan flat rate'dan (1 dona × miqdor) chiqqan narx
 * ham hisobga olinadi. Aks holda paket e'lon qilmagan, lekin arzonroq
 * provayderning narxi taqqoslashdan tushib qolar edi va "eng arzon" belgisi
 * qimmatroq xizmatga noto'g'ri berilardi.
 */
export function isStarsPricePublished(p: Provider, qty: number): boolean {
  const s = p.products?.stars;
  if (!s) return false;
  return isStarsPriceListed(p, qty) || s.flatRate === true;
}

const MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30.44;

/** Domen yoshi (oyda). VERIFIED_AT ga nisbatan — build sanasi emas, reproducible bo'lishi uchun. */
export function trackRecordMonths(p: Provider): number | null {
  if (!p.domainCreated) return null;
  const ms = new Date(VERIFIED_AT).getTime() - new Date(p.domainCreated).getTime();
  return ms <= 0 ? 0 : ms / MS_PER_MONTH;
}

/** Yetkazish vaqti (daqiqa) — solishtirish uchun eng yomon holat olinadi. */
export function deliveryWorstCase(p: Provider): number | null {
  return p.deliveryMinutes?.max ?? p.deliveryMinutes?.min ?? null;
}

/**
 * 0..1 normalizatsiya. `lowerIsBetter` bo'lsa teskari.
 * Noma'lum (null) qiymat 0 oladi — "isbotlanmagan ustunlik ball bermaydi" qoidasi.
 */
function normalize(value: number | null, all: (number | null)[], lowerIsBetter: boolean): number {
  if (value === null) return 0;
  const known = all.filter((v): v is number => v !== null);
  if (known.length === 0) return 0;
  const min = Math.min(...known);
  const max = Math.max(...known);
  if (max === min) return 1;
  const t = (value - min) / (max - min);
  return lowerIsBetter ? 1 - t : t;
}

export interface ScoreBreakdown {
  provider: Provider;
  total: number;
  parts: Record<string, { raw: number | null; normalized: number; weighted: number }>;
}

/**
 * Mahsulot bo'yicha reyting.
 *
 * MUHIM: vaznlar providers.json dagi $methodology dan keladi va /mezonlar
 * sahifasida natijadan OLDIN e'lon qilinadi. Bu yerda hech qanday
 * provayderga qo'lda ustunlik berilmaydi — ball faqat o'lchangan
 * ma'lumotdan chiqadi.
 */
export function rank(product: ProductId): ScoreBreakdown[] {
  const sellers = sellersOf(product);

  const priceOf = (p: Provider): number | null =>
    product === 'stars' ? starsPerUnit(p) : premiumPerMonth(p, 12) ?? premiumPerMonth(p, 3);

  const prices = sellers.map(priceOf);
  const deliveries = sellers.map(deliveryWorstCase);
  const paymentCounts = sellers.map((p) => p.payments.length);
  const tracks = sellers.map(trackRecordMonths);
  const reviews = sellers.map((p) => p.publicReviews.count);

  const scored = sellers.map((p) => {
    const parts: ScoreBreakdown['parts'] = {};

    const add = (key: string, rawVal: number | null, normalized: number) => {
      const w = WEIGHTS[key] ?? 0;
      parts[key] = { raw: rawVal, normalized, weighted: normalized * w };
    };

    add('price', priceOf(p), normalize(priceOf(p), prices, true));
    add('deliverySpeed', deliveryWorstCase(p), normalize(deliveryWorstCase(p), deliveries, true));
    add('paymentCoverage', p.payments.length, normalize(p.payments.length, paymentCounts, false));
    add('trackRecord', trackRecordMonths(p), normalize(trackRecordMonths(p), tracks, false));
    add(
      'verifiedReviews',
      p.publicReviews.count,
      // Faqat sanasi ko'rsatilgan, ochiq sharhlar hisobga olinadi.
      p.publicReviews.dated ? normalize(p.publicReviews.count, reviews, false) : 0,
    );
    add('guarantee', p.moneyBackGuarantee ? 1 : 0, p.moneyBackGuarantee === true ? 1 : 0);

    const total = Object.values(parts).reduce((s, x) => s + x.weighted, 0);
    return { provider: p, total, parts };
  });

  return scored.sort((a, b) => b.total - a.total);
}

/**
 * Segmentlar.
 *
 * Nima uchun yagona "umumiy reyting" emas: o'lchangan ma'lumotda hech bir
 * provayder barcha mezonda yetakchi emas — arzonligi boshqa, tezligi boshqa,
 * isbotlangan ishonchi boshqa provayderda. Bitta umumiy raqamga siqish
 * ma'lumotni yo'qotadi va o'quvchiga yolg'on aniqlik beradi.
 *
 * Har segment vaznlari /mezonlar da ochiq e'lon qilinadi.
 */
export const SEGMENTS = {
  arzon: {
    id: 'arzon',
    weights: { price: 0.7, paymentCoverage: 0.15, deliverySpeed: 0.15 },
  },
  ishonchli: {
    id: 'ishonchli',
    weights: { verifiedReviews: 0.35, guarantee: 0.3, trackRecord: 0.2, paymentCoverage: 0.15 },
  },
  tez: {
    id: 'tez',
    weights: { deliverySpeed: 0.6, paymentCoverage: 0.2, price: 0.2 },
  },
} as const;

export type SegmentId = keyof typeof SEGMENTS;

/** Segment vaznlari bilan qayta hisoblangan reyting. */
export function rankBySegment(product: ProductId, segment: SegmentId): ScoreBreakdown[] {
  const w = SEGMENTS[segment].weights as Record<string, number>;
  return rank(product)
    .map(({ provider, parts }) => {
      const total = Object.entries(w).reduce(
        (s, [key, weight]) => s + (parts[key]?.normalized ?? 0) * weight,
        0,
      );
      return { provider, total, parts };
    })
    .sort((a, b) => b.total - a.total);
}

/**
 * "A, B yoki C" — lokalga mos bog'lovchi bilan.
 * llms.txt va matnli javoblarda provayder nomlari qo'lda yozilmasligi uchun.
 */
export function joinNames(names: string[], locale: Locale, kind: 'or' | 'and' = 'or'): string {
  if (names.length <= 1) return names[0] ?? '';
  const conj = {
    or: { uz: 'yoki', ru: 'или', en: 'or' },
    and: { uz: 'va', ru: 'и', en: 'and' },
  }[kind][locale];
  return `${names.slice(0, -1).join(', ')} ${conj} ${names[names.length - 1]}`;
}

/** Mahsulotni sotuvchilar nomlari — matnga qo'yish uchun tayyor ro'yxat. */
export function sellerNames(product: ProductId, locale: Locale): string[] {
  return sellersOf(product).map((p) => providerName(p, locale));
}

/** Reseller'larda uchraydigan barcha to'lov usullari — takrorsiz birlashma. */
export function allPayments(locale: Locale): string[] {
  const seen = new Set<string>();
  for (const p of PROVIDERS.filter((x) => x.type === 'reseller')) {
    for (const method of providerPayments(p, locale)) seen.add(method);
  }
  return [...seen];
}

/**
 * Barcha reseller'larda BIRDEK mavjud to'lov usullari.
 * "Hammasi UzCard va HUMO qabul qiladi" kabi da'volar shu yerdan chiqadi —
 * provayder qo'shilganda da'vo o'zi to'g'rilanadi.
 */
export function commonPayments(locale: Locale): string[] {
  const lists = PROVIDERS.filter((p) => p.type === 'reseller').map((p) => providerPayments(p, locale));
  if (lists.length === 0) return [];
  const [first, ...rest] = lists;
  return first.filter((method) => rest.every((list) => list.includes(method)));
}

/** So'm formatlash — 240000 -> "240 000". Ma'lumot yo'q bo'lsa "—". */
export function uzs(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—';
  return n.toLocaleString('ru-RU').replace(/ /g, ' ');
}
