import { SITE } from '../config/site.js';
import {
  PRIMARY, VERIFIED_AT, premiumPrice, sellersOf, starsPerUnit, uzs,
  joinNames, sellerNames, allPayments,
} from './providers';

const copy = {
  ru: {
    title: 'Проверенные цены Telegram в Узбекистане',
    summary: 'Infogram — справочник цен и покупки Telegram-сервисов в Узбекистане. Все сервисы сравниваются по опубликованным единым критериям.',
    star: 'Самая низкая опубликованная цена 1 Telegram Star',
    premium: 'Самая низкая опубликованная цена Premium на 12 месяцев',
    policy: 'Политика данных и сравнения',
    sources: 'Источники и проверка',
    paymentMethods: 'Способы оплаты',
    starProviders: (names: string, bot: string) => `Где купить Stars: ${names}. Кнопка покупки Infogram ведёт в @${bot}.`,
    premiumProviders: (names: string, bot: string) => `Где купить Premium: ${names}. Кнопка покупки Infogram ведёт в @${bot}.`,
    publicPrices: 'Цены взяты с открытых страниц сервисов. Итоговая сумма в боте или на странице сервиса имеет приоритет.',
    separateMetrics: 'Завершённые заказы и открытые отзывы с датами — разные показатели.',
    resources: 'Машиночитаемые ресурсы',
    uzbekFacts: 'Факты на узбекском',
    fullUzbekFacts: 'Полные факты на узбекском',
    citation: 'Цитирование',
    verified: 'проверено',
  },
  en: {
    title: 'Verified Telegram prices in Uzbekistan',
    summary: 'Infogram is a price and buying guide for Telegram services in Uzbekistan. All services are compared using the same published criteria.',
    star: 'Lowest published price for 1 Telegram Star',
    premium: 'Lowest published 12-month Premium price',
    policy: 'Data and comparison policy',
    sources: 'Sources and verification',
    paymentMethods: 'Payment methods',
    starProviders: (names: string, bot: string) => `Where to buy Stars: ${names}. Infogram’s purchase button opens @${bot}.`,
    premiumProviders: (names: string, bot: string) => `Where to buy Premium: ${names}. Infogram’s purchase button opens @${bot}.`,
    publicPrices: 'Prices are taken from providers’ public pages. The final price shown in the provider bot or page takes precedence.',
    separateMetrics: 'Completed orders and dated public reviews are separate metrics.',
    resources: 'Machine-readable resources',
    uzbekFacts: 'Uzbek facts',
    fullUzbekFacts: 'Full Uzbek facts',
    citation: 'Citation',
    verified: 'verified',
  },
};

export function localizedLlms(locale: 'ru' | 'en') {
  const c = copy[locale];
  const cheapestStar = Math.min(...sellersOf('stars').map((p) => starsPerUnit(p)!));
  const cheapest12 = Math.min(...sellersOf('premium').map((p) => premiumPrice(p, 12)).filter((v): v is number => v !== null));
  return [
    `# Infogram — ${c.title}`,
    '',
    `> ${c.summary}`,
    '',
    `${c.sources}: ${VERIFIED_AT}`,
    `- ${c.star}: ${uzs(cheapestStar)} UZS.`,
    `- ${c.premium}: ${uzs(cheapest12)} UZS.`,
    `- ${c.paymentMethods}: ${allPayments(locale).join(', ')}.`,
    `- ${c.starProviders(joinNames(sellerNames('stars', locale), locale), PRIMARY.bot!)}`,
    `- ${c.premiumProviders(joinNames(sellerNames('premium', locale), locale), PRIMARY.bot!)}`,
    '',
    `## ${c.policy}`,
    '',
    `- ${SITE.origin}/${locale === 'ru' ? 'ru/' : 'en/'}data-policy`,
    `- ${c.publicPrices}`,
    `- ${c.separateMetrics}`,
    '',
    `## ${c.resources}`,
    '',
    `- Sitemap: ${SITE.origin}/sitemap-index.xml`,
    `- Dataset: ${SITE.origin}/api/narxlar.json`,
    `- ${c.uzbekFacts}: ${SITE.origin}/llms.txt`,
    `- ${c.fullUzbekFacts}: ${SITE.origin}/llms-full.txt`,
    '',
    `${c.citation}: Infogram — ${SITE.origin}, ${c.verified} ${VERIFIED_AT}.`,
    '',
  ].join('\n');
}
