# SEO

ui.watermelon.sh is a client-rendered SPA. Crawlers that do not run JavaScript
only see what the Worker puts into `index.html`, so SEO has two halves:

- **React** sets `<head>` tags through `SEOHead` after the app loads.
- **The Worker** (`worker/site.ts` and `worker/seo-html.ts`) injects the same
  title, description, canonical, Open Graph tags, JSON-LD, and a crawlable body
  into the raw HTML for every known route.

Keep the two in sync. When you change a page title in React, change the
matching entry in `worker/seo-html.ts`.

## Programmatic pages

Alternatives, comparisons, free collections, and guides live as data in
`src/data/seo/pages/*.ts` and render at:

| Route | Kind |
| --- | --- |
| `/alternatives/:slug` | Watermelon as an alternative to another library |
| `/compare/:slug` | Two other libraries compared |
| `/free/:slug` | A free collection built from the live catalog |
| `/guides/:slug` | One question, answered directly |
| `/alternatives`, `/free`, `/guides` | Hub pages that list the above |

To add a page, add an object to the right file. The route, sitemap entry,
`llms.txt` line, raw HTML, and JSON-LD are all generated from it.

Rules, enforced by `worker/seo.test.ts` (`bun test worker`):

- Unique title, description, and H1. Descriptions are 120 to 170 characters.
- The first intro paragraph answers the search query directly.
- 3 to 6 `related` pages, and every internal link points at a real route.
- No em dashes in copy.
- No ratings or reviews in JSON-LD.
- Comparisons are fair: say where the other library is stronger, and only state
  facts confirmed on its official site. Leave out prices you cannot confirm.

## Category page titles

`src/data/seo/catalog-meta.ts` holds search-tuned titles for `/components/:category`
and `/blocks/:category`, such as "React Accordion Component, Free shadcn Accordion".
They follow what people actually search, based on Google autocomplete
data. "shadcn" and "free" are strong modifiers.

## Detail pages

`blockDetailSeo`, `animatedDetailSeo`, and `dashboardDetailSeo` in
`catalog-meta.ts` title every block, animated component, and dashboard page.
Blocks whose description is shared with other blocks (category boilerplate)
get a specific generated description instead; the list of those slugs is
generated into `catalog-links.generated.ts`.

## Share images

`bun run generate:og` (part of the build) renders 1200x630 PNG cards into
`public/og` (git-ignored) for SEO pages, hubs, and category and listing pages.
Detail pages use their own preview image. AVIF images are never used for
sharing because X, LinkedIn, and Facebook do not show them.

## IndexNow

After each push deploy, `scripts/indexnow.ts` tells IndexNow (Bing, which also
feeds ChatGPT search) about URLs whose sitemap `<lastmod>` is from the last two
days. The key file lives in `public/`. Use `--dry-run` to preview. The deploy
checks out full git history so `<lastmod>` reflects each file's real last change.

## Pruning

About half of programmatic pages never get traffic. After 4 to 6 weeks, export
Search Console → Performance → Pages as CSV and run:

```bash
bun run scripts/seo-prune-report.ts Pages.csv
```

It lists SEO pages with zero clicks. Improve or merge those pages before deleting any.
