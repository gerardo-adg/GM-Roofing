/**
 * SINGLE SOURCE OF TRUTH for business details.
 *
 * Every page, CTA, the footer and the schema.org markup read from here.
 * Fields left as an empty string ("") are hidden on the site automatically
 * (e.g. no phone = phone buttons fall back to the estimate form), and the
 * build prints a reminder listing anything still missing.
 *
 * Contact details, license, hours and service areas come from the client's
 * own site. Anything still blank is hidden on the site automatically.
 */

export const business = {
  name: "GM Roofing",
  legalName: "GM Roofing",
  tagline: "Roof replacement and repair in Sacramento.",
  descriptionShort:
    "GM Roofing is a family-owned roofing contractor serving Sacramento Valley homeowners and businesses with roof replacement, repair, tile roofing, inspections, and commercial roofing.",

  phone: { display: "(916) 923-8519", tel: "+19169238519" },
  email: "gmroofingca@gmail.com",

  address: {
    streetAddress: "", // only shown if showOnSite is true
    addressLocality: "Sacramento",
    addressRegion: "CA",
    postalCode: "95833",
    showOnSite: false,
  },

  license: {
    number: "1144977",
    type: "C-39 Roofing Contractor",
  },
  bondedAndInsured: true,

  /** Days use schema.org names. Times are 24h. */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], label: "Mon to Sat", opens: "06:00", closes: "21:00" },
    { days: ["Sunday"], label: "Sunday", opens: "08:00", closes: "21:00" },
  ],

  familyOwned: true,

  /** Owner. Name and photo are optional: the About page and schema use them once filled in. */
  owner: {
    name: "Giovanni Mondragon",
    /** e.g. "/images/owner.webp" in /public, roughly 4:5 portrait. */
    photo: "",
  },
  primaryRegion: "Sacramento Valley",
  primaryCity: "Sacramento",

  cities: [
    "Sacramento",
    "Elk Grove",
    "Roseville",
    "Folsom",
    "Davis",
    "Woodland",
    "West Sacramento",
    "Citrus Heights",
    "Fair Oaks",
    "Cameron Park",
    "Granite Bay",
    "Arden",
  ],

  // Add full profile URLs to show them in the footer + schema sameAs.
  social: {
    facebook: "",
    instagram: "https://www.instagram.com/gmroofing_sac/",
    yelp: "https://www.yelp.com/biz/gm-roofing-sacramento",
    google: "",
  },

  process: [
    { step: "Request an inspection", text: "Tell us what's going on or ask for a general roof check. We'll find a time that works." },
    { step: "We walk the roof", text: "We get up on the roof and document its actual condition instead of guessing from the ground." },
    { step: "You get it in writing", text: "A written estimate that explains what's needed and why. Take your time deciding." },
    { step: "The work gets done", text: "We schedule the job, complete it and leave the site the way we found it." },
  ],

  siteUrl: "https://gmroofs.com",
};

export const hasPhone = Boolean(business.phone.tel);
export const hasEmail = Boolean(business.email);
export const hasLicense = Boolean(business.license.number);

/** Href for the main "call" action: falls back to the estimate page when no phone is set. */
export const callHref = hasPhone ? `tel:${business.phone.tel}` : "/contact/";

/** "6 am" / "6:30 am" style time for display. */
export const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "am" : "pm"}`;
};
export const hoursText = business.hours.map((h) => `${h.label}: ${fmtTime(h.opens)} to ${fmtTime(h.closes)}`);

/** Values still missing; printed during the build as a pre-launch checklist. */
export const missingValues = [
  !hasPhone && "business.phone",
  !hasEmail && "business.email",
  !hasLicense && "business.license.number",
].filter(Boolean) as string[];
