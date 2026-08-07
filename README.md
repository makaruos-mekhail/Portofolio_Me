# Makaruos Mekhail — Portfolio (Angular 21)

The Design concept rebuilt as a real **Angular 21** application: standalone
components, signals, zoneless change detection, hand-written SCSS (no utility-CSS
framework), a persisted light/dark theme and full Arabic/English support with RTL.

---

## 1. Quick start

```bash
npm install
npm start          # dev server → http://localhost:4200
npm run build      # production build → dist/portfolio/browser
```

**Requirements:** Node **20.19+** or **22.12+** (Angular 21 minimum).

---

## 2. What changed from the design file

Rather than re-typing the content by hand, the bilingual data was **extracted programmatically** from the design's own logic and compiled into typed dictionaries — so every Arabic string in this app is exactly the one from the design, with no transcription drift.

| Design concept | Angular implementation |
|---|---|
| Inline `style="…"` on every element | Semantic class names + component-scoped SCSS + design tokens |
| `--bg`, `--fg`, `--accent` set via a JS template string | CSS variables on `:root` / `.dark` |
| React `useState` for theme/lang/filters | Angular **signals** in services and components |
| `pick(obj)` per string | Typed `Dict` per language, one `computed()` swap |
| `data-reveal` + manual `IntersectionObserver` | `RevealDirective` (one observer, self-disconnecting) |
| Sticky nav, no scroll behaviour | Nav **pinned for the whole page** (never hides), with scroll spy, progress bar and a mobile menu |
| Single-column layout at all widths | Responsive grid at `sm` / `md` / `lg` breakpoints |

---

## 3. Architecture

```
src/
├── index.html                 # theme + language bootstrap (prevents flash)
├── main.ts                    # bootstrapApplication — no AppModule
├── styles.scss                # design tokens + global styles
└── app/
    ├── app.ts                 # root standalone component
    ├── app.config.ts          # zoneless change detection
    ├── core/
    │   ├── theme.service.ts   # light/dark, persisted
    │   ├── i18n.service.ts    # language + dir, persisted
    │   └── scroll.service.ts  # scroll spy + reading progress
    ├── i18n/
    │   ├── dict.ts            # interfaces — the contract both languages satisfy
    │   ├── en.ts / ar.ts      # all content, both languages
    ├── data/contact.data.ts   # email, phone, links, CV path
    ├── shared/                # section-title, reveal directive
    └── sections/              # navbar, hero, about, experience, skills,
                               # projects, education, contact, footer
```

### Angular decisions

- **Standalone components only.** No `NgModule` anywhere. A component's dependencies are
  declared in its own `imports` array, so nothing has to be kept in sync by hand and the
  bundler can drop what is never imported.
- **Zoneless change detection** (`provideZonelessChangeDetection`). `zone.js` is not
  installed at all. Angular re-renders when a signal it read changes, instead of
  monkey-patching every async browser API and re-checking the tree defensively.
- **`OnPush` on every component** — documents intent and keeps the app correct if zones
  are ever reintroduced (for example when adding SSR).
- **Signals for all state:** theme, language, direction, active section, scroll progress,
  open experience card, active skill tab, project filter. `computed()` derives the
  visible project list and the active dictionary.
- **New control flow** (`@if` / `@for` with mandatory `track`) and **signal `input()`**
  instead of `*ngIf`, `*ngFor` and `@Input()`.

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
:root { --c-accent: 0.55 0.19 25; }   /* deeper terracotta on white */
.dark { --c-accent: 0.68 0.19 25; }   /* brighter terracotta on near-black */
```

Each raw token also has a resolved alias (`--accent`, `--bg2`, `--dim`, `--line`, …) for
everyday use, while rules that need transparency read the raw token directly:

```scss
background: var(--bg2);                        /* solid    */
background: oklch(var(--c-accent) / 0.08);     /* 8% tint  */
```

Components reference only these variables, so they are correct in both themes without a
single `.dark` override. **All eight tokens change between themes**, including both
accents — the accent lightens in dark mode because a colour tuned for contrast on white
loses it against near-black.

These are the design's original OKLCH values (terracotta `#e26a4e`-family accent, teal
secondary), carried over exactly.

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
`ngx-translate` — because translating them would make the CV harder to
read for an Arabic-speaking developer, not easier. Proper nouns (Expand360, Belvro Wealth,
Comply360, SIMPLIFE, ITI) are likewise unchanged, while their surrounding descriptions are
fully Arabic.

**RTL:** the layout uses CSS logical properties (`padding-inline`, `margin-inline`,
`inset-inline`, `text-align: start`) so switching `dir` mirrors everything with no
per-language overrides. The two rules that need a physical direction — the header progress
bar and the language bars — use `:host-context([dir='rtl'])`.
Latin-only fragments — email, phone, period dates, tech tags — carry a local `dir="ltr"`
so they never reorder. Arabic swaps the typeface to **IBM Plex Sans Arabic**.

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

## 9. Editing

| To change… | Edit |
|---|---|
| Any text, either language | `src/app/i18n/en.ts` and `ar.ts` |
| A job, project, skill group, certificate | the matching array in **both** files |
| Colours | `src/styles.scss` (`--c-*`) |
| Email, phone, links, CV file path | `src/app/data/contact.data.ts` |
| Fonts | the Google Fonts link in `src/index.html` + `--font-head` / `--font-body` / `--font-mono` in `src/styles.scss` |
| CV file | replace `public/assets/file/Makaruos-Mekhail-CV.pdf` |

The contact form has no backend: it builds a `mailto:` link from the entered values and
opens the visitor's mail client, exactly as the design did. To send server-side instead,
swap the body of `Contact.submit()` for an EmailJS or HTTP call.

---

## 10. Deployment

Output: **`dist/portfolio/browser`** (static).

- **Vercel:** preset *Angular*, build `npm run build`, output `dist/portfolio/browser`
- **Netlify:** build `npm run build`, publish `dist/portfolio/browser`

`optimization.fonts.inline` is `false` in `angular.json` so builds work without network
access; set it to `true` if your build machine can reach `fonts.googleapis.com`.
