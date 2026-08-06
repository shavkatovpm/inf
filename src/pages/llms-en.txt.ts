import type { APIRoute } from 'astro';
import { localizedLlms } from '../lib/llmsLocale';

export const GET: APIRoute = () => new Response(localizedLlms('en'), {
  headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
});
