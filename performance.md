# Performance

## Baseline: Next.js, before the Astro port

- Commit: `ce38433`
- Captured: 2026-11-27
- Tools: Lighthouse 13.6.0 on headless Windows Chrome/158.0.8127.88, Intel Arc GPU (WebGPU)
- Local: production build served through a compression proxy (brotli 5). 3 batches of 5 runs, pooled.
- Live: https://www.planicle.com, 5 runs each.
- KB = 1000 bytes.

## Lighthouse summary

Median, with the range in brackets. Local: 15 runs per form factor. Live: 5.

| Metric | Local mobile | Local desktop | Live mobile | Live desktop |
|---|---|---|---|---|
| Performance score | 76 (71 to 79) | 99 (84 to 99) | 76 (63 to 77) | 97 (88 to 98) |
| Accessibility score | 96 (96 to 96) | 96 (96 to 96) | 96 (96 to 96) | 96 (96 to 96) |
| Best practices score | 100 (100 to 100) | 100 (100 to 100) | 92 (92 to 92) | 92 (92 to 92) |
| SEO score | 100 (100 to 100) | 100 (100 to 100) | 100 (100 to 100) | 100 (100 to 100) |
| First contentful paint (ms) | 1035 (917 to 2158) | 296 (276 to 337) | 1866 (1847 to 2442) | 648 (634 to 661) |
| Largest contentful paint (ms) | 1035 (917 to 2158) | 296 (276 to 337) | 1866 (1847 to 2442) | 648 (634 to 661) |
| Total blocking time (ms) | 1020 (771 to 1947) | 98 (61 to 332) | 857 (817 to 1769) | 92 (75 to 243) |
| Cumulative layout shift | 0 (0 to 0) | 0 (0 to 0) | 0 (0 to 0) | 0 (0 to 0) |
| Speed index (ms) | 3556 (3287 to 4801) | 1161 (1119 to 1451) | 3979 (3841 to 5598) | 1491 (1462 to 1681) |
| Time to interactive (ms) | 8164 (7956 to 10042) | 1566 (971 to 1687) | 8291 (7277 to 8957) | 1660 (1484 to 1712) |
| Main-thread work (ms) | 4956 (4591 to 6338) | 1367 (1265 to 1898) | 5525 (5331 to 6390) | 1560 (1462 to 1834) |
| JavaScript boot-up (ms) | 3281 (2741 to 4355) | 824 (765 to 1079) | 3510 (3448 to 3557) | 864 (849 to 1177) |
| Total transfer (bytes) | 1274846 (1274846 to 1275756) | 1274846 (1274845 to 1274847) | 1356886 (1356874 to 1357872) | 1356900 (1356873 to 1356926) |

Failing audits, local: colour contrast. Live: colour contrast, errors in console, inspector issues.

## Runtime

Local values are the median of 3 profiles. Live values are from 1 profile.

| Metric | Local mobile | Local desktop | Live mobile | Live desktop |
|---|---|---|---|---|
| DOM elements | 675 | 675 | 676 | 676 |
| HTML size (bytes, as measured in the page) | 95696 | 95688 | 96123 | 96115 |
| Page height (px) | 6265 | 7065 | 6265 | 7065 |
| Time to first byte (ms) | 318 | 322 | 279 | 989 |
| DOMContentLoaded (ms) | 383 | 369 | 479 | 1809 |
| Load event (ms) | 720 | 700 | 715 | 1828 |
| JS heap (bytes) | 12380044 | 11750448 | 12275004 | 12159404 |
| Idle on hero: CPU (ms per s) | 177.1 | 216.8 | 179.6 | 202.2 |
| Idle on hero: script (ms per s) | 128.5 | 133.4 | 131.4 | 122.5 |
| Idle on hero: layout (ms per s) | 0 | 0 | 0 | 0 |
| Idle on hero: style (ms per s) | 0 | 11 | 0 | 10.1 |
| Idle at footer: CPU (ms per s) | 33.9 | 64.6 | 34 | 64.4 |
| Idle at footer: script (ms per s) | 4.5 | 5.5 | 4.3 | 4.7 |
| Idle at footer: layout (ms per s) | 0 | 0.1 | 0 | 0.1 |
| Idle at footer: style (ms per s) | 0 | 11.7 | 0 | 9.2 |
| Scroll frames recorded | 226 | 257 | 226 | 257 |
| Scroll frame p50 (ms) | 16.7 | 16.7 | 16.7 | 16.7 |
| Scroll frame p95 (ms) | 17.1 | 17 | 16.8 | 17.2 |
| Scroll frame p99 (ms) | 17.2 | 17.8 | 16.9 | 18.4 |
| Scroll frames over 25 ms | 0 | 0 | 0 | 0 |
| Long tasks while scrolling | 0 | 0 | 0 | 0 |
| Long task time while scrolling (ms) | 0 | 0 | 0 | 0 |

