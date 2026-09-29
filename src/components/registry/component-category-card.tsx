import { Link } from 'react-router-dom';
import { ResilientImage } from '@/components/ui/resilient-image';
import { cn } from '@/lib/utils';

interface ComponentCategoryCardProps {
  slug: string;
  label: string;
  variantCount: number;
  className?: string;
}

/**
 * Image card for a UI component category (/components/:slug), shared by the
 * home page row and the /components grid so they always look the same.
 */
export function ComponentCategoryCard({ slug, label, variantCount, className }: ComponentCategoryCardProps) {
  return (
    <Link
      to={`/components/${slug}`}
      id={`ui-category-${slug}`}
      className={cn(
        'group relative block cursor-pointer no-underline',
        'rounded-4xl p-2',
        'bg-gray-100',
        'dark:border-0 dark:bg-neutral-800',
        'backdrop-blur-xl backdrop-saturate-150',
        'shadow-[inset_0_1px_0_0_var(--color-gray-200),inset_0_2px_0_0_rgba(255,255,255,1)]',
        'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
        'transition-all duration-300',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
        className,
      )}
    >
      <div className="relative z-10 flex items-center justify-between gap-4 px-2 pt-2 pb-3">
        <span className="min-w-0 text-foreground truncate text-base leading-tight font-medium">
          {label}
        </span>
        <span className="shrink-0 text-muted-foreground text-xs capitalize whitespace-nowrap">
          {variantCount} {variantCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div
        className={cn(
          'relative aspect-4/3 w-full overflow-hidden rounded-[20px]',
          'bg-muted',
          'border border-neutral-200/50 dark:border-white/5',
          'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]',
          'dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]',
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[20px] ring-1 ring-white/20 ring-inset dark:ring-white/5"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-white transition-colors duration-300 dark:bg-black">
          <ResilientImage
            src={`/cdn/components/${slug}.png`}
            alt={`${label} preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            fallback={
              <div className="space-y-2 p-4 text-center">
                <div className="text-4xl">⚛️</div>
                <p className="text-sm font-medium text-neutral-500">{label}</p>
              </div>
            }
          />
        </div>
      </div>
    </Link>
  );
}
