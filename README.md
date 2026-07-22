# From Scorekeeper to Strategist — Beyond Numbers

A multi-page marketing site for the **From Scorekeeper to Strategist** workshop
series, built with React + Vite, React Router, Tailwind CSS v4, framer-motion,
and lucide-react. Editorial, premium consulting-firm styling.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default **http://localhost:5173**).

```bash
npm run build     # production build into /dist
npm run preview   # preview the production build
```

## Branding

Uses the **real Beyond Numbers logo artwork** (transparent PNGs):

- `src/assets/beyond-numbers-horizontal.png` — nav bar
- `src/assets/beyond-numbers-stacked.png` — footer

Rendered via `src/components/Logo.jsx`. To swap artwork, replace those two files
(same names) — no code change needed.

## Routes / pages

| Route         | Page                                                |
| ------------- | --------------------------------------------------- |
| `/`           | Home — hero, overview, 8-module accordion, CTA      |
| `/games`      | Placeholder (Coming soon)                           |
| `/workshops`  | Placeholder (Coming soon)                           |
| `/login`      | Sign-in page (demo, non-functional)                 |
| `/checklists` | Placeholder (Coming soon)                           |
| `/contact`    | Contact page with styled form (demo, non-functional)|
| `*`           | 404 page                                            |

## Where things live

| Area               | File                                              |
| ------------------ | ------------------------------------------------- |
| Routing            | `src/App.jsx`, `src/main.jsx`                     |
| Shared layout      | `src/components/Layout.jsx` (nav + footer + scroll)|
| Nav / footer       | `src/components/Navbar.jsx`, `Footer.jsx`         |
| Home sections      | `src/components/sections/*`                        |
| Accordion          | `src/components/AccordionItem.jsx`                 |
| Pages              | `src/pages/*`                                      |
| All workshop copy  | `src/data/content.js`                             |
| Design tokens/fonts| `src/index.css` (`@theme` block)                  |

Page theme: **Beyond Numbers, warmed** — navy `#2D4A5A` primary (text, dark sections,
buttons) with accents yellow `#F2C811`, teal `#2BA088`, purple `#9B26B6`, and a warm
amber `#F6B24A`. Backgrounds use warm cream/sand (`#FFFBF5`, `#FDF6EE`). Gradients:
`.bg-warm-gradient` (hero visual) and `.bg-cta-gradient` (navy→teal CTA), in
`src/index.css`. Headings use **Plus Jakarta Sans**; body uses **Inter**. The Beyond
Numbers logo is kept in its original brand colors (never recolored).

**Layout follows the MaintBoard section flow** with strict heading hierarchy
(one `<h1>` per page → `<h2>` section titles → `<h3>` card/accordion titles).

Reusable section primitives (in `src/components/`) — use these to build every page:
`Hero`, `Section`, `CardGrid`, `MetricsBand`, `Accordion` (+ `RichBody`), `CTABand`,
`Button`, plus `Navbar` / `Footer`. Icons are resolved by name via `src/lib/icons.js`.

Home sections (in order): Hero → Why This Transformation Matters → What You'll Work
Through → How the Series Helps You → The Program at a Glance (metrics) → Inside the
Series (8-module accordion) → FAQ → Final CTA.

The nav "Register" button and home CTA use a placeholder `#register` anchor.
