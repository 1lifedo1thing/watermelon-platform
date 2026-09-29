/**
 * Dynamic sitemap generator.
 *
 * Auto-discovers every public page from the SAME content sources the app uses
 * to build its routes, so adding a new component / block / dashboard / category
 * automatically shows up in the sitemap on the next build — no manual edits here.
 *
 * URL patterns are kept in sync with src/components/layout/app-routes.tsx:
 *   - Home:                /home
 *   - Animated components: /animated-components/:slug
 *                          /animated-components/category/:category
 *   - UI components:       /components/:category
 *   - Dashboards:          /dashboard/:slug
 *   - Templates:           /template/:slug
 *   - Blocks:              /block/:slug
 *                          /blocks/:category
 *   - Showcases:           /showcase/:slug
 *   - SEO pages:           /alternatives, /compare, /free, /guides (src/data/seo)
 *
 * Run via `bun run sitemap` (also runs automatically as part of `bun run build`).
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import matter from 'gray-matter';
import { seoIndexPages, seoPagePath, seoPages } from '../src/data/seo';

const BASE_URL = 'https://ui.watermelon.sh';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const CONTENTS_DIR = path.resolve(process.cwd(), 'src/data/contents');
const WORKER_DIR = path.resolve(process.cwd(), 'worker');
const SEO_DIR = path.resolve(process.cwd(), 'src/data/seo');

type RouteEntry = { path: string; lastmod: string };
type CatalogLink = { title: string; href: string; category?: string };

function toCategorySlug(category: string): string {
  return category.trim().toLowerCase();
}

/** Recursively collect every .mdx file under a directory. */
function findMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findMdxFiles(full));
    else if (entry.name.endsWith('.mdx')) out.push(full);
  }
  return out;
}

/**
 * CI clones are often shallow (GitHub Actions and Cloudflare Workers Builds
 * both default to it). With one commit of history, every file's "last commit"
 * is the same, so every <lastmod> would be the build date. Fetch full history
 * first; if that fails, keep going with the dates we have.
 */
function ensureFullHistory() {
  try {
    const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).trim();
    if (shallow !== 'true') return;
    execFileSync('git', ['fetch', '--unshallow', '--quiet'], {
      cwd: process.cwd(),
      stdio: 'ignore',
      timeout: 120_000,
    });
    console.log('Fetched full git history for accurate sitemap dates.');
  } catch {
    console.warn('Could not fetch full git history; sitemap dates may all be recent.');
  }
}

ensureFullHistory();

/** File last-modified date as YYYY-MM-DD (real <lastmod>, not the build date). */
function fileDate(file: string): string {
  try {
    const gitDate = execFileSync(
      'git',
      ['log', '-1', '--format=%cs', '--', file],
      { cwd: process.cwd(), encoding: 'utf-8' },
    ).trim();
    if (gitDate) return gitDate;
  } catch {
    // Fall back to filesystem mtime when git metadata is unavailable.
  }

  return fs.statSync(file).mtime.toISOString().split('T')[0];
}

const today = new Date().toISOString().split('T')[0];

// ── Static pages (must mirror the real routes in app-routes.tsx) ──────────────
const staticRoutes: RouteEntry[] = [
  '',
  '/home',
  '/animated-components',
  '/components',
  '/dashboards',
  '/templates',
  '/blocks',
  '/showcases',
  '/installation',
  '/framework-support',
  '/developers',
  '/developers/auth',
  '/developers/mcp',
  '/developers/status',
  '/about',
  '/contact',
  '/changelog',
  '/terms',
  '/privacy',
  '/copyright',
].map((p) => ({ path: p, lastmod: today }));

const routes: RouteEntry[] = [...staticRoutes];
// Preview pages are intentionally excluded from the sitemap, but the Worker
// needs an exact allowlist so embedded previews are not mistaken for 404s.
const internalRoutes: string[] = [];
// Lightweight title + link lists used by the SEO hub pages (React and Worker).
// Block descriptions reused by more than one block are category boilerplate
// (sometimes the wrong category's), so SEO metadata replaces them.
const blockDescriptions = new Map<string, string[]>();
const catalogLinks: Record<string, CatalogLink[]> = {
  components: [],
  'animated-components': [],
  blocks: [],
  dashboards: [],
  templates: [],
  showcases: [],
};

