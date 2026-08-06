import type { APIRoute } from 'astro';
import raw from '../../data/providers.json';
import { SITE } from '../../config/site.js';

/**
 * Ochiq narx dataseti.
 *
 * Maqsad: LLM va uchinchi tomonlar iqtibos qilishi uchun mashina-o'qiladigan,
 * litsenziyalangan manba berish. `$comment`/`$note` kabi ichki maydonlar
 * olib tashlanadi — tashqi iste'molchi uchun toza shakl.
 */
function strip(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(strip);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([k]) => !k.startsWith('$'))
        .map(([k, v]) => [k, strip(v)]),
    );
  }
  return value;
}

export const GET: APIRoute = () => {
  const body = {
    source: SITE.origin,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: `${SITE.name} — ${SITE.origin}`,
    currency: raw.currency,
    verifiedAt: raw.verifiedAt,
    methodology: `${SITE.origin}/mezonlar`,
    weights: raw.$methodology.weights,
    providers: strip(raw.providers),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=3600',
    },
  });
};
