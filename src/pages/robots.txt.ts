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

# Internal verification pages. Also marked noindex in their own markup --
# robots.txt only stops crawling, and a page that is merely uncrawled can still
# be indexed from an external link. The meta tag is what actually keeps them out.
Disallow: /scan-test
Disallow: /design-tokens

# Machine-readable site summary for generative search tools.
# ${origin}/llms.txt

Sitemap: ${origin}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
