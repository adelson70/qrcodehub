// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { CANONICAL_SITE_ORIGIN } from './src/features/seo/canonical-site.mjs';
import { sitemapFilter, sitemapSerialize } from './src/features/seo/sitemap-config.mjs';

// https://astro.build/config
export default defineConfig({
  site: CANONICAL_SITE_ORIGIN,

  /*
   * English at the root, Portuguese under /pt.
   *
   * `prefixDefaultLocale: false` keeps every existing English URL exactly where
   * it is. Prefixing it would mean redirecting the whole site and splitting the
   * authority those URLs accumulate, in exchange for nothing.
   *
   * `redirectToDefaultLocale: false` because there is no server to redirect
   * with -- this is a static build, and Astro's automatic redirects need one.
   */
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      // The URL segment is `pt` but the language code is `pt-BR`: the content is
      // Brazilian (PIX, "celular", "cardápio"). A short path reads better and a
      // precise code tells search engines the truth about the dialect.
      { path: 'pt', codes: ['pt-BR', 'pt'] },
    ],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  /*
   * AdSense publisher ID. Optional, and that is the whole design: an empty
   * value disables ads completely. Auto ads need only this ID -- placement and
   * formats are controlled in the AdSense dashboard, not in code.
   *
   * `context: 'client'` and `access: 'public'` because the ID ends up in the
   * markup by definition -- a publisher ID is visible in the page source of
   * every site running AdSense.
   *
   * This is a static build, so the value is inlined at compile time. Editing
   * .env without rebuilding leaves dist/ untouched.
   */
  env: {
    schema: {
      PUBLIC_ADSENSE_CLIENT: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },

  integrations: [
    react(),
    sitemap({
      /*
       * Emits <xhtml:link rel="alternate" hreflang="..."> for each URL, which
       * is how Google learns the pages are translations of each other rather
       * than duplicates competing with one another.
       *
       * The sitemap alternates and the in-page <link rel="alternate"> tags must
       * agree; both are generated from the same locale config.
       */
      // Keys are URL segments, values are the language codes emitted as
      // hreflang. These must match the in-page <link rel="alternate"> tags,
      // which come from the same source in src/i18n/config.ts.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', pt: 'pt-BR' },
      },
      filter: sitemapFilter,
      serialize: sitemapSerialize,
    }),
  ],

  // The `@/*` alias comes from tsconfig.json `paths`, which Astro resolves
  // natively. Duplicating it as a Vite alias here would break on Windows, where
  // URL.pathname yields a leading-slash drive path (/C:/...).
  vite: {
    plugins: [tailwindcss()],
  },
});
