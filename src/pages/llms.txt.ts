import type { APIRoute } from 'astro';
import { buildLlmsTxt } from '@/features/seo/llms';

export const GET: APIRoute = () =>
  new Response(`${buildLlmsTxt()}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
