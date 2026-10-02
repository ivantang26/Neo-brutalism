# Stackd — neo-brutalist marketing site

Marketing site for **Stackd**, a fictional invoicing tool for freelancers and one-person studios. Built as a portfolio piece: thick outlines, hard shadows, loud flat colour, and it stays perfectly usable.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out (+ prefetch fix, see below)
npm run preview   # serve ./out on http://localhost:4173
npm run lint      # type-check
```

Stack: Next.js 16 (App Router, `output: "export"`), Tailwind CSS 4, TypeScript, Markdown changelog via `gray-matter` + `marked`.

## Pages

| Route | Notes |
| --- | --- |
| `/` | Hero, marquee, feature cards, live invoice demo, how it works, testimonial wall, pricing teaser, FAQ, final CTA |
| `/features/` | One section per feature, integrations tabs, plain-language security section (`#security`) |
| `/pricing/` | Monthly/annual toggle, GBP/USD/EUR switcher, three plans, comparison table, FAQ |
| `/changelog/` | Built from `content/changelog/*.md`, newest first |
| `/rss.xml` | RSS 2.0 feed generated at build time from the same Markdown |
| `/legal/` | Terms, privacy, cookies |
| `/styleguide/` | Hidden (unlinked, `noindex`) — every component in every state |

Sign-up and log-in point to `https://app.stackd.example/…` (a reserved, non-resolving domain).

## Design system

All tokens live on `:root` in `src/app/globals.css` (`--ink`, `--cream`, `--yellow`, `--pink`, `--blue`, `--green`, `--white`, border, radius, shadow offsets, type scale) and are mirrored into the Tailwind theme with `@theme inline`. The theme **removes** Tailwind's default colours and every shadow/blur utility, so an off-palette colour or a blurred shadow can't be written by accident.

Component classes: `.nb-btn`, `.nb-icon-btn`, `.nb-card`, `.nb-badge`, `.nb-input`, `.nb-segmented`, `.nb-table`, `.nb-tab`, `.nb-details`, `.nb-sticker`, `.nb-marquee`, `.nb-link`, `.nb-mark`. Shadows scale 4/5/6px (cards) and 3/4/4px (buttons) across mobile/tablet/desktop through the `--sh-card` / `--sh-btn` tokens.

## Functional requirements

| ID | Where | How |
| --- | --- | --- |
| FR-1 | `PricingPlans.tsx` | State lives in the hash: `#billing=annual&currency=usd`. Restored on load and on manual hash edits; `replaceState` avoids history spam |
| FR-2 | `lib/currency.ts` | Default from `navigator.languages` region (GB → GBP, US → USD, euro area → EUR, else GBP); manual choice kept in localStorage; one shared store so every price updates together. Prices are set per currency, not FX-converted |
| FR-3 | `Faq.tsx` | Native `<details>`; height animates via `::details-content` + `interpolate-size` where supported, opens instantly elsewhere |
| FR-4 | `InvoiceDemo.tsx` | Client/amount/currency/description/due date → live invoice. Validates amounts, never stores or sends anything |
| FR-5 | `lib/site.ts` `signupHref()` | `?plan=studio&billing=annual&utm_source=…&utm_content=<placement>` |
| FR-6 | `lib/changelog.ts`, `app/rss.xml/route.ts` | Markdown + front matter (`version`, `date`, `title`, `tags`) |
| FR-7 | `globals.css`, `Interactions.tsx` | CSS hover/active; keyboard Space/Enter add `.is-pressed`; Space activates link-buttons; iOS `:active` enabled |
| FR-8 | `Marquee.tsx` | 40px/s computed from measured width; pauses on hover, focus, and a Pause button; reduced motion stops it and wraps the list |

Analytics: `track()` in `lib/analytics.ts` fires Plausible custom events (`Signup Click`, `Pricing Toggle`, `Currency Switch`, `Demo Used`). Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to load the script; without it, events are no-ops. Server components declare events with `data-track="…"` attributes.

## Verified

- Layout at 360, 768, 1280 and 1600px with no horizontal page scroll.
- Lighthouse (mobile) accessibility **100** on Home, Pricing, Features and Changelog. Home: performance 95, CLS 0.002, ~224 KB transferred (budget 900 KB).
- Exactly three WOFF2 files load (latin subsets; extra subsets only load via `unicode-range` if needed); only Archivo Black is preloaded.

## Decisions and caveats

- **Hero screenshot** is drawn in HTML/CSS rather than an AVIF: crisp at every size, a few hundred bytes, exposed to screen readers as one labelled image.
- **Open question 1 (free plan vs trial):** built as a permanent Free plan *plus* a 14-day trial of paid plans; the sticker reads "Free for 14 days!". Change `SITE.trialDays` / sticker copy in one place if that changes.
- **Open question 2 (logos):** the marquee shows integration names as plain text, no customer logos.
- **Focus ring contrast:** the specified 3px dashed `--blue` ring is only **2.67:1 against cream** (2.91:1 on white), below WCAG 1.4.11's 3:1. Kept as specified. A darker focus blue such as `#2F78B8` passes on cream (4.3:1), white, yellow and black, but not on pink cards (1.7:1), so the fuller fix is a two-tone ring (ink plus blue).
- **Testimonial wall** gets a sixth "Your quote could go here" CTA tile so the 3-column masonry doesn't leave a hole.
- **Static export prefetch fix:** Next 16 writes `__next.<route>/__PAGE__.txt` but the client requests `__next.<route>.__PAGE__.txt`; `scripts/flatten-rsc.mjs` runs after `next build` and writes the dotted copies so client navigation works on any static host.
