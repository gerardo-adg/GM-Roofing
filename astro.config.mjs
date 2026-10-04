// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gmroofs.com",
  trailingSlash: "always",
  build: { format: "directory" },
  // Mux Player is large but only loads when someone presses play.
  vite: { build: { chunkSizeWarningLimit: 1200 } },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/thank-you/") && !page.includes("/404"),
    }),
  ],
});
