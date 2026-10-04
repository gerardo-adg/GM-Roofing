# GM Roofing: website

Marketing site for GM Roofing (Sacramento Valley), built with [Astro](https://astro.build). Static output and no client framework. JavaScript is limited to the menu, the header, scroll animations and lazy-loaded Mux video.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Where things live

| Change | File |
|---|---|
| Phone, email, license, cities, process steps | `src/data/business.ts` |
| Service pages: copy, FAQs, SEO titles | `src/data/services.ts` (each entry becomes `/<slug>/`) |
| Customer reviews (section hidden until added) | `src/data/reviews.ts` |
| Videos and stills on Mux (hidden until added) | `src/data/media.ts`, `src/data/projects.ts`. See **MEDIA.md** |
| Structured data (schema.org) | `src/lib/schema.ts` |
| Homepage | `src/pages/index.astro` |
| About / Service areas / Contact | `src/pages/*.astro` |
| Colors, fonts, spacing | `src/styles/global.css` (`:root` variables) |
| Header, footer, CTA band, form | `src/components/` |

**Add a service:** add an object to `services.ts`. The page, the menu entry, the footer link, the form option and the schema markup all update automatically.

**Hero video:** add a Mux playback ID to `media.hero` in `src/data/media.ts` to replace the roof-anatomy illustration with a full-bleed video. See MEDIA.md for the shot list.

## Copy rules

`npm run build` also runs `scripts/check-copy.mjs`, which fails the build if any page contains an em or en dash or a stock phrase like "start to finish", "quality craftsmanship" or "peace of mind". Add phrases to the `BANNED` list as you spot them.

## SEO and AI search

- Each page outputs one linked schema.org graph: `RoofingContractor` (business), `WebSite`, `WebPage`, `BreadcrumbList`, `Service` for each service page, `FAQPage` where there are FAQs, and `VideoObject` once Mux videos are added.
- Service pages open with a short direct answer and an "At a glance" box, which are easy for Google snippets and AI assistants to quote.
- `/llms.txt` gives AI tools a plain-text summary of the business, services and FAQs, generated from the same data as the site.
- After launch: verify the site in Google Search Console, submit `sitemap-index.xml`, and keep the Google Business Profile name, phone and service area identical to `business.ts`.

## Before launch

The build prints a reminder while any of these are blank in `src/data/business.ts`:

- `phone`: phone buttons, the header number and the mobile "Call" button appear automatically once it's set
- `email`
- `license.number`: verify at cslb.ca.gov (a record for "Gm Roofing" #1144977 was found but not confirmed as this business)
- Confirm the `cities` list (taken from the project brief)
- Replace the placeholder privacy policy text in `src/pages/privacy-policy.astro`

## Deploy (Netlify)

`netlify.toml` runs `npm run build` and publishes `dist/`. The estimate form on `/contact/` is a Netlify Form (`estimate-request`). Submissions show up under **Forms** in the Netlify dashboard. Turn on email notifications there so no leads are missed.
