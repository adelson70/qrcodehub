/**
 * Shape of a type page's editorial content.
 *
 * Separate from the content itself so the locale files can import the types
 * without importing each other, and so a translator only ever opens one file.
 */

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

export interface TypeContent {
  /** One sentence under the H1. */
  readonly intro: string;
  /** Numbered steps. Four is the ceiling before it reads like work. */
  readonly steps: readonly string[];
  /** "What is a ... ?" — two or three paragraphs. */
  readonly explainer: readonly string[];
  /** The differentiator section. Appears on every type page. */
  readonly expiry: string;
  readonly faq: readonly FaqEntry[];
}
