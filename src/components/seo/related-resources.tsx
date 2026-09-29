import { Link } from 'react-router-dom';
import { relatedSeoPagesFor, seoPagePath, type CatalogListKind } from '@/data/seo';
import { cn } from '@/lib/utils';

/** A small row of links from a catalog page to related guides and collections. */
export function RelatedResources({ kind, className }: { kind: CatalogListKind; className?: string }) {
  const pages = relatedSeoPagesFor(kind);
  if (!pages.length) return null;

  return (
    <nav aria-label="Related resources" className={cn('border-border border-t pt-6', className)}>
      <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
        Related resources
      </h2>
      <ul className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              to={seoPagePath(page)}
              className="border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground inline-block rounded-full border px-3 py-1.5 text-xs transition-colors"
            >
              {page.h1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
