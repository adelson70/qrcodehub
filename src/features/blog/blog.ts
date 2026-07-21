import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n/config';

/**
 * Blog data access, locale-aware.
 *
 * Every read goes through here so the draft filter and the sort order cannot
 * diverge between the index, the category pages and the related-post lists.
 */

export type Post = CollectionEntry<'blogEn'> | CollectionEntry<'blogPt'>;

const COLLECTION: Record<Locale, 'blogEn' | 'blogPt'> = {
  en: 'blogEn',
  'pt-BR': 'blogPt',
};

export const BLOG_BASE: Record<Locale, string> = {
  en: '/blog',
  'pt-BR': '/pt/blog',
};

export function postPath(slug: string, locale: Locale): string {
  return `${BLOG_BASE[locale]}/${slug}`;
}

/** Published posts, newest first. Drafts never reach a build. */
export async function getPosts(locale: Locale): Promise<Post[]> {
  const posts = await getCollection(COLLECTION[locale], ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

/**
 * The same post in every locale, for hreflang.
 *
 * Returns only locales that actually have the translation. Declaring an
 * alternate that 404s is worse than declaring none: Google drops the whole
 * cluster rather than the one bad entry.
 */
export async function getTranslations(
  translationKey: string,
): Promise<Partial<Record<Locale, string>>> {
  const [en, pt] = await Promise.all([getPosts('en'), getPosts('pt-BR')]);

  const paths: Partial<Record<Locale, string>> = {};
  const enMatch = en.find((post) => post.data.translationKey === translationKey);
  const ptMatch = pt.find((post) => post.data.translationKey === translationKey);

  if (enMatch) paths.en = postPath(enMatch.id, 'en');
  if (ptMatch) paths['pt-BR'] = postPath(ptMatch.id, 'pt-BR');

  return paths;
}

/**
 * Posts to link from this one.
 *
 * Same category first, then the cluster pillar. Concentrating links on the
 * pillar is what makes it rank; scattering them evenly helps nothing.
 */
export async function getRelatedPosts(
  post: Post,
  locale: Locale,
  limit = 3,
): Promise<Post[]> {
  const all = await getPosts(locale);
  const others = all.filter((candidate) => candidate.id !== post.id);

  const sameCategory = others.filter(
    (candidate) => candidate.data.category === post.data.category,
  );
  const pillars = others.filter(
    (candidate) => candidate.data.pillar && !sameCategory.includes(candidate),
  );

  return [...sameCategory, ...pillars].slice(0, limit);
}
