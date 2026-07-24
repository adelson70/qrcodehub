import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '../..');

/** @type {readonly string[]} */
const EXCLUDED_SNIPPETS = ['/scan-test', '/design-tokens', '/404'];

/**
 * @param {string} page
 * @returns {boolean}
 */
export function sitemapFilter(page) {
  if (EXCLUDED_SNIPPETS.some((snippet) => page.includes(snippet))) {
    return false;
  }
  try {
    const path = new URL(page).pathname;
    if (path.startsWith('/og/') || path === '/og') return false;
  } catch {
    return false;
  }
  return true;
}

/**
 * @param {string} dir
 * @returns {Map<string, string>}
 */
function blogLastmodBySlug(dir) {
  /** @type {Map<string, string>} */
  const map = new Map();
  const base = join(ROOT, 'content/blog', dir);
  for (const name of readdirSync(base)) {
    if (!name.endsWith('.md')) continue;
    const raw = readFileSync(join(base, name), 'utf8');
    const updated = /^updatedAt:\s*(\S+)/m.exec(raw)?.[1];
    const published = /^publishedAt:\s*(\S+)/m.exec(raw)?.[1];
    const date = updated ?? published;
    if (date) {
      map.set(name.replace(/\.md$/, ''), new Date(date).toISOString());
    }
  }
  return map;
}

const BLOG_LASTMOD_EN = blogLastmodBySlug('en');
const BLOG_LASTMOD_PT = blogLastmodBySlug('pt');

/**
 * @param {import('sitemap').SitemapItemLoose} item
 */
export function sitemapSerialize(item) {
  const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';

  if (path === '/' || path === '/pt') {
    item.priority = 1;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/tools' || path === '/pt/ferramentas') {
    item.priority = 0.9;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/qr-code-scanner' || path === '/pt/leitor-qr-code') {
    item.priority = 0.85;
    item.changefreq = 'monthly';
    return item;
  }

  if (path === '/blog' || path === '/pt/blog') {
    item.priority = 0.75;
    item.changefreq = 'weekly';
    return item;
  }

  const enPost = path.match(/^\/blog\/([^/]+)$/);
  if (enPost) {
    const lastmod = BLOG_LASTMOD_EN.get(enPost[1]);
    if (lastmod) item.lastmod = lastmod;
    item.priority = 0.65;
    item.changefreq = 'monthly';
    return item;
  }

  const ptPost = path.match(/^\/pt\/blog\/([^/]+)$/);
  if (ptPost) {
    const lastmod = BLOG_LASTMOD_PT.get(ptPost[1]);
    if (lastmod) item.lastmod = lastmod;
    item.priority = 0.65;
    item.changefreq = 'monthly';
    return item;
  }

  item.priority = 0.8;
  item.changefreq = 'monthly';
  return item;
}
