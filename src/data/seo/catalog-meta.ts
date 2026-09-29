/**
 * Search-tuned titles and descriptions for catalog category pages.
 *
 * Shared by the React pages (via SEOHead) and the Worker (raw HTML injection),
 * so crawlers that never run JavaScript see the same title the app renders.
 * Keep this file free of React and Vite-only imports: the Worker bundles it.
 *
 * Titles follow the queries people actually search (Google autocomplete,
 * see docs/seo.md): "react X component", "shadcn X", "free tailwind X".
 */

export interface CategorySeo {
  /** Title without the " | Watermelon UI" suffix. */
  title: string;
  description: string;
  /** Visible page heading. */
  h1: string;
}

type CategoryTerms = { noun: string; plural: string; blurb: string };

const componentTerms: Record<string, CategoryTerms> = {
  accordion: { noun: 'Accordion', plural: 'accordions', blurb: 'FAQ lists, settings panels, and nested navigation' },
  alerts: { noun: 'Alert', plural: 'alerts', blurb: 'success, warning, error, and inline status messages' },
  avatar: { noun: 'Avatar', plural: 'avatars', blurb: 'user images, initials fallbacks, groups, and status dots' },
  badge: { noun: 'Badge', plural: 'badges', blurb: 'status labels, counters, and tags' },
  breadcrumb: { noun: 'Breadcrumb', plural: 'breadcrumbs', blurb: 'page hierarchy, collapsed paths, and dropdown crumbs' },
  button: { noun: 'Button', plural: 'buttons', blurb: 'primary, icon, loading, and animated buttons' },
  'button-group': { noun: 'Button Group', plural: 'button groups', blurb: 'segmented controls, toolbars, and split buttons' },
  calendar: { noun: 'Calendar', plural: 'calendars', blurb: 'single dates, ranges, and multi-month views' },
  card: { noun: 'Card', plural: 'cards', blurb: 'product, pricing, profile, and stat cards' },
  checkbox: { noun: 'Checkbox', plural: 'checkboxes', blurb: 'forms, task lists, and indeterminate states' },
  collapsible: { noun: 'Collapsible', plural: 'collapsibles', blurb: 'show more sections, file trees, and expandable rows' },
  combobox: { noun: 'Combobox', plural: 'comboboxes', blurb: 'searchable selects, autocomplete, and multi select' },
  'data-table': { noun: 'Data Table', plural: 'data tables', blurb: 'sorting, filtering, pagination, and row selection' },
  'date-picker': { noun: 'Date Picker', plural: 'date pickers', blurb: 'single dates, date ranges, and presets' },
  dialog: { noun: 'Dialog', plural: 'dialogs and modals', blurb: 'confirmations, forms, and alert dialogs' },
  'dropdown-menu': { noun: 'Dropdown Menu', plural: 'dropdown menus', blurb: 'action menus, account menus, and nested submenus' },
  form: { noun: 'Form', plural: 'forms', blurb: 'validation with react-hook-form and zod, sign up, and settings forms' },
  'input-mask': { noun: 'Input Mask', plural: 'masked inputs', blurb: 'phone numbers, cards, dates, and currency' },
  'input-otp': { noun: 'OTP Input', plural: 'OTP inputs', blurb: 'one-time codes, verification, and PIN entry' },
  pagination: { noun: 'Pagination', plural: 'pagination controls', blurb: 'tables, lists, and search results' },
  popover: { noun: 'Popover', plural: 'popovers', blurb: 'inline editors, pickers, and contextual info' },
  'radio-group': { noun: 'Radio Group', plural: 'radio groups', blurb: 'plan pickers, option cards, and settings' },
  select: { noun: 'Select', plural: 'selects', blurb: 'native style, grouped, and searchable selects' },
  sheet: { noun: 'Sheet', plural: 'sheets and drawers', blurb: 'side panels, mobile drawers, and filters' },
  sonner: { noun: 'Toast', plural: 'toasts (Sonner)', blurb: 'notifications, promise toasts, and actions' },
  switch: { noun: 'Switch', plural: 'switches', blurb: 'settings toggles and on/off states' },
  table: { noun: 'Table', plural: 'tables', blurb: 'invoices, pricing comparisons, and simple lists' },
  tabs: { noun: 'Tabs', plural: 'tabs', blurb: 'animated, underline, pill, and vertical tabs' },
  textarea: { noun: 'Textarea', plural: 'textareas', blurb: 'comments, auto-resize, and character counts' },
  tooltip: { noun: 'Tooltip', plural: 'tooltips', blurb: 'icon hints, keyboard shortcuts, and rich content' },
};

