# Makaruos Mekhail — Portfolio (Angular 21)

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![License](https://img.shields.io/badge/license-All%20rights%20reserved-red)

A production **Angular 21** single-page portfolio: standalone components, signals,
zoneless change detection, hand-written SCSS (no utility-CSS framework), a persisted
light/dark theme, full Arabic/English support with RTL, and **static prerendering (SSG)**
with a complete SEO/social-sharing setup.

🔗 **Live:** [portofolio-makaruos.vercel.app](https://portofolio-makaruos.vercel.app)

---

## 1. Quick start

```bash
npm install
npm start          # dev server → http://localhost:4200
npm run build      # production build → dist/portfolio/browser  (prerendered)
```

**Requirements:** Node **20.19+** or **22.12+** (Angular 21 minimum).

`npm run build` now **prerenders** the page to static HTML (see §11). The output in
`dist/portfolio/browser` is fully static — no Node server is required at runtime.

Optional (only if you deploy to a Node runtime instead of a static host):

```bash
npm run serve:ssr  # runs the Express server from dist/portfolio/server
```

---

## 2. What changed from the design file

The uploaded HTML was a bundled React/Claude-Design prototype. Rather than re-typing the
content by hand, the bilingual data was **extracted programmatically** from the design's
own logic and compiled into typed dictionaries — so every Arabic string in this app is
exactly the one from the design, with no transcription drift.

| Design concept | Angular implementation |
|---|---|
| Inline `style="…"` on every element | Semantic class names + component-scoped SCSS + design tokens |
| `--bg`, `--fg`, `--accent` set via a JS template string | CSS variables on `:root` / `.dark` |
| React `useState` for theme/lang/filters | Angular **signals** in services and components |
| `pick(obj)` per string | Typed `Dict` per language, one `computed()` swap |
| `data-reveal` + manual `IntersectionObserver` | `RevealDirective` (one observer, self-disconnecting) |
| Sticky nav, no scroll behaviour | Nav **pinned for the whole page** (never hides), with scroll spy, progress bar and a mobile menu |
| Single-column layout at all widths | Responsive grid at `sm` / `md` / `lg` breakpoints |
| Client-only render | **Static prerendering (SSG)** so crawlers and social scrapers see full HTML |

---

## 3. Architecture

```
src/
├── index.html                 # theme + language bootstrap, SEO meta, JSON-LD
├── main.ts                    # browser bootstrap — bootstrapApplication
├── main.server.ts             # server entry (re-exports app.server bootstrap)
├── server.ts                  # optional Express server for on-demand SSR
├── styles.scss                # design tokens + global styles
└── app/
    ├── app.ts                 # thin router shell (<router-outlet/>)
    ├── home.ts                # the portfolio page itself (all sections)
    ├── app.routes.ts          # browser routes — single '' route → Home
    ├── app.routes.server.ts   # server render modes (Prerender)
    ├── app.config.ts          # zoneless CD + provideRouter
    ├── app.config.server.ts   # merges server rendering providers
    ├── app.server.ts          # server bootstrap (forwards BootstrapContext)
    ├── core/
    │   ├── theme.service.ts   # light/dark, persisted, SSR-guarded
    │   ├── i18n.service.ts    # language + dir, persisted, SSR-guarded
    │   └── scroll.service.ts  # scroll spy + reading progress, SSR-guarded
    ├── i18n/
    │   ├── dict.ts            # interfaces — the contract both languages satisfy
    │   ├── en.ts / ar.ts      # all content, both languages
    ├── data/contact.data.ts   # email, phone, links, CV path, EmailJS keys
    ├── shared/                # section-title, reveal directive
    └── sections/              # navbar, hero, about, experience, skills,
                               # projects, education, contact, footer

public/
├── favicon.ico
├── robots.txt                 # crawl rules + sitemap pointer
├── sitemap.xml                # the single page, for search engines
└── assets/
    ├── file/…pdf              # the downloadable CV
    └── img/                   # og-image.jpg (1200×630) + og-image-square.jpg
```

### Angular decisions

- **Standalone components only.** No `NgModule` anywhere. A component's dependencies are
  declared in its own `imports` array, so nothing has to be kept in sync by hand and the
  bundler can drop what is never imported.
- **Zoneless change detection** (`provideZonelessChangeDetection`). `zone.js` is not
  installed at all. Angular re-renders when a signal it read changes, instead of
  monkey-patching every async browser API and re-checking the tree defensively.
- **`OnPush` on every component** — documents intent and keeps change detection cheap.
- **Signals for all state:** theme, language, direction, active section, scroll progress,
  open experience card, active skill tab, project filter. `computed()` derives the
  visible project list and the active dictionary.
- **New control flow** (`@if` / `@for` with mandatory `track`) and **signal `input()`**
  instead of `*ngIf`, `*ngFor` and `@Input()`.
- **Router shell split.** `App` is a thin shell that hosts `<router-outlet>`; the page
  lives in `Home` behind a single `''` route. This split is what makes the page
  discoverable by the prerenderer (see §11).

### Styling decisions

No utility-CSS framework is installed. Styling is split in two:

| Where | What lives there |
|---|---|
| `src/styles.scss` (global) | Design tokens, reset, and the handful of primitives reused everywhere: `.shell`, `.section`, `.card`, `.chip`, `.btn`, `.focus-ring`, `.reveal`, `.no-scrollbar`, keyframes |
| `styles: []` on each component | Everything specific to that section, under a short BEM-ish prefix (`.hero__`, `.pj__`, `.ed__`) |

Component styles use Angular's default emulated encapsulation, so a class name can never
leak into another section. Because both layers read the same CSS variables, adding a
section never means re-picking a colour.

---

## 4. Header behaviour

`ScrollService` tracks scroll position in one passive listener and exposes three signals:

| Signal | Purpose |
|---|---|
| `scrolled` | Past 24px → header gains a background, blur and border |
| `progress` | 0→1 reading progress, drawn as a 2px accent bar under the header |
| `activeSection` | Current section id, from an `IntersectionObserver` |

The header stays fixed at the top for the entire page — it never translates out of view.
Past 24px of scroll it picks up a blurred background and a bottom border. `activeSection`
(from an `IntersectionObserver`, not scroll maths) drives the underline on the current
link.

---

## 5. Theming

`src/styles.scss` defines the palette twice — `:root` for light, `.dark` for dark — as
bare OKLCH components so any rule can add an alpha channel:

```scss
:root { --c-accent: 0.66 0.151 80.8; }   /* darker gold, readable on white   */
.dark { --c-accent: 0.779 0.151 80.8; }  /* brighter gold #e8ab27 on near-black */
```

Each raw token also has a resolved alias (`--accent`, `--bg2`, `--dim`, `--line`, …) for
everyday use, while rules that need transparency read the raw token directly:

```scss
background: var(--bg2);                        /* solid    */
background: oklch(var(--c-accent) / 0.08);     /* 8% tint  */
```

Components reference only these variables, so they are correct in both themes without a
single `.dark` override. **All eight tokens change between themes** — the accent lightens
in dark mode because a colour tuned for contrast on white loses it against near-black.

The accent is gold `#e8ab27`. **Dark is the default** for first-time visitors: the inline
script in `index.html` and `ThemeService.read()` both fall back to `'dark'` when there is
no stored preference. Once a visitor toggles, their choice is saved in `localStorage`.

To restyle the whole site, edit those two blocks. Nothing else references a literal
colour.

---

## 6. Internationalisation

`dict.ts` declares the interfaces; `en.ts` and `ar.ts` each export an object typed `Dict`.
`I18nService` holds a `lang` signal and exposes `t = computed(() => DICTS[lang()])`.

```html
<h2>{{ t().experience.title }}</h2>
@for (job of t().jobs; track job.id) { … }
```

**Why typed dictionaries instead of `ngx-translate`:** adding a field to English and
forgetting Arabic becomes a **compile error** rather than a live page showing a raw key.
The content here is structured (jobs with bullet arrays, projects with tag arrays), which
flat key-value translation handles badly. There is also no HTTP round-trip, so no flash of
untranslated text on first paint, and no extra dependency.

**What is translated and what is not:** every sentence, label, heading, filter name and
button is translated. Technology names stay in Latin script in both languages —
`Angular`, `TypeScript`, `Nx Monorepo`, `Stripe`, `Firebase`, `SSR`, `PrimeNG`,
`ngx-translate`, `Claude Code` — because translating them would make the CV harder to
read for an Arabic-speaking developer, not easier. Proper nouns (Expand360, Belvro Wealth,
Comply360, SIMPLIFE, ITI) are likewise unchanged, while their surrounding descriptions are
fully Arabic.

**RTL:** the layout uses CSS logical properties (`padding-inline`, `margin-inline`,
`inset-inline`, `text-align: start`) so switching `dir` mirrors everything with no
per-language overrides. The two rules that need a physical direction — the header progress
bar and the language bars — use `:host-context([dir='rtl'])`. Latin-only fragments —
email, phone, period dates, tech tags — carry a local `dir="ltr"` so they never reorder.
Arabic swaps the typeface to **IBM Plex Sans Arabic**.

---

## 7. Responsive behaviour

Mobile-first, with three breakpoints written as plain media queries: **640px**, **768px**
and **1024px**. Side padding is a single token (`--pad-x`: 20 → 32 → 48px) that every
`.shell` inherits, so the whole page changes gutter in one place.

| Section | Mobile | Tablet | Desktop |
|---|---|---|---|
| Header | Logo + lang/theme/menu buttons, links in a drop-down | Same | Full inline link bar with active underline |
| Hero | Single column, fluid `clamp()` type | Same | Same, larger scale |
| Profile | Text, domain chips, then pillars stacked | Pillars 2×2 | Text and pillars side by side |
| Experience | Timeline rail + full-width cards | Same | Same |
| Skills | Category tabs scroll horizontally above the panel | Same | Tabs in a 280px column beside the panel |
| Projects | Filter strip scrolls horizontally, 1 card per row | 2 columns | 2 columns |
| Education / Certificates / Languages | Stacked | Stacked | Education left, certificates + languages right |
| Contact | Details then form | Same | Details and form side by side |
| Footer | Wraps | Split | Split |

Hardening: `min-width: 0` on flex/grid children that hold text, `overflow-wrap` on long
strings, `overflow-x: hidden` on the shell and `overflow: hidden` on the hero so the
decorative glow can never create a horizontal scrollbar, `.no-scrollbar` on the horizontal
strips, and a `.focus-ring` `focus-visible` outline on every interactive element.

---

## 8. Accessibility

- Landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Real heading hierarchy — each experience toggle sits inside an `<h3>`
- `aria-expanded` on the menu and experience cards, `aria-current` on the active nav link,
  `role="tablist"` / `aria-selected` on project filters
- Decorative SVGs and the skill bars are `aria-hidden`; every icon-only button has an
  `aria-label` that changes with language
- `prefers-reduced-motion: reduce` disables reveals, the drifting orb and smooth scrolling

---

## 9. SEO & social sharing

Everything a crawler or a link-preview scraper reads lives in `src/index.html` and
`public/`:

| Piece | Where | Why it matters |
|---|---|---|
| `<title>`, `meta description` | `index.html` | The blue title + grey text in Google results |
| `<link rel="canonical">` | `index.html` | Tells Google the one true URL — avoids duplicate-content splitting across `vercel.app` aliases |
| Open Graph (`og:title/description/url/image` + dimensions) | `index.html` | The card Facebook, LinkedIn and WhatsApp show when the link is shared |
| `twitter:card = summary_large_image` | `index.html` | The large-image card on X/Twitter |
| `og:image` (1200×630) | `public/assets/img/og-image.jpg` | The actual share picture — a branded card built from the profile photo |
| JSON-LD `Person` schema | `index.html` | Structured data: tells Google you're a person, your role, location and social links — powers a rich result on a name search |
| `robots.txt` | `public/robots.txt` | Allows all crawlers, points to the sitemap |
| `sitemap.xml` | `public/sitemap.xml` | Lists the page for faster, more reliable indexing |

**The single hard-coded value is the domain.** Everything canonical/OG/sitemap points at
`https://portofolio-makaruos.vercel.app`. If you move to a custom domain, do a
find-and-replace of that string across **`src/index.html`**, **`public/robots.txt`** and
**`public/sitemap.xml`**, then rebuild.

After deploying, force the platforms to re-read the tags: open the Facebook Sharing
Debugger, paste the URL, and press *Scrape Again* (Facebook, LinkedIn and WhatsApp share
this cache). Submit `sitemap.xml` in Google Search Console to speed up indexing.

---

## 10. Static prerendering (SSG)

Without prerendering, the page is empty JS until Angular boots — Google can eventually run
it, but LinkedIn, WhatsApp and X **don't run JS at all**, so shared links would show a
blank card, and indexing is slower and less reliable.

`npm run build` now renders the page to real HTML at build time. The result:

- `dist/portfolio/browser/index.html` is ~90 KB of **real content** — the name, every
  section, all project cards, the OG tags and JSON-LD are baked in.
- `outputMode: 'static'` in `angular.json` means the output is pure static files — no Node
  process runs at request time. A static host (Vercel, Netlify, GitHub Pages) serves it
  directly.
- The browser then **hydrates** the same HTML: theme, language, scroll spy, filters and
  the contact form all become interactive with no visible re-render.

**How it's wired** (files in §3):

1. `app.ts` is a thin shell hosting `<router-outlet>`; `home.ts` holds the page; a single
   `''` route (`app.routes.ts`) connects them. The prerenderer needs a route to discover.
2. `app.routes.server.ts` sets `RenderMode.Prerender`.
3. `app.server.ts` forwards the `BootstrapContext` to `bootstrapApplication` — Angular
   19.2+ requires this or prerendering fails with `NG0401`.
4. Every browser-only API is guarded so the page can render on the server, where `window`,
   `document`, `localStorage`, `navigator` and `IntersectionObserver` don't exist:
   - `theme.service.ts`, `i18n.service.ts`, `scroll.service.ts` → `isPlatformBrowser(...)`
   - `reveal.directive.ts` → on the server it marks elements visible immediately (the
     prerendered HTML must never be stuck at `opacity:0`)
   - `hero.ts` → the role-cycling timer runs inside `afterNextRender` (browser only)
   - `contact.ts` → the `mailto:` navigation is guarded

If you ever add a browser global to a service or component `constructor`, wrap it the same
way, or the prerender build will fail.

---

## 11. Editing

| To change… | Edit |
|---|---|
| Any text, either language | `src/app/i18n/en.ts` and `ar.ts` |
| A job, project, skill group, certificate | the matching array in **both** files |
| Colours / the gold accent | `src/styles.scss` (`--c-accent`, other `--c-*`) |
| Email, phone, links, CV file path | `src/app/data/contact.data.ts` |
| Fonts | the Google Fonts link in `src/index.html` + `--font-head` / `--font-body` / `--font-mono` in `src/styles.scss` |
| CV file | replace `public/assets/file/Makaruos_mekhail_yousab_L-26.pdf` (keep the name, or update `cvPath` in `contact.data.ts`) |
| Share image | replace `public/assets/img/og-image.jpg` (keep 1200×630) |
| The site domain | find-and-replace in `src/index.html`, `public/robots.txt`, `public/sitemap.xml` |

**Contact form.** By default it opens the visitor's mail client via a `mailto:` link. To
send through EmailJS instead: `npm install @emailjs/browser`, fill the `EMAILJS` keys in
`src/app/data/contact.data.ts`, and switch `Contact.submit()` to call `emailjs.send(...)`.
While the keys are empty it falls back to `mailto:` automatically.

---

## 12. Deployment

Output: **`dist/portfolio/browser`** (static, prerendered).

- **Vercel:** preset *Angular*, build `npm run build`, output directory `dist/portfolio/browser`
- **Netlify:** build `npm run build`, publish `dist/portfolio/browser`
- **GitHub Pages / any static host:** upload the contents of `dist/portfolio/browser`

`optimization.fonts.inline` is **`true`** in `angular.json` — it inlines the Google Fonts
CSS at build time for faster first paint. Your build machine (Vercel included) needs to
reach `fonts.googleapis.com`. If you ever build fully offline, set it to `false`.

There is also an optional Express server (`src/server.ts`, `npm run serve:ssr`) for hosts
with a Node runtime, but it is **not needed** for the static hosts above.

---

## 13. License

© 2026 Makaruos Mekhail Yousab. **All rights reserved.**

This repository is public for portfolio and demonstration purposes only. The code,
design and content may not be copied, modified, or reused in another project without
prior written permission. See [`LICENSE`](./LICENSE) for the full terms.