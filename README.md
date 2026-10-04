# GM Roofing — website

Marketing site for GM Roofing (Sacramento Valley), built with [Astro](https://astro.build). Static output and no client framework. The only JavaScript is the menu, header-on-scroll and scroll reveals.

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
| Project photos (gallery hidden until added) | `src/data/projects.ts` + `public/images/projects/` |
| Homepage | `src/pages/index.astro` |
| About / Service areas / Contact | `src/pages/*.astro` |
| Colors, fonts, spacing | `src/styles/global.css` (`:root` variables) |
| Header, footer, CTA band, form | `src/components/` |

**Add a service:** add an object to `services.ts`. The page, the menu entry, the footer link, the form option and the schema markup all update automatically.

**Hero photo:** set `heroImage` at the top of `src/pages/index.astro` (e.g. `/images/hero.jpg` in `public/`) to replace the roof-anatomy illustration.

## Before launch

The build prints a reminder while any of these are blank in `src/data/business.ts`:

- `phone`: phone buttons, the header number and the mobile "Call" button appear automatically once it's set
- `email`
- `license.number`: verify at cslb.ca.gov (a record for "Gm Roofing" #1144977 was found but not confirmed as this business)
- Confirm the `cities` list (taken from the project brief)
- Replace the placeholder privacy policy text in `src/pages/privacy-policy.astro`

## Deploy (Netlify)

`netlify.toml` runs `npm run build` and publishes `dist/`. The estimate form on `/contact/` is a Netlify Form (`estimate-request`). Submissions show up under **Forms** in the Netlify dashboard. Turn on email notifications there so no leads are missed.
