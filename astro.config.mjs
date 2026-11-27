// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.planicle.com",
  // CSS ships as one hashed, cacheable file. Inlining it made the HTML exceed the
  // first network round trip and let text paint before the preloaded fonts arrived.
  build: { inlineStylesheets: "never" },
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