## Page weight

### Local, on first load (same for mobile and desktop)

| Type | Requests | Transfer (KB) | Decoded (KB) |
|---|---|---|---|
| first party, Document | 1 | 15.3 | 94.9 |
| first party, Script | 7 | 597.2 | 2420.7 |
| first party, Stylesheet | 1 | 13.1 | 78.3 |
| first party, Font | 7 | 198.1 | 191.4 |
| first party, Image | 1 | 212.5 | 282.5 |
| first party, Other | 1 | 212.5 | 282.5 |
| first party, total | 18 | 1248.8 | 3350.2 |
| third party, Script | 1 | 27.0 | 98.4 |
| third party, total | 1 | 27.0 | 98.4 |

### Local desktop, after scrolling the whole page

| Type | Requests | Transfer (KB) | Decoded (KB) |
|---|---|---|---|
| first party, Document | 1 | 15.3 | 94.9 |
| first party, Script | 7 | 597.2 | 2420.7 |
| first party, Stylesheet | 1 | 13.1 | 78.3 |
| first party, Font | 7 | 198.1 | 191.4 |
| first party, Image | 2 | 254.6 | 323.8 |
| first party, Other | 1 | 212.5 | 282.5 |
| first party, total | 19 | 1290.8 | 3391.6 |
| third party, Script | 1 | 27.0 | 98.4 |
| third party, total | 1 | 27.0 | 98.4 |

### Live, on first load

| Type | Requests | Transfer (KB) | Decoded (KB) |
|---|---|---|---|
| first party, Document | 1 | 18.0 | 95.2 |
| first party, Script | 7 | 674.5 | 2421.1 |
| first party, Stylesheet | 1 | 14.3 | 78.3 |
| first party, Font | 7 | 199.1 | 191.4 |
| first party, Image | 1 | 212.5 | 282.5 |
| first party, Other | 1 | 212.5 | 282.5 |
| first party, total | 18 | 1330.9 | 3351.1 |
| third party, Script | 1 | 27.0 | 98.4 |
| third party, total | 1 | 27.0 | 98.4 |

### Live desktop, after scrolling the whole page

| Type | Requests | Transfer (KB) | Decoded (KB) |
|---|---|---|---|
| first party, Document | 1 | 18.0 | 95.2 |
| first party, Script | 7 | 674.5 | 2421.2 |
| first party, Stylesheet | 1 | 14.3 | 78.3 |
| first party, Font | 7 | 199.1 | 191.4 |
| first party, Image | 2 | 254.6 | 323.8 |
| first party, Other | 1 | 212.5 | 282.5 |
| first party, total | 19 | 1373.0 | 3392.4 |
| third party, Script | 1 | 27.0 | 98.4 |
| third party, total | 1 | 27.0 | 98.4 |

### Requests, local (first batch, mobile profile)

