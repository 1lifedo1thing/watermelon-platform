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
 * The share image for a page: its own preview image when social networks can
 * show it (not AVIF), otherwise the route's card or the default card.
 */
export function socialImageFor(pathname: string, image?: string | null) {
  if (image && !/\.avif(\?|$)/i.test(image)) return image;
  return ogImageForPath(pathname);
}

/** Site-relative image path for a route, falling back to the default card. */
export function ogImageForPath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return routes.has(path) ? `/og/${ogImageFileName(path)}` : '/og/default.png';
}
