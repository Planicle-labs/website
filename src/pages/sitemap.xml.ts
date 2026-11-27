import type { APIRoute } from "astro";
import { SITE_URL } from "../data/site";

// lastmod is the build time.
const PAGES = [
  { loc: SITE_URL, changefreq: "weekly", priority: "1" },
  { loc: `${SITE_URL}/snug`, changefreq: "weekly", priority: "0.8" },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (p) => `<url>
<loc>${p.loc}</loc>
<lastmod>${lastmod}</lastmod>
<changefreq>${p.changefreq}</changefreq>
<priority>${p.priority}</priority>
</url>`,
).join("\n")}
</urlset>
`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
