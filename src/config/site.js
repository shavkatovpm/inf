// Saytning yagona konfiguratsiya manbai.
// astro.config.mjs ham shu fayldan o'qiydi — shuning uchun .js (TS emas).

export const SITE = {
  origin: 'https://infogram.uz',
  name: 'Infogram',
  // Saytning amaliy pozitsiyasi: qidiruvdan xarid qarorigacha yo'l ko'rsatadi.
  tagline: {
    uz: "O'zbekistonda Telegram Stars, Premium va Gifts uchun narxlar hamda xarid qo'llanmasi",
    ru: 'Цены и руководство по покупке Telegram Stars, Premium и Gifts в Узбекистане',
    en: 'Prices and buying guides for Telegram Stars, Premium and Gifts in Uzbekistan',
  },
  email: 'info@infogram.uz',
};

export const LOCALES = /** @type {const} */ (['uz', 'ru', 'en']);
export const DEFAULT_LOCALE = 'uz';

/** BCP-47 kodlari — hreflang va JSON-LD `inLanguage` uchun. */
export const HREFLANG = { uz: 'uz-UZ', ru: 'ru-UZ', en: 'en' };

/**
 * Lokalga mos URL yasaydi. uz — prefikssiz.
 * @param {string} path  '/telegram-stars' ko'rinishida (boshida /)
 * @param {'uz'|'ru'|'en'} locale
 */
export function localePath(path, locale) {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return locale === DEFAULT_LOCALE ? clean || '/' : `/${locale}${clean}`;
}

/** To'liq absolute URL. */
export function localeUrl(path, locale) {
  const p = localePath(path, locale);
  return p === '/' ? SITE.origin : `${SITE.origin}${p}`;
}

/**
 * starsjoy bot deep-link — attribution bilan.
 * Bot tomonida `/start` payload'i `ig_<slug>` ko'rinishida keladi va
 * bazaga yoziladi; busiz infogram'ning ROI'si o'lchanmaydi.
 *
 * Telegram start payload cheklovi: A-Z a-z 0-9 _ - , max 64 belgi.
 * @param {string} botUsername  '@' siz
 * @param {string} slug         manba sahifa identifikatori
 */
export function botLink(botUsername, slug) {
  const payload = `ig_${slug}`
    .replace(/[^A-Za-z0-9_-]/g, '_')
    .slice(0, 64);
  return `https://t.me/${botUsername}?start=${payload}`;
}