| File | Type | Encoding | Transfer (bytes) | Decoded (bytes) |
|---|---|---|---|---|
| `/` | Document | br | 15332 | 94862 |
| `/_next/static/chunks/0~0w.e2mdczwy.css` | Stylesheet | br | 13084 | 78305 |
| `/_next/static/media/0c89a48fa5027cee-s.p.0rd3rjvnnhw7n.woff2` | Font | none | 23277 | 22320 |
| `/_next/static/media/0c8f209abc35ee02-s.p.03rqv30url-~q.woff2` | Font | none | 18801 | 17844 |
| `/_next/static/media/70bc3e132a0a741e-s.p.1409xf.ylxg8g.woff2` | Font | none | 41437 | 40480 |
| `/_next/static/media/8bd76523131fa0fc-s.p.0jox806dnq5~c.woff2` | Font | none | 40261 | 39304 |
| `/_next/static/media/9ebad9a1240a1e4f-s.p.0lukqmlj-564a.woff2` | Font | none | 27505 | 26548 |
| `/_next/static/media/fad69795a077455b-s.p.08-a0qexde~kr.woff2` | Font | none | 18617 | 17660 |
| `/_next/static/media/fba5a26ea33df6a3-s.p.0eehd8tgys7nv.woff2` | Font | none | 28229 | 27272 |
| `/logo.svg` | Image | br | 212541 | 282473 |
| `/_next/static/chunks/0cj810no~2gue.js` | Script | br | 8315 | 22560 |
| `/_next/static/chunks/0woo_fz5bo6qd.js` | Script | br | 46815 | 196178 |
| `/_next/static/chunks/0a5k-l.hjy~6-.js` | Script | br | 67913 | 227318 |
| `/_next/static/chunks/turbopack-072hcuoz~phhb.js` | Script | br | 5016 | 10546 |
| `/_next/static/chunks/0.6ro5p.38rr6.js` | Script | br | 1779 | 1477 |
| `/_next/static/chunks/0glpxc-ez8yv-.js` | Script | br | 14240 | 57737 |
| `/_next/static/chunks/0iiobmzen31bp.js` | Script | br | 453079 | 1904892 |
| `/icon.svg` | Other | br | 212546 | 282473 |
| `app.cal.com/embed/embed.js` | Script | br | 26970 | 98414 |

### Requests, live (desktop profile)

| File | Type | Encoding | Transfer (bytes) | Decoded (bytes) |
|---|---|---|---|---|
| `/` | Document | zstd | 18032 | 95229 |
| `/_next/static/chunks/0cj810no~2gue.js` | Script | br | 8981 | 22560 |
| `/_next/static/chunks/turbopack-072hcuoz~phhb.js` | Script | br | 5620 | 11007 |
| `/_next/static/chunks/0glpxc-ez8yv-.js` | Script | br | 15452 | 57737 |
| `/_next/static/chunks/0woo_fz5bo6qd.js` | Script | br | 51032 | 196178 |
| `/_next/static/chunks/0.6ro5p.38rr6.js` | Script | br | 1936 | 1477 |
| `/_next/static/media/fad69795a077455b-s.p.08-a0qexde~kr.woff2` | Font | none | 18749 | 17660 |
| `/_next/static/media/0c8f209abc35ee02-s.p.03rqv30url-~q.woff2` | Font | none | 18939 | 17844 |
| `/_next/static/media/8bd76523131fa0fc-s.p.0jox806dnq5~c.woff2` | Font | none | 40405 | 39304 |
| `/_next/static/media/9ebad9a1240a1e4f-s.p.0lukqmlj-564a.woff2` | Font | none | 27646 | 26548 |
| `/_next/static/media/fba5a26ea33df6a3-s.p.0eehd8tgys7nv.woff2` | Font | none | 28365 | 27272 |
| `/_next/static/chunks/0~0w.e2mdczwy.css` | Stylesheet | br | 14341 | 78305 |
| `/_next/static/chunks/0iiobmzen31bp.js` | Script | br | 518102 | 1904892 |
| `/_next/static/media/0c89a48fa5027cee-s.p.0rd3rjvnnhw7n.woff2` | Font | none | 23405 | 22320 |
| `/logo.svg` | Image | br | 212472 | 282473 |
| `/_next/static/media/70bc3e132a0a741e-s.p.1409xf.ylxg8g.woff2` | Font | none | 41575 | 40480 |
| `/_next/static/chunks/0a5k-l.hjy~6-.js` | Script | br | 73372 | 227318 |
| `app.cal.com/embed/embed.js` | Script | br | 26970 | 98414 |
| `/icon.svg` | Other | br | 212470 | 282473 |
| `/_next/image?url=%2Fbrutalist_concrete.webp&w=640&q=75` | Image | none | 42132 | 41334 |

