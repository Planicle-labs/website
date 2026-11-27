import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist/", ".astro/", "node_modules/", "resources/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      globals: { window: "readonly", document: "readonly", console: "readonly" },
    },
  },
);
