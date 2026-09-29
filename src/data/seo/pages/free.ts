import type { SeoPage } from '../types';

const updated = '2026-09-29';

export const freePages: SeoPage[] = [
  {
    kind: 'free',
    slug: 'react-dashboard-templates',
    title: 'Free React Dashboard Templates (Next.js, Tailwind, shadcn)',
    description:
      'Free React dashboard templates built with Tailwind CSS and shadcn conventions. Admin, SaaS, finance, and health dashboards you can copy into Next.js or Vite.',
    h1: 'Free React Dashboard Templates',
    primaryKeyword: 'free react dashboard template',
    secondaryKeywords: [
      'react admin dashboard template',
      'next js dashboard template',
      'shadcn dashboard template',
      'tailwind dashboard template',
      'react saas dashboard template',
    ],
    intro: [
      'Watermelon UI has a set of free React dashboard templates you can preview live, read the full source for, and copy into your own project. Every dashboard is built with React, TypeScript, and Tailwind CSS, uses shadcn-style components, and is MIT licensed, so you can use it in client and commercial work.',
      'Each template is a complete working screen, not a screenshot. You get the layout, sidebar, charts, tables, and cards together, which is the slow part of starting a dashboard from scratch.',
    ],
    sections: [
      {
        heading: 'Browse the dashboards',
        paragraphs: [
          'Open any dashboard to see a live preview at desktop, tablet, and phone widths, then switch to the code tab to copy the files.',
        ],
        catalog: { kind: 'dashboards' },
      },
      {
        heading: 'What you get in each template',
        bullets: [
          'A responsive app shell with a collapsible sidebar and top bar.',
          'Charts built with Recharts, plus KPI and stat cards.',
          'Data tables, filters, and detail panels wired with realistic sample data.',
          'Light and dark mode through Tailwind CSS variables.',
          'Plain React components with no paid license, no account, and no lock-in.',
        ],
      },
      {
        heading: 'Next.js or Vite',
        paragraphs: [
          'The dashboards are framework-agnostic React. Drop them into a Next.js App Router page or a Vite + React app. If your project already uses shadcn/ui, the components follow the same file structure and `cn` utility, so they sit next to your existing components. See [installation](/installation) and [framework support](/framework-support) for setup.',
        ],
      },
      {
        heading: 'Build your own dashboard from parts',
        paragraphs: [
          'Need something different? Combine a layout from a template with individual pieces: [data tables](/components/data-table), [cards](/components/card), [tabs](/components/tabs), [date pickers](/components/date-picker), and [widget blocks](/blocks/widget). The guide on [building a React dashboard fast](/guides/build-react-dashboard-fast) walks through the process.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are these React dashboard templates really free?',
        answer:
          'Yes. Every dashboard on Watermelon UI is free and MIT licensed, including for commercial projects. There is no paid tier and no sign up.',
      },
      {
        question: 'Do the templates work with Next.js?',
        answer:
          'Yes. They are standard React and Tailwind CSS components, so they work in Next.js, Vite, and other React frameworks.',
      },
      {
        question: 'Are these shadcn dashboard templates?',
        answer:
          'They follow shadcn/ui conventions, Tailwind CSS variables, and the same component patterns, so they fit into a shadcn project without extra setup.',
      },
    ],
    related: [
      '/guides/build-react-dashboard-fast',
      '/free/react-components',
      '/free/tailwind-blocks',
      '/alternatives/tailwind-ui',
      '/alternatives/untitled-ui',
    ],
    updated,
  },
  {
    kind: 'free',
    slug: 'animated-react-components',
    title: 'Free Animated React Components (Motion + Tailwind)',
    description:
      'Free animated React components built with Motion and Tailwind CSS. Copy-paste buttons, cards, tabs, carousels, and micro-interactions with full source.',
    h1: 'Free Animated React Components',
    primaryKeyword: 'free animated react components',
    secondaryKeywords: [
      'animated react components library',
      'react animated components free',
      'animated ui components for react and tailwind',
      'react micro interactions',
    ],
    intro: [
      'Watermelon UI has 130+ free animated React components built with Motion (formerly Framer Motion) and Tailwind CSS. Each one has a live demo, the full source, and a one-line shadcn CLI install, and they are all MIT licensed.',
      'The collection leans toward real product interactions, like a swipeable card, a dock, a continuous tab indicator, or a copy button that confirms. These are the details that make an interface feel finished.',
    ],
    sections: [
      {
        heading: 'Popular animated components',
        catalog: { kind: 'animated-components', limit: 24 },
      },
      {
        heading: 'Browse by category',
        bullets: [
          '[Micro-interactions](/animated-components/category/micro-interaction): small feedback moments for buttons, toggles, and inputs.',
          '[Animated cards](/animated-components/category/cards): swipeable, expandable, and stacked cards.',
          '[Animated buttons](/animated-components/category/buttons): loading, success, and hover states.',
          '[Animated tabs](/animated-components/category/tabs): sliding indicators and continuous tabs.',
          '[Widgets](/animated-components/category/widgets): compact animated dashboard widgets.',
          '[Carousels](/animated-components/category/carousel) and [sliders](/animated-components/category/sliders).',
        ],
      },
      {
        heading: 'How to install one',
        paragraphs: [
          'Every component has a registry URL. Run `npx shadcn@latest add` with that URL and the files land in your components folder with dependencies installed. You can also copy the code by hand. The guide on [adding animated components to React](/guides/add-animated-components-to-react) covers both paths.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which animation library do these components use?',
        answer:
          'Most use Motion (the library formerly called Framer Motion) with Tailwind CSS for styling. Each component page lists its exact dependencies.',
      },
      {
        question: 'Can I use them in commercial projects?',
        answer: 'Yes. Watermelon UI is MIT licensed and free for personal and commercial use.',
      },
    ],
    related: [
      '/guides/add-animated-components-to-react',
      '/alternatives/aceternity-ui',
      '/alternatives/magic-ui',
      '/compare/aceternity-ui-vs-magic-ui',
      '/free/react-components',
    ],
    updated,
  },
  {
    kind: 'free',
    slug: 'react-components',
    title: 'Free React Components Library for Tailwind and shadcn',
    description:
      'A free, open source React components library with 500+ Tailwind CSS components. Install with the shadcn CLI or copy the code. MIT licensed, no sign up.',
    h1: 'Free React Components for Tailwind CSS',
    primaryKeyword: 'free react components',
    secondaryKeywords: [
      'free react components library',
      'free open source react components',
      'free react tailwind components',
      'react components copy paste',
      'free react ui components',
    ],
    intro: [
      'Watermelon UI is a free, open source library of React components for Tailwind CSS. It has more than 500 component variants across 30 categories, from buttons and dialogs to data tables and date pickers. You can install each one with the shadcn CLI or copy and paste the code, and everything is MIT licensed.',
      'Because the code is copied into your project, you own it. You can edit the markup, restyle it, or delete what you do not need without waiting on a library release.',
    ],
    sections: [
      {
        heading: 'Component categories',
        catalog: { kind: 'components' },
      },
      {
        heading: 'Beyond single components',
        bullets: [
          '[Blocks](/blocks): full page sections like hero sections, pricing, footers, and login pages.',
          '[Animated components](/animated-components): motion-rich interactions.',
          '[Dashboards](/dashboards): complete admin and SaaS screens.',
          '[Templates](/templates): full landing pages composed from blocks.',
        ],
      },
      {
        heading: 'Why copy-paste instead of an npm package',
        paragraphs: [
          'A copy-paste library gives you the source instead of a dependency. You get full control over styling and behavior, and there is no version upgrade that breaks your UI. The tradeoff is that you maintain the code yourself. Read [copy-paste vs installed component libraries](/guides/copy-paste-vs-component-library) for the full comparison.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Watermelon UI free?',
        answer:
          'Yes. All components, blocks, dashboards, and templates are free and MIT licensed. There is no pro tier.',
      },
      {
        question: 'Does it work with shadcn/ui?',
        answer:
          'Yes. Components are published as a shadcn registry, so `npx shadcn@latest add` installs them into an existing shadcn project.',
      },
      {
        question: 'Do I need Tailwind CSS?',
        answer: 'Yes. Components are styled with Tailwind CSS utility classes and CSS variables.',
      },
    ],
    related: [
      '/alternatives/shadcn-ui',
      '/guides/best-free-shadcn-alternatives',
      '/guides/copy-paste-vs-component-library',
      '/free/tailwind-blocks',
      '/free/animated-react-components',
    ],
    updated,
  },
  {
    kind: 'free',
    slug: 'tailwind-blocks',
    title: 'Free Tailwind Blocks for React (Open Source)',
    description:
      'Free, open source Tailwind CSS blocks for React: hero sections, pricing, footers, navbars, login pages, and more. Copy the code or install with the shadcn CLI.',
    h1: 'Free Tailwind Blocks for React',
    primaryKeyword: 'free tailwind blocks',
    secondaryKeywords: [
      'tailwind blocks free',
      'open source tailwind blocks',
      'free tailwind ui blocks',
      'shadcn blocks',
      'tailwind ui blocks free',
    ],
    intro: [
      'Watermelon UI has 180+ free Tailwind CSS blocks for React. They are complete page sections like hero sections, pricing tables, footers, navbars, and login pages, ready to copy into a landing page or app. They are open source, MIT licensed, and each one installs with a single shadcn CLI command.',
      'Blocks save the most time when you are building a marketing site. Instead of assembling a pricing section from buttons and cards, you start from a finished section and change the copy.',
    ],
    sections: [
      {
        heading: 'Block categories',
        bullets: [
          '[Hero sections](/blocks/hero)',
          '[Footers](/blocks/footer)',
          '[Login and sign up pages](/blocks/auth)',
          '[Navbars](/blocks/navigation)',
          '[Pricing sections](/blocks/pricing)',
          '[Bento grids](/blocks/bento)',
          '[Testimonials](/blocks/testimonials)',
          '[FAQ sections](/blocks/faq)',
          '[CTA sections](/blocks/cta)',
          '[404 pages](/blocks/error)',
          '[Contact forms](/blocks/contact)',
          '[Newsletter sections](/blocks/newsletter)',
        ],
      },
      {
        heading: 'A sample of the blocks',
        catalog: { kind: 'blocks', limit: 18 },
      },
      {
        heading: 'A free alternative to paid block libraries',
        paragraphs: [
          'Paid kits like Tailwind Plus (formerly Tailwind UI) are excellent, but they require a license. If you want free blocks with full React source, Watermelon is a good place to start. See the [Tailwind UI alternative](/alternatives/tailwind-ui) page for an honest comparison.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are these Tailwind blocks free for commercial use?',
        answer: 'Yes. Every block is MIT licensed and free for commercial projects.',
      },
      {
        question: 'Are these shadcn blocks?',
        answer:
          'They follow shadcn/ui conventions and are published as a shadcn registry, so they install with `npx shadcn@latest add` into any shadcn project.',
      },
    ],
    related: [
      '/free/landing-page-components',
      '/alternatives/tailwind-ui',
      '/guides/is-tailwind-ui-free',
      '/alternatives/flowbite',
      '/alternatives/preline',
    ],
    updated,
  },
  {
    kind: 'free',
    slug: 'landing-page-components',
    title: 'Free React Landing Page Components and Templates',
    description:
      'Build a landing page in React with free components: hero, features, pricing, testimonials, FAQ, CTA, and footer sections styled with Tailwind CSS.',
    h1: 'Free React Landing Page Components',
    primaryKeyword: 'free landing page components react',
    secondaryKeywords: [
      'react landing page template free',
      'next js landing page template free',
      'shadcn landing page template',
      'tailwind landing page',
    ],
    intro: [
      'You can build a complete React landing page for free by stacking Watermelon UI blocks: a hero, a features section, pricing, testimonials, an FAQ, a call to action, and a footer. Every section is written in React with Tailwind CSS, is MIT licensed, and works in Next.js or Vite.',
      'If you want to start from a finished page, open a [template](/templates), which is a full landing page composed from these same blocks.',
    ],
    sections: [
      {
        heading: 'A landing page, section by section',
        table: {
          columns: ['Section', 'What it does', 'Blocks'],
          rows: [
            ['Navbar', 'Navigation and primary CTA', '[Navbars](/blocks/navigation)'],
            ['Hero', 'Headline, subhead, and main action', '[Hero sections](/blocks/hero)'],
            ['Features', 'Explains what the product does', '[Feature sections](/blocks/feature), [bento grids](/blocks/bento)'],
            ['Social proof', 'Builds trust with numbers and quotes', '[Stats](/blocks/stats), [testimonials](/blocks/testimonials)'],
            ['Pricing', 'Plans and billing toggle', '[Pricing sections](/blocks/pricing)'],
            ['FAQ', 'Handles objections', '[FAQ sections](/blocks/faq)'],
            ['CTA', 'Closing call to action', '[CTA sections](/blocks/cta)'],
            ['Footer', 'Links, legal, and newsletter', '[Footers](/blocks/footer)'],
          ],
        },
      },
      {
        heading: 'Full page templates',
        catalog: { kind: 'templates' },
      },
    ],
    faqs: [
      {
        question: 'Can I use these blocks for a Next.js landing page?',
        answer:
          'Yes. The blocks are plain React components, so they work in the Next.js App Router, the Pages Router, and Vite.',
      },
      {
        question: 'Is there a free shadcn landing page template?',
        answer:
          'Yes. The templates on Watermelon UI use shadcn conventions and are free under the MIT license.',
      },
    ],
    related: [
      '/free/tailwind-blocks',
      '/free/animated-react-components',
      '/alternatives/tailwind-ui',
      '/guides/ui-components-for-vibe-coding',
      '/free/react-components',
    ],
    updated,
  },
];
