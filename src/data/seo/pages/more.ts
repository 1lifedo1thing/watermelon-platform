import type { SeoPage } from '../types';

/**
 * Second batch, from keyword demand in Google autocomplete ("shadcn vs antd",
 * "shadcn free or paid", "shadcn alternative for vue/angular/svelte").
 * Facts checked 2026-09-29 against official docs, GitHub, and npm.
 */
const updated = '2026-09-29';

export const moreComparePages: SeoPage[] = [
  {
    kind: 'compare',
    slug: 'shadcn-vs-bootstrap',
    title: 'shadcn/ui vs Bootstrap: Modern React UI or Classic CSS',
    description:
      'shadcn/ui vs Bootstrap compared: React components you own, styled with Tailwind, versus the classic CSS framework with its own JavaScript plugins.',
    h1: 'shadcn/ui vs Bootstrap',
    primaryKeyword: 'shadcn vs bootstrap',
    secondaryKeywords: ['bootstrap vs shadcn', 'bootstrap alternative react', 'react bootstrap vs shadcn'],
    intro: [
      'shadcn/ui is a set of React components you copy into your project and style with Tailwind CSS. Bootstrap is a CSS framework with its own class names and vanilla JavaScript plugins, usable from any stack. For a new React app with a custom design, shadcn/ui is usually the better fit. For server-rendered pages or a team that already knows Bootstrap, Bootstrap is still a solid choice.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'shadcn/ui', 'Bootstrap'],
          rows: [
            ['What it is', 'React component source', 'CSS framework plus JavaScript plugins'],
            ['Styling', 'Tailwind CSS utilities', 'Bootstrap classes and Sass variables'],
            ['Frameworks', 'React', 'Any, including plain HTML'],
            ['React bindings', 'Native', 'Through React Bootstrap'],
            ['Current version', 'shadcn CLI 4.x', 'Bootstrap 5.3'],
            ['License', 'MIT', 'MIT'],
          ],
        },
      },
      {
        heading: 'Why teams move from Bootstrap to shadcn/ui',
        bullets: [
          'Sites built on Bootstrap tend to look alike unless you invest in theming.',
          'Component behavior lives in React state instead of DOM plugins.',
          'Tailwind makes one-off layout changes quick without writing new CSS.',
        ],
        paragraphs: [
          'If you are migrating, rebuild one screen at a time with [free React components](/free/react-components) and [page blocks](/free/tailwind-blocks) instead of converting everything at once.',
        ],
      },
    ],
    related: ['/compare/shadcn-vs-material-ui', '/compare/shadcn-vs-ant-design', '/compare/shadcn-vs-tailwind-css', '/free/react-components'],
    updated,
  },
  {
    kind: 'compare',
    slug: 'shadcn-vs-ant-design',
    title: 'shadcn/ui vs Ant Design (antd): Which Fits Your App?',
    description:
      'shadcn/ui vs Ant Design (antd) compared: Tailwind copy-paste components versus a large enterprise React library with CSS-in-JS styling and rich data components.',
    h1: 'shadcn/ui vs Ant Design',
    primaryKeyword: 'shadcn vs antd',
    secondaryKeywords: ['shadcn vs ant design', 'antd vs shadcn', 'ant design alternative tailwind'],
    intro: [
      'Choose Ant Design when you are building a data-heavy internal or enterprise app and want a huge, consistent component set out of the box. Choose shadcn/ui when design control matters, you use Tailwind CSS, and you want the component code in your own repository.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'shadcn/ui', 'Ant Design'],
          rows: [
            ['Model', 'Copy-paste source', 'npm package (antd)'],
            ['Current version', 'shadcn CLI 4.x', 'antd 6'],
            ['Styling', 'Tailwind CSS', 'CSS-in-JS, with CSS variables on by default in v6'],
            ['Design', 'Neutral, yours to theme', 'Ant Design system'],
            ['Strength', 'Custom product and marketing UI', 'Tables, forms, and enterprise screens'],
            ['License', 'MIT', 'MIT'],
          ],
        },
      },
      {
        heading: 'Which to pick',
        bullets: [
          'Admin panels with complex tables and forms, and little design time: Ant Design.',
          'Products where the UI is part of the brand: shadcn/ui plus [dashboard templates](/free/react-dashboard-templates).',
          'Both in one app is possible, but two styling systems add weight. Pick one per app when you can.',
        ],
      },
    ],
    related: ['/compare/shadcn-vs-material-ui', '/compare/shadcn-vs-bootstrap', '/free/react-dashboard-templates', '/guides/copy-paste-vs-component-library'],
    updated,
  },
  {
    kind: 'compare',
    slug: 'shadcn-vs-tailwind-css',
    title: 'shadcn/ui vs Tailwind CSS: Not Either-Or',
    description:
      'shadcn/ui vs Tailwind CSS explained: Tailwind is the styling tool, and shadcn/ui is a set of React components styled with Tailwind. Here is how they fit together.',
    h1: 'shadcn/ui vs Tailwind CSS',
    primaryKeyword: 'shadcn vs tailwind',
    secondaryKeywords: ['tailwind vs shadcn', 'shadcn vs tailwind components', 'do i need tailwind for shadcn'],
    intro: [
      'shadcn/ui and Tailwind CSS are not alternatives. Tailwind CSS is a utility-first CSS framework, the tool you style with. shadcn/ui is a collection of React components already styled with Tailwind, which you copy into your project. If you use shadcn/ui, you are using Tailwind too.',
    ],
    sections: [
      {
        heading: 'How they relate',
        table: {
          columns: ['', 'Tailwind CSS', 'shadcn/ui'],
          rows: [
            ['Layer', 'Styling', 'Components'],
            ['Gives you', 'Utility classes like `flex` and `p-4`', 'Buttons, dialogs, forms, and menus'],
            ['Behavior', 'None, CSS only', 'Accessible behavior through primitives'],
            ['Needs the other', 'No', 'Yes, it is styled with Tailwind'],
          ],
        },
      },
      {
        heading: 'Tailwind components vs building your own',
        paragraphs: [
          'With Tailwind alone you write every component yourself. shadcn/ui gives you the common ones, and libraries like Watermelon UI add finished [blocks](/free/tailwind-blocks), [animated components](/free/animated-react-components), and [dashboards](/free/react-dashboard-templates) on top, all in the same Tailwind style.',
        ],
      },
    ],
    related: ['/guides/is-shadcn-free', '/free/tailwind-blocks', '/compare/shadcn-vs-bootstrap', '/guides/is-tailwind-ui-free'],
    updated,
  },
];