// ── Animated components — contents/registry/*.mdx ─────────────────────────────
// Mirrors animated-components-registry.tsx: needs slug + title; category drives
// the /animated-components/category/:category pages (slug === raw category).
{
  const animatedCategories = new Set<string>();
  for (const file of findMdxFiles(path.join(CONTENTS_DIR, 'registry'))) {
    const { slug, title, category } = matter(
      fs.readFileSync(file, 'utf-8'),
    ).data;
    if (!slug || !title) continue;
    routes.push({
      path: `/animated-components/${slug}`,
      lastmod: fileDate(file),
    });
    catalogLinks['animated-components'].push({
      title: String(title),
      href: `/animated-components/${slug}`,
      category: category ? String(category) : undefined,
    });
    if (category) animatedCategories.add(String(category));
  }
  for (const category of animatedCategories) {
    routes.push({
      path: `/animated-components/category/${encodeURIComponent(category)}`,
      lastmod: today,
    });
  }
}

// ── Dashboards — contents/dashboards/*/*.mdx ────────────────────────────────
// Mirrors dashboards.tsx: every dashboard frontmatter with slug + title maps
// to /dashboard/:slug and is listed from the same MDX content source.
{
  for (const file of findMdxFiles(path.join(CONTENTS_DIR, 'dashboards'))) {
    const { slug, title } = matter(fs.readFileSync(file, 'utf-8')).data;
    if (!slug || !title) continue;
    routes.push({ path: `/dashboard/${slug}`, lastmod: fileDate(file) });
    catalogLinks.dashboards.push({ title: String(title), href: `/dashboard/${slug}` });
    internalRoutes.push(`/preview/dashboard/${slug}`);
  }
}

// ── Templates — contents/templates/*/*.mdx ──────────────────────────────────
// Mirrors templates.tsx: every template frontmatter with slug + title maps to
// /template/:slug and is listed from the same MDX content source.
{
  for (const file of findMdxFiles(path.join(CONTENTS_DIR, 'templates'))) {
    const { slug, title } = matter(fs.readFileSync(file, 'utf-8')).data;
    if (!slug || !title) continue;
    routes.push({ path: `/template/${slug}`, lastmod: fileDate(file) });
    catalogLinks.templates.push({ title: String(title), href: `/template/${slug}` });
    internalRoutes.push(`/preview/template/${slug}`);
  }
}

// ── Blocks — contents/blocks/**/*.mdx ─────────────────────────────────────────
// Mirrors blocks.tsx: needs slug + title. Category pages are published with the
// same lowercase slugs the app uses in navigation.
{
  const blockCategories = new Set<string>();
  for (const file of findMdxFiles(path.join(CONTENTS_DIR, 'blocks'))) {
    const { slug, title, category, description } = matter(
      fs.readFileSync(file, 'utf-8'),
    ).data;
    if (!slug || !title) continue;
    routes.push({ path: `/block/${slug}`, lastmod: fileDate(file) });
    const text = String(description ?? '').trim();
    blockDescriptions.set(text, [...(blockDescriptions.get(text) ?? []), String(slug)]);
    catalogLinks.blocks.push({
      title: String(title),
      href: `/block/${slug}`,
      category: category ? toCategorySlug(String(category)) : undefined,
    });
    internalRoutes.push(`/preview/block/${slug}`);
    if (category) blockCategories.add(toCategorySlug(String(category)));
  }
  for (const category of blockCategories) {
    routes.push({
      path: `/blocks/${encodeURIComponent(category)}`,
      lastmod: today,
    });
  }
}

// ── Showcases — contents/showcases/*.mdx ─────────────────────────────────────
{
  for (const file of findMdxFiles(path.join(CONTENTS_DIR, 'showcases'))) {
    const { slug, title } = matter(fs.readFileSync(file, 'utf-8')).data;
    if (!slug || !title) continue;
    routes.push({ path: `/showcase/${slug}`, lastmod: fileDate(file) });
    catalogLinks.showcases.push({ title: String(title), href: `/showcase/${slug}` });
  }
}

