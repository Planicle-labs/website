# Planicle website

Marketing site for Planicle Labs, built with [Astro](https://astro.build) as a fully static site.

## Stack

- Astro 7, static output: the homepage, the Snug product page at `/snug`, 404, sitemap and robots.
- Tailwind CSS 4 through `@tailwindcss/vite`; the CSS is inlined into the HTML.
- No UI framework on the client. Interactions are small TypeScript modules in `src/scripts/`, loaded as one module.
- Hero background: the `shaders` library (three.js WebGPU with a WebGL fallback), loaded as a separate chunk after the page is interactive.
- Self-hosted fonts (latin subset) with metric-matched fallbacks; above-the-fold fonts are preloaded.
- Images processed at build time with `astro:assets` (sharp).

## Commands

Uses pnpm (see `packageManager` in `package.json`) and Node 22.23.4 or newer.

| Command | What it does |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Production build into `dist/` |
| `pnpm preview` | Serve `dist/` locally (runs in the background; stop with `pnpm astro preview stop`) |
| `pnpm check` | Type-check `.astro` and `.ts` files |
| `pnpm lint` | ESLint |

## Layout

```
src/
  pages/        index.astro, snug.astro, 404.astro, sitemap.xml.ts
  layouts/      BaseLayout.astro (homepage), SnugLayout.astro (/snug only)
  components/   page sections (markup only); components/snug/ for /snug
  scripts/      client behaviour; main.ts is the homepage entry, snug/main.ts the /snug entry
  data/         site metadata, process phases, Snug content and size data
  styles/       global.css (homepage, Tailwind), snug.css (/snug, plain CSS)
  assets/       fonts and images processed by the build
public/         favicons, web manifest, social image, robots.txt
vercel.json     security headers, cache headers, build settings
```

## Notes

- The process section renders the first phase on the server. Elements whose classes depend on the active phase carry both variants in `data-on` and `data-off`; `scripts/process.ts` swaps them.
- `scripts/hero-shader.ts` registers the shader layers with the same calls, in the same order, as the library's React component, so the output matches the earlier Next.js build. Layer ids must not contain `__`.
- The Cal.com embed script loads on the visitor's first interaction; any element with `data-booking` opens the booking modal.
- Security headers live in `vercel.json`. On Cloudflare, the same headers go in `public/_headers`.
- `/snug` is isolated from the homepage: its own layout, fonts (Space Grotesk and Space Mono, subset and self-hosted, OFL licences next to the files), plain CSS without Tailwind, and its own script entry. GSAP, ScrollTrigger and Lenis load after the page has loaded, and never when the visitor prefers reduced motion.
- Snug's demo figures: brand chest values come from Snug's reference size database (`src/data/snug.ts`); SAHAJ is a made-up sample store. Keep both labelled as such on the page.
- `scripts/booking.ts` takes a config (theme colours, booking note, link fallback). The homepage calls it with the defaults; `/snug` passes Snug's yellow theme and the note "Snug enquiry from planicle.com/snug".