export const moreGuidePages: SeoPage[] = [
  {
    kind: 'guide',
    slug: 'shadcn-for-vue-svelte-angular',
    title: 'shadcn/ui for Vue, Svelte, Angular, and React Native',
    description:
      'Looking for a shadcn alternative for Vue, Svelte, Angular, React Native, or plain HTML? These community ports keep the shadcn copy-paste model outside React.',
    h1: 'shadcn/ui for Vue, Svelte, Angular, React Native, and HTML',
    primaryKeyword: 'shadcn alternative for angular',
    secondaryKeywords: [
      'shadcn alternative for vue',
      'shadcn alternative for svelte',
      'shadcn alternative for react native',
      'shadcn alternative for html',
      'shadcn alternative for laravel',
    ],
    intro: [
      'shadcn/ui itself is React only, but community ports bring the same copy-paste model to other stacks. Use shadcn-vue for Vue, shadcn-svelte for Svelte, spartan/ui for Angular, React Native Reusables for mobile, and Basecoat UI for plain HTML. All of them are MIT licensed.',
    ],
    sections: [
      {
        heading: 'Ports by framework',
        table: {
          columns: ['Framework', 'Project', 'Built on'],
          rows: [
            ['Vue', '[shadcn-vue](https://www.shadcn-vue.com)', 'Reka UI'],
            ['Svelte', '[shadcn-svelte](https://www.shadcn-svelte.com)', 'Bits UI'],
            ['Angular', '[spartan/ui](https://www.spartan.ng)', 'spartan brain primitives'],
            ['React Native', '[React Native Reusables](https://reactnativereusables.com)', 'rn-primitives and Nativewind'],
            ['Plain HTML', '[Basecoat UI](https://basecoatui.com)', 'Tailwind CSS and a little vanilla JavaScript'],
            ['Solid', '[solid-ui](https://www.solid-ui.com)', 'Kobalte and corvu'],
          ],
        },
        paragraphs: [
          'These are community projects, not official shadcn/ui releases. The official shadcn/ui components are React only and can use Base UI, Radix UI, or React Aria underneath.',
        ],
      },
      {
        heading: 'Laravel',
        paragraphs: [
          'You do not need a port for Laravel. The official Laravel starter kits already use shadcn/ui for React, shadcn-vue for Vue, and shadcn-svelte for Svelte, through Inertia. The Livewire kit uses Flux UI instead. With the React kit, Watermelon components install with the same shadcn CLI.',
        ],
      },
      {
        heading: 'React projects',
        paragraphs: [
          'If you are on React, use shadcn/ui directly and add [free React components](/free/react-components), [blocks](/free/tailwind-blocks), and [dashboards](/free/react-dashboard-templates) from Watermelon UI.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does shadcn/ui support Vue?',
        answer: 'Not officially. shadcn-vue is a community port with the same copy-paste model, built on Reka UI.',
      },
      {
        question: 'Is there a shadcn/ui for Angular?',
        answer: 'Yes. spartan/ui is an MIT licensed Angular library inspired by shadcn/ui, with its own CLI.',
      },
    ],
    related: ['/guides/best-free-shadcn-alternatives', '/alternatives/shadcn-ui', '/alternatives/daisyui', '/guides/is-shadcn-free'],
    updated,
  },
  {
    kind: 'guide',
    slug: 'is-shadcn-free',
    title: 'Is shadcn/ui Free? License, Costs, and Paid Add-Ons',
    description:
      'Is shadcn/ui free or paid? shadcn/ui is free and MIT licensed with no paid tier. Here is what costs money around it, like v0, and where to get free extra components.',
    h1: 'Is shadcn/ui Free?',
    primaryKeyword: 'shadcn free or paid',
    secondaryKeywords: ['is shadcn free', 'shadcn license', 'is shadcn free for commercial use'],
    intro: [
      'Yes. shadcn/ui is free and open source under the MIT license, including for commercial projects. There is no paid tier. You copy the components into your project with the shadcn CLI, and the code is yours.',
    ],
    sections: [
      {
        heading: 'What is free and what is paid',
        table: {
          columns: ['Product', 'Price', 'Notes'],
          rows: [
            ['shadcn/ui', 'Free, MIT', 'Components and CLI'],
            ['Tailwind CSS', 'Free, MIT', 'The styling layer shadcn/ui uses'],
            ['v0 by Vercel', 'Free plan plus paid plans', 'AI tool that generates shadcn/ui code'],
            ['Watermelon UI', 'Free, MIT', 'Blocks, dashboards, and animated components for shadcn projects'],
            ['Premium kits', 'Paid', 'For example Tailwind Plus, or Pro tiers of other libraries'],
          ],
        },
      },
      {
        heading: 'Getting more for free',
        paragraphs: [
          'shadcn/ui focuses on core components. For full page sections, dashboards, and motion without paying, add a free registry like Watermelon UI: [Tailwind blocks](/free/tailwind-blocks), [dashboard templates](/free/react-dashboard-templates), and [animated components](/free/animated-react-components).',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I use shadcn/ui in a commercial product?',
        answer: 'Yes. The MIT license allows commercial use. Keep the license notice where the license requires it.',
      },
      {
        question: 'Is v0 free?',
        answer: 'v0 has a free plan with limited monthly credits, and paid plans for heavier use. Check v0.app for current pricing.',
      },
    ],
    related: ['/guides/is-tailwind-ui-free', '/guides/best-free-shadcn-alternatives', '/alternatives/shadcn-ui', '/compare/shadcn-vs-tailwind-css'],
    updated,
  },
  {
    kind: 'guide',
    slug: 'shadcn-sheet-vs-drawer',
    title: 'shadcn Sheet vs Drawer: Which One to Use',
    description:
      'shadcn Sheet vs Drawer: a Sheet is a dialog that slides in from a side, a Drawer is a draggable bottom panel for mobile. Learn when to use each, and what changed.',
    h1: 'shadcn/ui Sheet vs Drawer',
    primaryKeyword: 'shadcn sheet vs drawer',
    secondaryKeywords: ['shadcn drawer vs sheet', 'shadcn drawer', 'shadcn sheet', 'react drawer component'],
    intro: [
      'Use a Sheet for side panels on desktop, like filters, settings, or navigation. Use a Drawer for bottom panels on mobile that people can drag to dismiss. In shadcn/ui, a Sheet extends the Dialog component to slide in from an edge, and a Drawer is a gesture-driven panel.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'Sheet', 'Drawer'],
          rows: [
            ['Built on', 'Dialog', 'Base UI drawer by default, or Vaul with the Radix base'],
            ['Opens from', 'Top, right, bottom, or left', 'Usually the bottom'],
            ['Gestures', 'None', 'Drag to dismiss'],
            ['Best for', 'Desktop side panels', 'Mobile action sheets'],
          ],
        },
      },
      {
        heading: 'A note on Vaul',
        paragraphs: [
          'The Radix version of the shadcn Drawer is built on Vaul, which its README now marks as unmaintained. New shadcn/ui projects use the Base UI drawer instead, and the shadcn docs include a migration guide.',
        ],
      },
      {
        heading: 'A common pattern',
        paragraphs: [
          'Many apps render a Sheet on desktop and a Drawer on mobile for the same content, switching on a media query. See Watermelon [sheet components](/components/sheet) and [dialog components](/components/dialog) for ready-made variants.',
        ],
      },
    ],
    related: ['/guides/shadcn-alert-dialog-vs-dialog', '/guides/best-react-modal-library', '/free/react-components', '/alternatives/shadcn-ui'],
    updated,
  },
  {
    kind: 'guide',
    slug: 'shadcn-alert-dialog-vs-dialog',
    title: 'shadcn Alert Dialog vs Dialog: The Difference',
    description:
      'shadcn Alert Dialog vs Dialog: an Alert Dialog interrupts and waits for a decision, while a Dialog is a general modal that closes on an outside click. When to use each.',
    h1: 'shadcn/ui Alert Dialog vs Dialog',
    primaryKeyword: 'shadcn alert dialog vs dialog',
    secondaryKeywords: ['alert dialog vs dialog', 'shadcn confirm dialog', 'react confirmation dialog'],
    intro: [
      'Use an Alert Dialog when the user must make a decision, like confirming a delete. Use a Dialog for everything else, like forms, details, or settings. An Alert Dialog does not close when you click outside it and uses the `alertdialog` role, while a regular Dialog does close on an outside click.',
    ],
    sections: [
      {
        heading: 'Side by side',
        table: {
          columns: ['', 'Alert Dialog', 'Dialog'],
          rows: [
            ['Purpose', 'Interrupt and ask for a decision', 'Show content or a form'],
            ['ARIA role', '`alertdialog`', '`dialog`'],
            ['Click outside', 'Does not close', 'Closes'],
            ['Escape key', 'Closes', 'Closes'],
            ['Modal', 'Always', 'Usually, can be non-modal with Base UI'],
          ],
        },
      },
      {
        heading: 'When to use which',
        bullets: [
          'Deleting data, discarding changes, or signing out: Alert Dialog with clear Cancel and Continue actions.',
          'Editing a profile, creating an item, or viewing details: Dialog.',
          'Do not use an Alert Dialog for success messages. Use a [toast](/components/sonner) instead.',
        ],
      },
      {
        heading: 'Ready-made examples',
        paragraphs: [
          'Browse [dialog components](/components/dialog) and [alert components](/components/alerts) you can install with the shadcn CLI.',
        ],
      },
    ],
    related: ['/guides/shadcn-sheet-vs-drawer', '/guides/best-react-modal-library', '/free/react-components', '/guides/is-shadcn-free'],
    updated,
  },
  {
    kind: 'guide',
    slug: 'best-react-modal-library',
    title: 'Best React Modal Library in 2026',
    description:
      'The best React modal and dialog libraries in 2026: Radix Dialog, Base UI Dialog, React Aria Modal, Headless UI Dialog, and the native HTML dialog element compared.',
    h1: 'The Best React Modal Library in 2026',
    primaryKeyword: 'best react modal library',
    secondaryKeywords: ['react modal', 'react dialog component', 'react modal component', 'shadcn dialog'],
    intro: [
      'For most React apps, the best modal is an accessible headless primitive with your own styling: Base UI Dialog, Radix Dialog, or React Aria Modal. If you use shadcn/ui, you already have one. For a quick styled start, copy a ready-made dialog built on those primitives.',
    ],
    sections: [
      {
        heading: 'The options',
        table: {
          columns: ['Library', 'Package', 'License', 'Notes'],
          rows: [
            ['Base UI Dialog', '@base-ui/react', 'MIT', 'Default base for new shadcn/ui projects'],
            ['Radix Dialog', '@radix-ui/react-dialog', 'MIT', 'Widely used, also available in shadcn/ui'],
            ['React Aria Modal', 'react-aria-components', 'Apache-2.0', 'Strong accessibility and internationalization'],
            ['Headless UI Dialog', '@headlessui/react', 'MIT', 'From the Tailwind CSS team'],
            ['Native dialog', 'HTML `<dialog>`', 'Web standard', 'No dependency, supported in all modern browsers'],
          ],
        },
      },
      {
        heading: 'What a good modal must handle',
        bullets: [
          'Focus moves into the modal and is trapped while it is open.',
          'Escape closes it, and focus returns to the trigger.',
          'Content behind it is hidden from screen readers and does not scroll.',
          'It renders in a portal so it sits above other content.',
        ],
        paragraphs: [
          'All the libraries above handle these. Hand-rolled modals usually miss at least one.',
        ],
      },
      {
        heading: 'Styled, ready to copy',
        paragraphs: [
          'Watermelon UI has [dialog components](/components/dialog) and animated [dialog interactions](/animated-components/category/dialog) you can install with the shadcn CLI.',
        ],
      },
    ],
    related: ['/guides/shadcn-alert-dialog-vs-dialog', '/guides/shadcn-sheet-vs-drawer', '/compare/shadcn-vs-radix-ui', '/free/react-components'],
    updated,
  },
];
