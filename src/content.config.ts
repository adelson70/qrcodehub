import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog posts, one collection per locale.
 *
 * Separate collections rather than one with a `locale` field: it keeps each
 * locale's slugs independent (a Portuguese post has a Portuguese slug), and it
 * makes a missing translation a visible absence rather than a silent filter.
 *
 * `translationKey` is what links a post to its counterpart. It is NOT the slug,
 * because the slugs deliberately differ — `/blog/do-qr-codes-expire` against
 * `/pt/blog/qr-code-expira`. Without an explicit key there is no way to build
 * hreflang, and hreflang is the single most important multilingual signal.
 */
const postSchema = z.object({
  title: z.string().max(70),
  description: z.string().min(70).max(165),
  /** Links this post to the same post in other locales. */
  translationKey: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  /** Cluster from the content strategy. Drives the category pages. */
  category: z.enum([
    'expiry',
    'troubleshooting',
    'how-to',
    'design',
    'use-cases',
    'technical',
    'comparisons',
  ]),
  /** Primary keyword this post is written to rank for. */
  keyword: z.string(),
  /** Pillar posts receive links from every post in their cluster. */
  pillar: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const blogEn = defineCollection({
  loader: glob({ base: './src/content/blog/en', pattern: '**/*.md' }),
  schema: postSchema,
});

const blogPt = defineCollection({
  loader: glob({ base: './src/content/blog/pt', pattern: '**/*.md' }),
  schema: postSchema,
});

export const collections = { blogEn, blogPt };
