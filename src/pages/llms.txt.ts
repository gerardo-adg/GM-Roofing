/**
 * /llms.txt: a plain-text summary of the business for AI assistants and
 * AI search tools (the llms.txt convention). Generated from the same data
 * as the site, so it never drifts out of date.
 */
import type { APIRoute } from "astro";
import { business, hasPhone, hasEmail } from "../data/business";
import { services } from "../data/services";
import { story } from "../data/story";

export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(p, site).toString();
  const lines = [
    `# ${business.name}`,
    "",
    `> ${business.descriptionShort}`,
    "",
    `${business.name} is a family-owned roofing contractor based in ${business.primaryCity}, California. Its main services are roof replacement and roof repair for asphalt shingle and tile roofs, plus tile roofing, roof inspections and commercial roofing. Every project starts with an in-person inspection and a free written estimate.`,
    "",
    "## About the owner",
    "",
    `${story.short} He passed both the CSLB trade exam and the Law and Business exam on his first try and holds California C-39 roofing license #${business.license.number}.`,
    "",
    "## Contact",
    "",
    ...(hasPhone ? [`- Phone: ${business.phone.display}`] : []),
    ...(hasEmail ? [`- Email: ${business.email}`] : []),
    `- Free estimate request: ${url("/contact/")}`,
    `- Service area: ${business.cities.join(", ")} (${business.primaryRegion}, California)`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name} in ${business.primaryCity}](${url(`/${s.slug}/`)}): ${s.answer}`),
    "",
    "## Frequently asked questions",
    "",
    ...services.flatMap((s) => (s.faqs ?? []).slice(0, 3).map((f) => `- **${f.q}** ${f.a}`)),
    "",
    "## Other pages",
    "",
    `- [About](${url("/about/")})`,
    `- [Service areas](${url("/service-areas/")})`,
    `- [Sitemap](${url("/sitemap-index.xml")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
