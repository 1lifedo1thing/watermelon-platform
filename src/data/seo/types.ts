/**
 * Data model for programmatic SEO pages (/alternatives, /compare, /free, /guides).
 *
 * Content is plain data so the same source feeds the React page, the Worker's
 * raw HTML (for crawlers that skip JavaScript), the sitemap, and llms.txt.
 * Inline links use markdown syntax: [label](/path) or [label](https://...).
 */

export type SeoPageKind = 'alternative' | 'compare' | 'free' | 'guide';

export type CatalogListKind =
  | 'components'
  | 'animated-components'
  | 'blocks'
  | 'dashboards'
  | 'templates'
  | 'showcases';

export interface SeoTable {
  columns: string[];
  rows: string[][];
}

export interface SeoSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: SeoTable;
  /** Live list of real catalog entries rendered under this section. */
  catalog?: { kind: CatalogListKind; category?: string; limit?: number };
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoPage {
  kind: SeoPageKind;
  slug: string;
  /** Title without the " | Watermelon UI" suffix. Must be unique. */
  title: string;
  /** 120 to 160 characters, unique, contains the primary keyword. */
  description: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** Opening paragraphs. The first one answers the query directly. */
  intro: string[];
  sections: SeoSection[];
  faqs?: SeoFaq[];
  /** Paths of related SEO pages (siblings) for internal linking. */
  related: string[];
  /** ISO date the content was last reviewed. */
  updated: string;
}

export const seoKindMeta: Record<
  SeoPageKind,
  { base: string; label: string; indexPath: string }
> = {
  alternative: { base: '/alternatives', label: 'Alternatives', indexPath: '/alternatives' },
  compare: { base: '/compare', label: 'Comparisons', indexPath: '/alternatives' },
  free: { base: '/free', label: 'Free Resources', indexPath: '/free' },
  guide: { base: '/guides', label: 'Guides', indexPath: '/guides' },
};

export function seoPagePath(page: Pick<SeoPage, 'kind' | 'slug'>) {
  return `${seoKindMeta[page.kind].base}/${page.slug}`;
}
