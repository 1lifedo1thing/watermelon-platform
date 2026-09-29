/**
 * Notifies IndexNow (Bing, Yandex, and others; Bing also feeds ChatGPT search)
 * about recently changed URLs, so they are recrawled without waiting.
 *
 * Reads public/sitemap.xml and submits URLs whose <lastmod> is within the
 * last DAYS days. Pass --all to submit every URL (use sparingly), or
 * --dry-run to print what would be sent without sending anything.
 *
 * The key is public by design: IndexNow verifies ownership by fetching
 * https://ui.watermelon.sh/<key>.txt, which lives in public/.
 *
 * Run after a deploy: bun run scripts/indexnow.ts
 */
import fs from 'fs';
import path from 'path';

const KEY = 'd97224696ba3247dca8c88175137e52c';
const HOST = 'ui.watermelon.sh';
const DAYS = 2;

const sitemap = fs.readFileSync(path.join(process.cwd(), 'public/sitemap.xml'), 'utf-8');
const cutoff = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const submitAll = process.argv.includes('--all');
const unknown = process.argv.slice(2).filter((arg) => !['--all', '--dry-run'].includes(arg));
if (unknown.length) {
  console.error(`Unknown option: ${unknown.join(' ')}. Use --all or --dry-run.`);
  process.exit(1);
}

const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
  .filter(([, , lastmod]) => submitAll || lastmod >= cutoff)
  .map(([, loc]) => loc);

if (!urls.length) {
  console.log('IndexNow: no recently changed URLs.');
  process.exit(0);
}

if (process.argv.includes('--dry-run')) {
  console.log(`IndexNow dry run: would submit ${urls.length} URLs.`);
  console.log(urls.join('\n'));
  process.exit(0);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls.slice(0, 10000),
  }),
});

// 200 and 202 both mean accepted.
console.log(`IndexNow: submitted ${urls.length} URLs, status ${response.status}.`);
if (response.status >= 400) process.exit(1);
