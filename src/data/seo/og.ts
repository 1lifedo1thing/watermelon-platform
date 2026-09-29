import { ogImageRoutes } from './og-images.generated';

/**
 * Social share images. PNG cards are rendered at build time by
 * scripts/generate-og-images.tsx into public/og. PNG, not AVIF: X, LinkedIn,
 * and Facebook do not show AVIF previews.
 */
const routes = new Set<string>(ogImageRoutes);

export function ogImageFileName(pathname: string) {
  const name = pathname.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  return `${name || 'index'}.png`;
}

/**
 * The share image for a page: always our own 1200x630 PNG card (or the
 * default card). Catalog preview images are not used: many 404, and the rest
 * vary in size and format (webp, 3600px PNGs), which X, LinkedIn, and
 * WhatsApp render badly or not at all. `_image` is accepted for callers that
 * still pass one, and ignored.
 */
export function socialImageFor(pathname: string, _image?: string | null) {
  return ogImageForPath(pathname);
}

/** Site-relative image path for a route, falling back to the default card. */
export function ogImageForPath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return routes.has(path) ? `/og/${ogImageFileName(path)}` : '/og/default.png';
}
