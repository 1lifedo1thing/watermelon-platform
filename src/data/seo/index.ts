import { alternativePages } from './pages/alternatives';
import { comparePages } from './pages/compare';
import { freePages } from './pages/free';
import { guidePages } from './pages/guides';
import { moreComparePages, moreGuidePages } from './pages/more';
import { toolPages } from './pages/tools';
import { seoKindMeta, seoPagePath, type CatalogListKind, type SeoPage, type SeoPageKind } from './types';

export * from './types';

export { SITE_URL } from './site';

export const seoPages: SeoPage[] = [
  ...alternativePages,
  ...comparePages,
  ...moreComparePages,
  ...freePages,
  ...guidePages,
  ...moreGuidePages,
  ...toolPages,
];

export const seoPagesByPath: Record<string, SeoPage> = Object.fromEntries(
  seoPages.map((page) => [seoPagePath(page), page]),
);

export interface SeoIndexPage {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  groups: { heading: string; kind: SeoPageKind }[];
}

/** Hub pages that list every SEO page, so none of them are orphans. */
export const seoIndexPages: SeoIndexPage[] = [
  {
    path: '/alternatives',
    title: 'UI Library Alternatives and Comparisons',
    description:
      'Honest comparisons of popular React UI libraries, including shadcn/ui, Tailwind UI, Aceternity UI, Magic UI, daisyUI, and HeroUI, with free alternatives.',
    h1: 'UI Library Alternatives and Comparisons',
    intro:
      'Looking for a shadcn/ui, Tailwind UI, or Aceternity UI alternative? These pages compare popular React UI libraries fairly, including where each one is stronger than Watermelon UI.',
    groups: [
      { heading: 'Alternatives', kind: 'alternative' },
      { heading: 'Head-to-head comparisons', kind: 'compare' },
    ],
  },
  {
    path: '/free',
    title: 'Free React Components, Blocks, and Templates',
    description:
      'Free React resources from Watermelon UI: dashboard templates, animated components, Tailwind blocks, and landing page sections. MIT licensed, no sign up.',
    h1: 'Free React Components, Blocks, and Templates',
    intro:
      'Everything on Watermelon UI is free and MIT licensed. These collections group the catalog by what you are building.',
    groups: [{ heading: 'Free collections', kind: 'free' }],
  },
  {
    path: '/guides',
    title: 'React UI Guides',
    description:
      'Practical guides for building React interfaces: MCP servers for AI agents, animated components, dashboards, and choosing a component library.',
    h1: 'React UI Guides',
    intro:
      'Short, practical answers to common questions about React UI, component libraries, and building with AI coding agents.',
    groups: [{ heading: 'Guides', kind: 'guide' }],
  },
];

export const seoIndexByPath: Record<string, SeoIndexPage> = Object.fromEntries(
  seoIndexPages.map((page) => [page.path, page]),
);

export function seoPagesOfKind(kind: SeoPageKind) {
  return seoPages.filter((page) => page.kind === kind);
}

export function seoBreadcrumbs(page: SeoPage) {
  const meta = seoKindMeta[page.kind];
  const index = seoIndexByPath[meta.indexPath];
  return [
    { name: 'Home', path: '/' },
    { name: index.h1, path: meta.indexPath },
    { name: page.h1, path: seoPagePath(page) },
  ];
}

/**
 * SEO pages to link from each catalog section, so the programmatic pages get
 * visible internal links from the catalog (not only from crawler HTML).
 */
const relatedByCatalogKind: Record<CatalogListKind, string[]> = {
  components: ['/free/react-components', '/alternatives/shadcn-ui', '/guides/copy-paste-vs-component-library', '/guides/best-free-shadcn-alternatives'],
  'animated-components': ['/free/animated-react-components', '/alternatives/aceternity-ui', '/alternatives/magic-ui', '/guides/add-animated-components-to-react'],
  blocks: ['/free/tailwind-blocks', '/free/landing-page-components', '/alternatives/tailwind-ui', '/guides/is-tailwind-ui-free'],
  dashboards: ['/free/react-dashboard-templates', '/guides/build-react-dashboard-fast', '/alternatives/untitled-ui'],
  templates: ['/free/landing-page-components', '/free/tailwind-blocks', '/alternatives/tailwind-ui'],
};

export function relatedSeoPagesFor(kind: CatalogListKind): SeoPage[] {
  return relatedByCatalogKind[kind].map((path) => seoPagesByPath[path]).filter(Boolean);
}

export { seoPagePath };