const blockTerms: Record<string, CategoryTerms> = {
  hero: { noun: 'Hero Section', plural: 'hero sections', blurb: 'landing pages, SaaS launches, and product pages' },
  auth: { noun: 'Login Page', plural: 'login and sign up pages', blurb: 'sign in, sign up, and password reset screens' },
  footer: { noun: 'Footer', plural: 'footers', blurb: 'link columns, newsletters, and legal rows' },
  navigation: { noun: 'Navbar', plural: 'navbars', blurb: 'responsive headers, mega menus, and mobile menus' },
  pricing: { noun: 'Pricing Section', plural: 'pricing sections', blurb: 'plan cards, monthly and yearly toggles, and comparison tables' },
  bento: { noun: 'Bento Grid', plural: 'bento grids', blurb: 'feature showcases and product overviews' },
  testimonials: { noun: 'Testimonials Section', plural: 'testimonial sections', blurb: 'quotes, review walls, and customer logos' },
  cta: { noun: 'CTA Section', plural: 'call to action sections', blurb: 'sign up prompts and closing sections' },
  feature: { noun: 'Features Section', plural: 'feature sections', blurb: 'feature grids and product highlights' },
  faq: { noun: 'FAQ Section', plural: 'FAQ sections', blurb: 'accordions and two column question lists' },
  stats: { noun: 'Stats Section', plural: 'stats sections', blurb: 'metrics, KPIs, and social proof numbers' },
  team: { noun: 'Team Section', plural: 'team sections', blurb: 'people grids and about pages' },
  contact: { noun: 'Contact Form', plural: 'contact sections', blurb: 'contact forms, support pages, and office info' },
  newsletter: { noun: 'Newsletter Section', plural: 'newsletter sign up sections', blurb: 'email capture and waitlists' },
  error: { noun: '404 Page', plural: '404 and error pages', blurb: 'not found, server error, and maintenance screens' },
  blog: { noun: 'Blog Section', plural: 'blog sections', blurb: 'post grids, article lists, and featured posts' },
  career: { noun: 'Careers Section', plural: 'careers sections', blurb: 'job listings and hiring pages' },
  announcement: { noun: 'Announcement Bar', plural: 'announcement bars', blurb: 'launch banners and promo strips' },
  'file-upload': { noun: 'File Upload', plural: 'file upload blocks', blurb: 'drag and drop dropzones and upload progress' },
  integrations: { noun: 'Integrations Section', plural: 'integration sections', blurb: 'logo grids and app directories' },
  notification: { noun: 'Notification', plural: 'notification blocks', blurb: 'inboxes, activity feeds, and alerts' },
  widget: { noun: 'Widget', plural: 'widgets', blurb: 'dashboard cards and compact tools' },
};

function count(n?: number) {
  return n && n > 1 ? `${n} ` : '';
}

export function componentCategorySeo(slug: string, variants?: number): CategorySeo | null {
  const t = componentTerms[slug];
  if (!t) return null;
  return {
    title: `React ${t.noun} Component, Free shadcn ${t.noun}`,
    h1: `React ${t.noun} Components`,
    description: `${count(variants)}free React ${t.plural} built with Tailwind CSS and shadcn/ui conventions. Copy the code or install with the shadcn CLI. Great for ${t.blurb}.`,
  };
}

export function blockCategorySeo(slug: string, blocks?: number): CategorySeo | null {
  const t = blockTerms[slug];
  if (!t) return null;
  return {
    title: `Free React ${t.noun} Blocks, Tailwind & shadcn`,
    h1: `React ${t.noun} Blocks`,
    description: `${count(blocks)}free React ${t.plural} built with Tailwind CSS, ready to copy or install with the shadcn CLI. Made for ${t.blurb}.`,
  };
}
