import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SCANNER_CONTENT } from '@/features/scanner/page-content';
import { TYPE_LOCALES } from '@/features/qr/types/locales';
import { LOCALES } from '@/i18n/config';

const STRINGS = {
  en: {
    homeTitle: 'QR Code Generator',
    homeSubtitle:
      'Paste a link, get a QR code. Free forever, no account, no watermark, and it never expires — because there is no server involved. Everything happens in your browser.',
    toolsTitle: 'All QR code generators',
    toolsLead:
      'Each type has its own generator with the fields it actually needs — and the same guarantee: free, no signup, no watermark, and it never expires.',
    blogTitle: 'QRHub Blog',
    blogDescription:
      'Straight answers about QR codes: why they expire, why they stop working, and how to make one that lasts forever.',
  },
  'pt-BR': {
    homeTitle: 'Gerador de QR Code',
    homeSubtitle:
      'Cole um link e receba um QR Code. Gratuito para sempre, sem cadastro, sem marca d’água e sem prazo de validade — porque não existe servidor envolvido. Tudo acontece no seu navegador.',
    toolsTitle: 'Todos os geradores de QR Code',
    toolsLead:
      'Cada tipo tem seu próprio gerador, com os campos que ele realmente precisa — e a mesma garantia: gratuito, sem cadastro, sem marca d’água e sem prazo de validade.',
    blogTitle: 'Blog do QRHub',
    blogDescription:
      'Respostas diretas sobre QR Codes: por que eles expiram, por que param de funcionar e como fazer um que dure para sempre.',
  },
} as const;

function pageTitle(label: string): string {
  return `${label} | QRHub`;
}

function homeDocumentTitle(locale: keyof typeof STRINGS): string {
  const copy = STRINGS[locale];
  return locale === 'en' ? `${copy.homeTitle} — QRHub` : `${copy.homeTitle} — QRHub`;
}

function scannerDocumentTitle(locale: (typeof LOCALES)[number]): string {
  const content = SCANNER_CONTENT[locale];
  return `${content.title} — Free, Nothing Uploaded | QRHub`;
}

function parseFrontmatter(field: string, source: string): string | undefined {
  const match = new RegExp(`^${field}:\\s*['"]?(.+?)['"]?\\s*$`, 'm').exec(source);
  return match?.[1]?.trim();
}

function blogPostsMeta(locale: 'en' | 'pt'): { title: string; description: string }[] {
  const dir = join(process.cwd(), 'src/content/blog', locale);
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const raw = readFileSync(join(dir, name), 'utf8');
      const title = parseFrontmatter('title', raw);
      const description = parseFrontmatter('description', raw);
      if (!title || !description) {
        throw new Error(`Missing title/description in ${name}`);
      }
      return { title, description };
    });
}

function collectTitles(): string[] {
  const titles: string[] = [];

  for (const locale of LOCALES) {
    const copy = STRINGS[locale];
    titles.push(homeDocumentTitle(locale));
    titles.push(pageTitle(copy.toolsTitle));
    titles.push(scannerDocumentTitle(locale));
    titles.push(pageTitle(copy.blogTitle));

    for (const meta of Object.values(TYPE_LOCALES[locale])) {
      titles.push(pageTitle(meta.seo.title));
    }

    const blogLocale = locale === 'en' ? 'en' : 'pt';
    for (const post of blogPostsMeta(blogLocale)) {
      titles.push(pageTitle(post.title));
    }
  }

  return titles;
}

function collectDescriptions(): string[] {
  const descriptions: string[] = [];

  for (const locale of LOCALES) {
    const copy = STRINGS[locale];
    descriptions.push(copy.homeSubtitle);
    descriptions.push(copy.toolsLead);
    descriptions.push(SCANNER_CONTENT[locale].description);
    descriptions.push(copy.blogDescription);

    for (const meta of Object.values(TYPE_LOCALES[locale])) {
      descriptions.push(meta.seo.description);
    }

    const blogLocale = locale === 'en' ? 'en' : 'pt';
    for (const post of blogPostsMeta(blogLocale)) {
      descriptions.push(post.description);
    }
  }

  return descriptions;
}

function findDuplicates(values: string[]): string[] {
  const seen = new Map<string, number>();
  for (const value of values) {
    seen.set(value, (seen.get(value) ?? 0) + 1);
  }
  return [...seen.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

describe('indexable page meta uniqueness', () => {
  it('has unique document titles', () => {
    const duplicates = findDuplicates(collectTitles());
    expect(duplicates, duplicates.join('\n')).toEqual([]);
  });

  it('has unique meta descriptions', () => {
    const duplicates = findDuplicates(collectDescriptions());
    expect(duplicates, duplicates.join('\n')).toEqual([]);
  });
});