## Build

| Metric | Value |
|---|---|
| Cold `pnpm build`, mean | 20.73 s |
| Standard deviation | 1.18 s |
| Median | 20.27 s |
| Range | 19.84 to 22.78 s |
| Each run (s) | 20.58, 19.84, 20.27, 22.78, 20.18 |
| CPU time, user / system | 53.85 s / 8.76 s |
| Peak memory | 1076 MB |
| `.next/static` | 3325539 bytes, 41 files |
| `.next` without cache | 21343724 bytes |
| `node_modules` (apparent size) | 503545301 bytes, 28891 files |
| Packages in lockfile | 435 (7 dependencies, 9 dev dependencies) |
| Source in `app/` and `components/` (ts, tsx, css) | 2873 lines |

### Files in `.next/static`

| Extension | Files | Raw (bytes) | Brotli (bytes) |
|---|---|---|---|
| `.js` | 12 | 2533979 | 628735 |
| `.css` | 1 | 78305 | 12068 |
| `.woff2` | 24 | 417444 | 417489 |
| `.png` | 2 | 11696 | 11382 |
| `.ico` | 1 | 1642 | 1598 |
| `.svg` | 1 | 282473 | 211552 |

## Visual baseline

Screenshots are in `website_baseline/screenshots/next_local/`, a folder next to the main checkout, outside the repository.

| Viewport | Page height (px) | Scroll stops | Console errors |
|---|---|---|---|
| desktop_1920 | 7979 | 13 | 0 |
| desktop_1440 | 7065 | 14 | 0 |
| laptop_1024 | 6012 | 14 | 0 |
| tablet_820 | 9161 | 14 | 0 |
| mobile_390 | 6265 | 13 | 0 |

Repeat run of the same build: 86 screens compared, 79 identical, 7 different.

| Screen that differed | Pixels | Share |
|---|---|---|
| `desktop_1440/13_bottom.png` | 36 | 0.0028% |
| `desktop_1920/11_services_onward_03.png` | 36 | 0.0017% |
| `desktop_1920/12_bottom.png` | 36 | 0.0017% |
| `laptop_1024/11_services_onward_03.png` | 36 | 0.0046% |
| `laptop_1024/12_services_onward_04.png` | 36 | 0.0046% |
| `laptop_1024/13_bottom.png` | 36 | 0.0046% |
| `states/hover_footer_cta.png` | 36 | 0.0028% |

The differences come from a 6 px animated dot near the end of the page. A larger difference after the port is real. Touch gestures, Safari, Firefox and real phones are not covered.

### Navbar scroll curve (desktop)

Frame-by-frame timings for the reveal and text animations are in `motion.json` in the same folder.

| Scroll y | Down: width | height | brand opacity | brand width | Up: width | height | brand opacity | brand width |
|---|---|---|---|---|---|---|---|---|
| 0 | 1280 | 62 | 1.00 | 90 | 1280 | 62 | 1.00 | 90 |
| 50 | 1168 | 60 | 0.67 | 60 | 1280 | 62 | 1.00 | 90 |
| 100 | 1056 | 57 | 0.33 | 30 | 1280 | 62 | 1.00 | 90 |
| 150 | 944 | 55 | 0.00 | 0 | 1280 | 62 | 1.00 | 90 |
| 200 | 832 | 52 | 0.00 | 0 | 1280 | 62 | 1.00 | 90 |
| 250 | 720 | 50 | 0.00 | 0 | 1280 | 62 | 1.00 | 90 |
| 300 | 720 | 50 | 0.00 | 0 | 1280 | 62 | 1.00 | 90 |
| 350 | 720 | 50 | 0.00 | 0 | 1280 | 62 | 1.00 | 90 |
| 400 | 720 | 50 | 0.00 | 0 | 1280 | 62 | 1.00 | 90 |
| 450 | 720 | 50 | 0.00 | 0 | 1168 | 60 | 0.67 | 60 |
| 500 | 720 | 50 | 0.00 | 0 | 1056 | 57 | 0.33 | 30 |
| 550 | 720 | 50 | 0.00 | 0 | 944 | 55 | 0.00 | 0 |
| 600 | 720 | 50 | 0.00 | 0 | 832 | 52 | 0.00 | 0 |
| 650 | 720 | 50 | 0.00 | 0 | 720 | 50 | 0.00 | 0 |
| 700 | 720 | 50 | 0.00 | 0 | 720 | 50 | 0.00 | 0 |
| 750 | 720 | 50 | 0.00 | 0 | 720 | 50 | 0.00 | 0 |
| 800 | 720 | 50 | 0.00 | 0 | 720 | 50 | 0.00 | 0 |

