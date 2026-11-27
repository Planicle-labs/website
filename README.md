# Planicle website

Marketing site for Planicle Labs, built with [Astro](https://astro.build) as a fully static site.

## Stack

- Astro 7, static output, one page plus 404, sitemap and robots.
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
  pages/        index.astro, 404.astro, sitemap.xml.ts
  layouts/      BaseLayout.astro (head, metadata, JSON-LD, font preloads)
  components/   page sections (markup only)
  scripts/      client behaviour; main.ts is the single entry
  data/         site metadata and process phases
  styles/       global.css (fonts, theme tokens, utilities)
  assets/       fonts and images processed by the build
public/         favicons, web manifest, social image, robots.txt
vercel.json     security headers, cache headers, build settings
```

## Notes

- The process section renders the first phase on the server. Elements whose classes depend on the active phase carry both variants in `data-on` and `data-off`; `scripts/process.ts` swaps them.
- `scripts/hero-shader.ts` registers the shader layers with the same calls, in the same order, as the library's React component, so the output matches the earlier Next.js build. Layer ids must not contain `__`.
- The Cal.com embed script loads on the visitor's first interaction; any element with `data-booking` opens the booking modal.
- Security headers live in `vercel.json`. On Cloudflare, the same headers go in `public/_headers`.