// ── UI component categories — contents/components/*/config.ts ─────────────────
// Mirrors components-registry.ts: each category exposes a `slug` used by
// the /components/:category route.
{
  const componentsDir = path.join(CONTENTS_DIR, 'components');
  if (fs.existsSync(componentsDir)) {
    for (const entry of fs.readdirSync(componentsDir, {
      withFileTypes: true,
    })) {
      if (!entry.isDirectory()) continue;
      const configPath = path.join(componentsDir, entry.name, 'config.ts');
      if (!fs.existsSync(configPath)) continue;
      const config = fs.readFileSync(configPath, 'utf-8');
      const match = config.match(/slug:\s*['"]([^'"]+)['"]/);
      const label = config.match(/label:\s*['"]([^'"]+)['"]/)?.[1];
      if (match) {
        routes.push({
          path: `/components/${match[1]}`,
          lastmod: fileDate(configPath),
        });
        catalogLinks.components.push({
          title: label ?? match[1],
          href: `/components/${match[1]}`,
        });
      }
    }
  }
}

// ── Programmatic SEO pages — src/data/seo ─────────────────────────────────────
// Alternatives, comparisons, free collections, guides, and their hub pages.
{
  for (const page of seoPages) {
    routes.push({ path: seoPagePath(page), lastmod: page.updated });
  }
  const latest = seoPages.map((p) => p.updated).sort().at(-1) ?? today;
  for (const index of seoIndexPages) {
    routes.push({ path: index.path, lastmod: latest });
  }
}

// ── Emit XML ──────────────────────────────────────────────────────────────────
// De-dupe by path (defensive) and sort for stable, diff-friendly output.
const seen = new Set<string>();
const unique = routes
  .filter((r) => (seen.has(r.path) ? false : (seen.add(r.path), true)))
  .sort((a, b) => a.path.localeCompare(b.path));
const uniqueInternalRoutes = [...new Set(internalRoutes)].sort();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r.path === '' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
if (!fs.existsSync(WORKER_DIR)) fs.mkdirSync(WORKER_DIR);
fs.writeFileSync(
  path.join(WORKER_DIR, 'routes.generated.ts'),
  `// This file is auto-generated by scripts/generate-sitemap.ts
// Do not edit by hand.

export const knownRoutes = ${JSON.stringify(
    unique.map((route) => route.path || '/'),
    null,
    2,
  )} as const;

export const internalRoutes = ${JSON.stringify(uniqueInternalRoutes, null, 2)} as const;
`,
);

// ── Catalog link lists for SEO hub pages ─────────────────────────────────────
const sharedBlockDescriptionSlugs = [...blockDescriptions.entries()]
  .filter(([text, slugs]) => !text || slugs.length > 1)
  .flatMap(([, slugs]) => slugs)
  .sort();
for (const list of Object.values(catalogLinks)) {
  list.sort((a, b) => a.title.localeCompare(b.title));
}
fs.writeFileSync(
  path.join(SEO_DIR, 'catalog-links.generated.ts'),
  `// This file is auto-generated by scripts/generate-sitemap.ts
// Do not edit by hand.

import type { CatalogListKind } from './types';

export type CatalogLink = { title: string; href: string; category?: string };

export const catalogLinks: Record<CatalogListKind, CatalogLink[]> = ${JSON.stringify(catalogLinks, null, 2)};

/** Block slugs whose description is shared with other blocks or empty. */
export const sharedBlockDescriptionSlugs: string[] = ${JSON.stringify(sharedBlockDescriptionSlugs, null, 2)};
`,
);

// ── llms.txt: keep the SEO page section in sync ──────────────────────────────
{
  const llmsPath = path.join(PUBLIC_DIR, 'llms.txt');
  const start = '<!-- seo-pages:start -->';
  const end = '<!-- seo-pages:end -->';
  const section = [
    start,
    '## Guides, Comparisons, and Free Collections',
    ...seoIndexPages.map(
      (index) => `- [${index.h1}](${BASE_URL}${index.path}): ${index.description}`,
    ),
    ...seoPages.map(
      (page) => `- [${page.h1}](${BASE_URL}${seoPagePath(page)}): ${page.description}`,
    ),
    end,
  ].join('\n');
  const current = fs.readFileSync(llmsPath, 'utf-8');
  const next = current.includes(start)
    ? current.replace(new RegExp(`${start}[\\s\\S]*?${end}`), section)
    : `${current.trimEnd()}\n\n${section}\n`;
  fs.writeFileSync(llmsPath, next);
}

console.log(`Sitemap generated with ${unique.length} routes.`);
