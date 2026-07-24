import type { APIRoute } from 'astro';
import { siteOrigin } from '@/features/seo/site';

/**
 * /robots.txt, generated from the same canonical `site` as the sitemap.
 *
 * A checked-in static file drifted from astro.config within a week; generating
 * it here keeps the Sitemap line aligned with `sitemap-index.xml`.
 */
export const GET: APIRoute = () => {
  const origin = siteOrigin();
  const body = `User-agent: *
Allow: /

# Internal verification pages. Also marked noindex in their own markup.
Disallow: /scan-test
Disallow: /design-tokens

# Generative search / LLM crawlers (not blocked).
# Summary: ${origin}/llms.txt

Sitemap: ${origin}/sitemap.xml
Sitemap: ${origin}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
