/**
 * Lists programmatic SEO pages that get no search clicks, as pruning candidates.
 *
 * Usage:
 *   1. Google Search Console → Performance → Pages, last 28 days → Export → CSV.
 *   2. bun run scripts/seo-prune-report.ts path/to/Pages.csv
 *
 * Report only. Nothing is deleted: improve or merge weak pages first, and give
 * new pages at least 4 to 6 weeks before judging them.
 */
import fs from 'fs';
import { SITE_URL, seoPagePath, seoPages } from '../src/data/seo';

const file = process.argv[2];
if (!file) {
  console.error('Usage: bun run scripts/seo-prune-report.ts <Search Console Pages.csv>');
  process.exit(1);
}

const [header, ...lines] = fs.readFileSync(file, 'utf-8').trim().split(/\r?\n/);
const columns = header.split(',').map((c) => c.trim().toLowerCase());
const pageCol = columns.findIndex((c) => c.includes('page'));
const clicksCol = columns.indexOf('clicks');
const impressionsCol = columns.indexOf('impressions');
if (pageCol < 0 || clicksCol < 0 || impressionsCol < 0) {
  console.error(`Expected Page, Clicks, and Impressions columns. Found: ${header}`);
  process.exit(1);
}

const stats = new Map<string, { clicks: number; impressions: number }>();
for (const line of lines) {
  const cells = line.split(',');
  const url = cells[pageCol].replace(/\/$/, '');
  stats.set(url, { clicks: Number(cells[clicksCol]), impressions: Number(cells[impressionsCol]) });
}

const rows = seoPages.map((page) => {
  const url = `${SITE_URL}${seoPagePath(page)}`;
  return { url, updated: page.updated, ...(stats.get(url) ?? { clicks: 0, impressions: 0 }) };
});

const dead = rows.filter((r) => r.clicks === 0).sort((a, b) => a.impressions - b.impressions);
const winners = rows.filter((r) => r.clicks > 0).sort((a, b) => b.clicks - a.clicks);

console.log(`\nPruning candidates (0 clicks): ${dead.length} of ${rows.length}`);
console.table(dead);
console.log(`\nPages with clicks: ${winners.length}`);
console.table(winners);
console.log(
  '\nZero impressions usually means not indexed yet or no demand. Impressions without clicks usually means the title or description needs work.',
);
