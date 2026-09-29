/**
 * Renders 1200x630 PNG social cards into public/og (git-ignored) and writes
 * src/data/seo/og-images.generated.ts, the list of routes that have a card.
 *
 * Cards cover the SEO pages, hubs, and catalog listing and category pages.
 * Detail pages use their own preview image when they have one.
 *
 * Run via `bun run generate:og` (also part of `bun run build`).
 */
import fs from 'fs';
import path from 'path';
import { ImageResponse } from '@vercel/og';
import { seoIndexPages, seoKindMeta, seoPagePath, seoPages } from '../src/data/seo';
import { animatedCategorySeo, blockCategorySeo, componentCategorySeo } from '../src/data/seo/catalog-meta';
import { catalogLinks } from '../src/data/seo/catalog-links.generated';
import { ogImageFileName } from '../src/data/seo/og';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public/og');
const MANIFEST = path.join(ROOT, 'src/data/seo/og-images.generated.ts');
const LIME = '#7ccf00';

type Card = { path: string; eyebrow: string; title: string; description: string };

function titleCase(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const font = (weight: number) =>
  fs.readFileSync(path.join(ROOT, `node_modules/@fontsource/geist/files/geist-latin-${weight}-normal.woff`));
const fonts = [
  { name: 'Geist', data: font(400), weight: 400 as const, style: 'normal' as const },
  { name: 'Geist', data: font(600), weight: 600 as const, style: 'normal' as const },
];
const logo = `data:image/png;base64,${fs.readFileSync(path.join(ROOT, 'public/logo-128.png')).toString('base64')}`;

// ── Which routes get a card ──────────────────────────────────────────────────
const cards: Card[] = [
  {
    path: '/',
    eyebrow: 'Open source',
    title: 'Free React components, blocks, and dashboards',
    description: 'Copy-paste UI for Tailwind CSS. Install with the shadcn CLI. MIT licensed.',
  },
  ...seoPages.map((page) => ({
    path: seoPagePath(page),
    eyebrow: seoKindMeta[page.kind].label,
    title: page.h1,
    description: page.description,
  })),
  ...seoIndexPages.map((index) => ({
    path: index.path,
    eyebrow: 'Resources',
    title: index.h1,
    description: index.description,
  })),
  ...catalogLinks.components.map((c) => {
    const slug = c.href.split('/').pop()!;
    const seo = componentCategorySeo(slug);
    return {
      path: c.href,
      eyebrow: 'Components',
      title: seo?.h1 ?? c.title,
      description: seo?.description ?? `${c.title} components for React and Tailwind CSS.`,
    };
  }),
  ...[...new Set(catalogLinks.blocks.map((b) => b.category).filter(Boolean) as string[])].map((category) => {
    const seo = blockCategorySeo(category);
    return {
      path: `/blocks/${category}`,
      eyebrow: 'Blocks',
      title: seo?.h1 ?? `${titleCase(category)} Blocks`,
      description: seo?.description ?? `${titleCase(category)} blocks for React and Tailwind CSS.`,
    };
  }),
  ...[...new Set(catalogLinks['animated-components'].map((a) => a.category).filter(Boolean) as string[])].map(
    (category) => {
      const seo = animatedCategorySeo(category);
      return {
        path: `/animated-components/category/${category}`,
        eyebrow: 'Animated components',
        title: seo.h1,
        description: seo.description,
      };
    },
  ),
  ...[
    ['/home', 'Catalog', 'React components, dashboards, and blocks'],
    ['/components', 'Catalog', 'React components'],
    ['/animated-components', 'Catalog', 'Animated React components'],
    ['/blocks', 'Catalog', 'React and Tailwind blocks'],
    ['/dashboards', 'Catalog', 'React dashboard templates'],
    ['/templates', 'Catalog', 'React templates'],
    ['/showcases', 'Catalog', 'Showcases'],
  ].map(([p, eyebrow, title]) => ({
    path: p,
    eyebrow,
    title,
    description: 'Free and open source. Copy the code or install with the shadcn CLI.',
  })),
];

/** First sentence if it fits, so cards never end mid-word. */
function firstSentence(text: string, max: number) {
  const sentence = text.match(/^.*?[.?!](\s|$)/)?.[0].trim() ?? text;
  return clamp(sentence, max);
}

function clamp(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function CardImage({ card }: { card: Card }) {
  const titleSize = card.title.length > 48 ? 60 : 72;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0a0a0a',
        backgroundImage: 'radial-gradient(circle at 85% 0%, rgba(124,207,0,0.22), rgba(10,10,10,0) 55%)',
        padding: '64px 72px',
        fontFamily: 'Geist',
        color: '#fafafa',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src={logo} width={48} height={48} style={{ borderRadius: 12 }} />
        <span style={{ fontSize: 30, fontWeight: 600 }}>Watermelon UI</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: LIME, textTransform: 'uppercase', letterSpacing: 2 }}>
          {card.eyebrow}
        </span>
        <span style={{ fontSize: titleSize, fontWeight: 600, lineHeight: 1.08, letterSpacing: -1.5 }}>
          {clamp(card.title, 80)}
        </span>
        <span style={{ fontSize: 28, lineHeight: 1.4, color: '#a1a1aa', maxWidth: 1000 }}>
          {firstSentence(card.description, 130)}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#71717a' }}>
        <span>ui.watermelon.sh</span>
        <span>Free · Open source · MIT</span>
      </div>
    </div>
  );
}

// ── Render ────────────────────────────────────────────────────────────────────
fs.mkdirSync(OUT_DIR, { recursive: true });
const seen = new Set<string>();
const unique = cards.filter((c) => (seen.has(c.path) ? false : (seen.add(c.path), true)));

async function render(card: Card, file: string) {
  const image = new ImageResponse(<CardImage card={card} />, { width: 1200, height: 630, fonts });
  fs.writeFileSync(path.join(OUT_DIR, file), Buffer.from(await image.arrayBuffer()));
}

for (const card of unique) await render(card, ogImageFileName(card.path));
await render(unique[0], 'default.png');

fs.writeFileSync(
  MANIFEST,
  `// This file is auto-generated by scripts/generate-og-images.tsx
// Do not edit by hand.

export const ogImageRoutes = ${JSON.stringify(unique.map((c) => c.path).sort(), null, 2)} as const;
`,
);
console.log(`Generated ${unique.length + 1} OG images in public/og.`);