## Every Lighthouse run

Times are in ms.

### Local mobile

| Run | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Speed idx | TTI | Main thread | JS boot | Bytes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| next_local 1 | 71 | 96 | 100 | 100 | 2079 | 2079 | 1081 | 0 | 4801 | 9654 | 4591 | 2741 | 1275756 |
| next_local 2 | 71 | 96 | 100 | 100 | 1058 | 1058 | 1947 | 0 | 3900 | 8596 | 6338 | 4355 | 1274846 |
| next_local 3 | 79 | 96 | 100 | 100 | 1096 | 1096 | 843 | 0 | 3517 | 8046 | 5007 | 3259 | 1275511 |
| next_local 4 | 76 | 96 | 100 | 100 | 1041 | 1041 | 1062 | 0 | 3495 | 8220 | 5091 | 3333 | 1274846 |
| next_local 5 | 76 | 96 | 100 | 100 | 2103 | 2103 | 771 | 0 | 4131 | 9521 | 4898 | 3236 | 1275511 |
| next_local_repeat 1 | 74 | 96 | 100 | 100 | 2158 | 2158 | 830 | 0 | 4487 | 9949 | 4956 | 3331 | 1274846 |
| next_local_repeat 2 | 73 | 96 | 100 | 100 | 1001 | 1001 | 1366 | 0 | 3631 | 8231 | 5550 | 3769 | 1274846 |
| next_local_repeat 3 | 77 | 96 | 100 | 100 | 1023 | 1023 | 1023 | 0 | 3287 | 8098 | 4861 | 3260 | 1274846 |
| next_local_repeat 4 | 75 | 96 | 100 | 100 | 1023 | 1023 | 1197 | 0 | 3556 | 8164 | 5236 | 3500 | 1274846 |
| next_local_repeat 5 | 78 | 96 | 100 | 100 | 917 | 917 | 937 | 0 | 3392 | 7956 | 4863 | 3183 | 1274846 |
| next_local_third 1 | 75 | 96 | 100 | 100 | 2139 | 2139 | 774 | 0 | 4488 | 10042 | 4924 | 3182 | 1275502 |
| next_local_third 2 | 77 | 96 | 100 | 100 | 1012 | 1012 | 971 | 0 | 3471 | 8130 | 4952 | 3253 | 1274846 |
| next_local_third 3 | 77 | 96 | 100 | 100 | 1024 | 1024 | 1020 | 0 | 3484 | 8136 | 4916 | 3316 | 1274846 |
| next_local_third 4 | 76 | 96 | 100 | 100 | 1035 | 1035 | 1070 | 0 | 3570 | 8058 | 5067 | 3391 | 1274846 |
| next_local_third 5 | 78 | 96 | 100 | 100 | 1021 | 1021 | 935 | 0 | 3545 | 8133 | 5034 | 3281 | 1274846 |

### Local desktop

