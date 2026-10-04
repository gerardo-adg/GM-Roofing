import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) =>
  new Response(`# Search engines and AI crawlers are welcome.\nUser-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`, {
    headers: { "Content-Type": "text/plain" },
  });
