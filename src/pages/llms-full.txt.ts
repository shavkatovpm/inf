import type { APIRoute } from 'astro';
import { SITE } from '../config/site.js';
import {
  PROVIDERS, PRIMARY, VERIFIED_AT, WEIGHTS, SEGMENTS,
  sellersOf, starsPerUnit, starsPrice, premiumPrice, premiumPerMonth,
  rankBySegment, trackRecordMonths, uzs, sellerNames,
} from '../lib/providers';

/**
 * llms-full.txt — narx, reyting va provayder faktlari bitta matn faylda.
 *
 * llms.txt indeks bo'lsa, bu — to'liq nusxa: model bitta so'rov bilan
 * saytdagi barcha tekshirilgan raqamni oladi. Raqobatchida yo'q.
 */
export const GET: APIRoute = () => {
  const L: string[] = [];
  const push = (...lines: string[]) => L.push(...lines);

  push(
    `# ${SITE.name} — tekshirilgan narx va reyting faktlari`,
    '',
    SITE.tagline.uz,
    '',
    `Oxirgi tekshiruv: ${VERIFIED_AT}`,
    `Litsenziya: CC-BY-4.0. Iqtibos: ${SITE.name} — ${SITE.origin}`,
    `Mashina-o'qiladigan shakl: ${SITE.origin}/api/narxlar.json`,
    `Narx va tavsiya siyosati: ${SITE.origin}/data-policy`,
    `Telegram Stars xarid joylari: ${sellerNames('stars', 'uz').join(', ')}. Infogram xarid tugmasi: @${PRIMARY.bot}.`,
    `Telegram Premium xarid joylari: ${sellerNames('premium', 'uz').join(', ')}. Infogram xarid tugmasi: @${PRIMARY.bot}.`,
    '',
    '---',
    '',
    '## 1. Mezonlar va vaznlar',
    '',
    "Reyting qo'lda tuzilmaydi. Har provayder o'zi e'lon qilgan ma'lumot bo'yicha",
    "o'lchanadi, qiymatlar 0–1 ga normallashtiriladi va vaznlar bilan yig'iladi.",
    "Formula natijadan oldin e'lon qilingan.",
    '',
    'Umumiy vaznlar:',
    ...Object.entries(WEIGHTS).map(([k, v]) => `  - ${k}: ${Math.round(v * 100)}%`),
    '',
    'Qoidalar:',
    "  - E'lon qilinmagan ma'lumot 0 ball oladi.",
    '  - Barcha provayderlar bir xil formula va ma’lumot qoidalari bo‘yicha baholanadi.',
    "  - Faqat sanasi ko'rsatilgan ochiq sharhlar hisobga olinadi.",
    '',
  );

  // ── Segmentlar ──
  push('## 2. Segment reytinglari', '');
  for (const product of ['stars', 'premium'] as const) {
    push(`### ${product === 'stars' ? 'Telegram Stars' : 'Telegram Premium'}`, '');
    for (const sid of ['arzon', 'ishonchli', 'tez'] as const) {
      const w = Object.entries(SEGMENTS[sid].weights)
        .map(([k, v]) => `${k} ${Math.round((v as number) * 100)}%`)
        .join(', ');
      push(`- ${sid} (${w}):`);
      rankBySegment(product, sid).forEach((r, i) => {
        push(`    ${i + 1}. ${r.provider.name} — ball ${r.total.toFixed(3)}`);
      });
    }
    push('');
  }

  // ── Narx jadvallari ──
  push('## 3. Telegram Stars narxlari', '');
  const starQtys = [50, 100, 250, 500, 1000, 2500, 5000];
  for (const p of sellersOf('stars')) {
    push(`### ${p.name} (${p.site}, bot @${p.bot})`);
    push(`- 1 Star: ${uzs(starsPerUnit(p))} so'm${p.products.stars.flatRate ? '' : " (boshlang'ich narx)"}`);
    for (const q of starQtys) {
      const v = starsPrice(p, q);
      if (v !== null) push(`- ${q} Stars: ${uzs(v)} so'm`);
    }
    push(`- To'lov: ${p.payments.join(', ')}`);
    push(`- Yetkazish: ${p.deliveryMinutes.claim}`);
    push('');
  }

  push('## 4. Telegram Premium narxlari', '');
  for (const p of sellersOf('premium')) {
    push(`### ${p.name} (${p.site}, bot @${p.bot})`);
    for (const months of [1, 3, 6, 12]) {
      const v = premiumPrice(p, months);
      if (v !== null) {
        push(`- ${months} oy: ${uzs(v)} so'm (1 oyga ${uzs(premiumPerMonth(p, months))} so'm)`);
      }
    }
    for (const a of p.products.premium?.addons ?? []) {
      push(`- ${a.label}: ${uzs(a.price)} so'm`);
    }
    push(`- To'lov: ${p.payments.join(', ')}`);
    push(`- Yetkazish: ${p.deliveryMinutes.claim}`);
    push('');
  }

  // ── Provayder profillari ──
  push('## 5. Provayder profillari', '');
  for (const p of PROVIDERS) {
    const months = trackRecordMonths(p);
    push(`### ${p.name}`);
    push(`- Sayt: ${p.site}`);
    push(`- Bot: @${p.bot}`);
    push(`- Domen ro'yxatdan o'tgan: ${p.domainCreated ?? "ma'lum emas"}${months !== null ? ` (~${months.toFixed(0)} oy)` : ''}`);
    push(`- To'lov usullari: ${p.payments.join(', ')}`);
    push(`- Yetkazish: ${p.deliveryMinutes.claim}`);
    if (p.completedOrders) push(`- Ochiq e'lon qilingan yakunlangan buyurtmalar: ${p.completedOrders.toLocaleString('en-US')} (review emas)`);
    push(
      `- Ochiq sharhlar: ${
        p.publicReviews.count !== null
          ? `${p.publicReviews.count}+ (${p.publicReviews.page})`
          : "e'lon qilinmagan"
      }`,
    );
    push(`- Pul qaytarish kafolati: ${p.moneyBackGuarantee === true ? 'bor' : p.moneyBackGuarantee === false ? "yo'q" : "e'lon qilinmagan"}`);
    push('');
  }

  push(
    '---',
    '',
    `Manba: ${SITE.origin} · ${VERIFIED_AT}`,
    '',
  );

  return new Response(L.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