| Run | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Speed idx | TTI | Main thread | JS boot | Bytes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| next_local 1 | 99 | 96 | 100 | 100 | 299 | 299 | 69 | 0 | 1153 | 971 | 1330 | 800 | 1274846 |
| next_local 2 | 84 | 96 | 100 | 100 | 330 | 330 | 332 | 0 | 1451 | 1672 | 1898 | 1079 | 1274846 |
| next_local 3 | 85 | 96 | 100 | 100 | 337 | 337 | 326 | 0 | 1392 | 1575 | 1812 | 1024 | 1274846 |
| next_local 4 | 90 | 96 | 100 | 100 | 317 | 317 | 241 | 0 | 1383 | 1658 | 1717 | 1026 | 1274846 |
| next_local 5 | 86 | 96 | 100 | 100 | 327 | 327 | 297 | 0 | 1423 | 1687 | 1842 | 1067 | 1274847 |
| next_local_repeat 1 | 95 | 96 | 100 | 100 | 299 | 299 | 173 | 0 | 1200 | 1524 | 1454 | 867 | 1274846 |
| next_local_repeat 2 | 98 | 96 | 100 | 100 | 285 | 285 | 117 | 0 | 1165 | 1528 | 1376 | 801 | 1274846 |
| next_local_repeat 3 | 99 | 96 | 100 | 100 | 286 | 286 | 95 | 0 | 1119 | 1566 | 1273 | 809 | 1274845 |
| next_local_repeat 4 | 99 | 96 | 100 | 100 | 305 | 305 | 98 | 0 | 1123 | 1468 | 1367 | 783 | 1274846 |
| next_local_repeat 5 | 99 | 96 | 100 | 100 | 292 | 292 | 77 | 0 | 1161 | 1566 | 1265 | 765 | 1274846 |
| next_local_third 1 | 99 | 96 | 100 | 100 | 291 | 291 | 77 | 0 | 1136 | 1573 | 1324 | 823 | 1274846 |
| next_local_third 2 | 99 | 96 | 100 | 100 | 286 | 286 | 102 | 0 | 1162 | 1562 | 1367 | 848 | 1274846 |
| next_local_third 3 | 99 | 96 | 100 | 100 | 276 | 276 | 61 | 0 | 1131 | 1512 | 1362 | 834 | 1274846 |
| next_local_third 4 | 99 | 96 | 100 | 100 | 296 | 296 | 92 | 0 | 1157 | 1554 | 1368 | 808 | 1274846 |
| next_local_third 5 | 99 | 96 | 100 | 100 | 288 | 288 | 88 | 0 | 1129 | 1583 | 1317 | 824 | 1274846 |

### Live mobile

| Run | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Speed idx | TTI | Main thread | JS boot | Bytes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| production_live 1 | 63 | 96 | 92 | 100 | 2442 | 2442 | 1769 | 0 | 5598 | 8957 | 6390 | 3557 | 1357872 |
| production_live 2 | 77 | 96 | 92 | 100 | 1847 | 1847 | 817 | 0 | 3979 | 8291 | 5331 | 3526 | 1356937 |
| production_live 3 | 77 | 96 | 92 | 100 | 1866 | 1866 | 818 | 0 | 3926 | 8269 | 5466 | 3486 | 1356886 |
| production_live 4 | 76 | 96 | 92 | 100 | 1871 | 1871 | 857 | 0 | 3841 | 7277 | 5525 | 3510 | 1356874 |
| production_live 5 | 73 | 96 | 92 | 100 | 1864 | 1864 | 1134 | 0 | 4253 | 8311 | 5795 | 3448 | 1356879 |

### Live desktop

| Run | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Speed idx | TTI | Main thread | JS boot | Bytes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| production_live 1 | 98 | 96 | 92 | 100 | 634 | 634 | 75 | 0 | 1462 | 1484 | 1560 | 864 | 1356900 |
| production_live 2 | 97 | 96 | 92 | 100 | 648 | 648 | 87 | 0 | 1463 | 1660 | 1462 | 849 | 1356873 |
| production_live 3 | 97 | 96 | 92 | 100 | 648 | 648 | 92 | 0 | 1491 | 1712 | 1553 | 864 | 1356912 |
| production_live 4 | 88 | 96 | 92 | 100 | 650 | 650 | 243 | 0 | 1681 | 1665 | 1834 | 1177 | 1356926 |
| production_live 5 | 88 | 96 | 92 | 100 | 661 | 661 | 239 | 0 | 1676 | 1644 | 1794 | 1137 | 1356891 |

## How to compare after the port

- Re-measure the old and new builds side by side, on the same day and Chrome version. Local desktop scores ranged widely between batches.
- Compare live numbers only after a deploy.
- Scripts and re-run commands: `website_baseline/baseline_report.md`.

## Problems already present

