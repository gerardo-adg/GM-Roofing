/**
 * SINGLE SOURCE OF TRUTH for business details.
 *
 * Every page, CTA, the footer and the schema.org markup read from here.
 * Fields left as an empty string ("") are hidden on the site automatically
 * (e.g. no phone = phone buttons fall back to the estimate form), and the
 * build prints a reminder listing anything still missing.
 *
 * Nothing here is invented: values that could not be verified from the
 * client's existing site were left blank on purpose. Fill them in before launch.
 */

export const business = {
  name: "GM Roofing",
  legalName: "GM Roofing",
  tagline: "Sacramento Valley roofing, done right.",
  descriptionShort:
    "GM Roofing is a family-owned roofing contractor serving Sacramento Valley homeowners and businesses with roof replacement, repair, tile roofing, inspections, and commercial roofing.",

  // TODO before launch — e.g. display: "(916) 555-0123", tel: "+19165550123"
  phone: { display: "", tel: "" },
  // TODO before launch
  email: "",

  address: {
    streetAddress: "", // TODO — only shown if showOnSite is true
    addressLocality: "Sacramento",
    addressRegion: "CA",
    postalCode: "",
    showOnSite: false,
  },

  license: {
    // TODO — verify at cslb.ca.gov. A CSLB record for "Gm Roofing" (#1144977, C-39)
    // turned up in research but was NOT confirmed as this business, so it isn't used.
    number: "",
    type: "C-39 Roofing Contractor",
  },

  familyOwned: true,
  primaryRegion: "Sacramento Valley",
  primaryCity: "Sacramento",

  // Drawn from the project brief — confirm actual coverage before launch.
  cities: [
    "Sacramento",
    "Elk Grove",
    "Citrus Heights",
    "Roseville",
    "Folsom",
    "Rancho Cordova",
    "Fair Oaks",
    "Carmichael",
    "Orangevale",
    "Antelope",
    "Rocklin",
  ],

  // Add real profile URLs to show icons in the footer + schema sameAs.
  social: { facebook: "", instagram: "", google: "" },

  process: [
    { step: "Request an inspection", text: "Tell us what's going on, or ask for a general roof evaluation. We'll get a time on the calendar." },
    { step: "Roof evaluation", text: "We walk the roof in person and document its actual condition — not a guess from the ground." },
    { step: "Review your options", text: "You get a clear, written estimate that explains what's needed and why, with no pressure to decide on the spot." },
    { step: "Work completed", text: "Your roofing work is scheduled and completed, with the job site left the way we found it." },
  ],

  siteUrl: "https://gmroofs.com",
};

export const hasPhone = Boolean(business.phone.tel);
export const hasEmail = Boolean(business.email);
export const hasLicense = Boolean(business.license.number);

/** Href for the main "call" action — falls back to the estimate page when no phone is set. */
export const callHref = hasPhone ? `tel:${business.phone.tel}` : "/contact/";

/** Values still missing; printed during the build as a pre-launch checklist. */
export const missingValues = [
  !hasPhone && "business.phone",
  !hasEmail && "business.email",
  !hasLicense && "business.license.number",
].filter(Boolean) as string[];