1. `public/logo.svg` and `app/icon.svg` are the same 282 KB file with an embedded raster image, downloaded twice.
2. Live site: Cloudflare's analytics script is blocked by the Content-Security-Policy (1 console error).
3. One failing accessibility audit: colour contrast.
4. Space Grotesk is loaded but unused.
5. The cal.com embed script loads on every visit.

## After: Astro port (branch `feat/astro-port`, uncommitted)

Measured 2026-11-27, same machine, Lighthouse 13.6.0 and Windows Chrome 158 as the baseline.
Both builds served locally through the same brotli-5 proxy, batches interleaved
(port, Next, port). Next.js: 30 runs per form factor today. Astro: 10 (final build).
Today's Next numbers are better than the morning batches above (load on the
machine differs), so compare the two columns below, not against the table above.

### Lighthouse, median

| Metric | Next mobile | Astro mobile | Next desktop | Astro desktop |
|---|---|---|---|---|
| Performance score | 89 | 98 | 100 | 100 |
| Accessibility / Best practices / SEO | 96 / 100 / 100 | 96 / 100 / 100 | 96 / 100 / 100 | 96 / 100 / 100 |
| First / largest contentful paint (ms) | 915 / 917 | 954 / 954 | 256 / 257 | 280 / 280 |
| Total blocking time (ms) | 406 | 172 | 12 | 0 |
| Cumulative layout shift | 0 | 0 | 0 | 0 |
| Speed index (ms) | 2744 | 1708 | 935 | 696 |
| Time to interactive (ms) | 7656 | 3794 | 906 | 280 |
| Main-thread work (ms) | 2870 | 1752 | 777 | 517 |
| JavaScript boot-up (ms) | 1864 | 1086 | 476 | 270 |
| Total transfer (bytes) | 1274846 | 469261 | 1274846 | 508885 |

Failing audit in both: colour contrast (unchanged design).

### Runtime (median of profiles)

| Metric | Next mobile | Astro mobile | Next desktop | Astro desktop |
|---|---|---|---|---|
| DOM elements | 675 | 678 | 675 | 678 |
| JS heap (bytes) | 13434912 | 9691308 | 13324892 | 8524978 |
| Idle on hero, CPU (ms per s) | 83.6 | 87.9 | 99.3 | 103.2 |
| Idle at footer, CPU (ms per s) | 14.5 | 14.0 | 22.2 | 21.0 |
| Scroll frame p95 (ms) | 16.8 | 16.8 | 16.8 | 16.8 |

Idle CPU on the hero is the shader, which is the same code in both.

### Build

| Metric | Next.js | Astro |
|---|---|---|
| Cold `pnpm build`, mean of 5 (hyperfine) | 20.73 s | 3.02 s ± 0.39 |
| Peak memory | 1076 MB | 762 MB |
| Output | `.next/static` 3.33 MB, 41 files | `dist` 1.99 MB, 27 files (whole site) |
| JavaScript shipped, raw / brotli 11 | 2.53 MB / 629 KB | 1.29 MB / 275 KB |
| CSS, brotli | 12 KB | 9.8 KB |
| HTML, brotli | 15 KB | 12 KB |
| `node_modules` (apparent) | 504 MB | 313 MB |
| Runtime / dev dependencies | 7 / 9 | 3 / 10 |
| Packages in lockfile | 435 | 491 (includes `astro check` tooling) |

### Visual and functional parity

- 87 screens (5 viewports, every scroll stop, hover/focus/menu/tab/reduced-motion states) against the baseline capture. Remaining pixel differences: the navbar logo (traced vector instead of the embedded PNG), the manifesto concrete image (a correctly sized 256/384 px WebP instead of Next's 640 px), and Cal.com's own modal content.
- Hero shader: the 8 WGSL programs compiled on the GPU are identical to the Next build's (instance ids normalised).
- Navbar shrink/expand curve: identical at every 50 px step, both directions. Menu, reveal and phase-text timings within one or two frames.
- Scripted checks identical on both: anchor and logo scrolling (URL hash unchanged), process tabs and layer transforms, mobile menu (scroll lock, close on link), reduced motion, live clock, resize from mobile to desktop.
- Intended differences: the header fades in on first paint instead of after hydration; Cal.com's script loads on first interaction instead of on page load; the closed mobile menu stays in the DOM hidden instead of being removed.
