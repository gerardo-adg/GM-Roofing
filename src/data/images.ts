/**
 * Photos that live in the repo (optimized by Astro at build time into
 * responsive AVIF/WebP). Video stays on Mux; see media.ts.
 */
import type { ImageMetadata } from "astro";
import roofReplacement from "../assets/heroes/roof-replacement.jpg";
import roofMaintenance from "../assets/heroes/roof-maintenance.jpg";
import tileRoofing from "../assets/heroes/tile-roofing.jpg";
import roofRepair from "../assets/projects/tile-repair-progress.jpg";
import commercialCard from "../assets/showcase/commercial-2.jpg";
import about from "../assets/heroes/about.jpg";
import serviceAreas from "../assets/heroes/service-areas.jpg";
import aboutQuote from "../assets/about-quote.jpg";
import nrGutter from "../assets/projects/north-ridge-gutter.jpg";
import nrFront from "../assets/projects/north-ridge-front.jpg";

/** Background photo for a service page hero, keyed by service slug. Used when there's no hero video. */
export const serviceHeroImages: Record<string, { src: ImageMetadata; alt: string }> = {
  "roof-replacement-sacramento": {
    src: roofReplacement,
    alt: "Aerial view of a two-story Sacramento home with a new charcoal architectural shingle roof",
  },
  "roof-repair-sacramento": {
    src: roofRepair,
    alt: "GM Roofing crew installing new underlayment and battens during a tile roof repair on a Sacramento home",
  },
  "tile-roofing-sacramento": {
    src: tileRoofing,
    alt: "Aerial view of a GM Roofing crew re-laying concrete tile with new metal flashing on a Sacramento home",
  },
  "roof-maintenance-sacramento": {
    src: roofMaintenance,
    alt: "GM Roofing crew lifting concrete tiles to replace underlayment and flashing on a Sacramento Valley home",
  },
};

/**
 * Photo for a service in the homepage showcase, keyed by service slug.
 * Used instead of the service page's video when the service has no
 * showcase clip of its own.
 */
export const showcaseImages: Record<string, { src: ImageMetadata; alt: string; position?: string }> = {
  "commercial-roofing-sacramento": {
    src: commercialCard,
    alt: "Finished shingle roof with a ridge vent and new roof jacks on a Sacramento commercial building",
    position: "50% 78%",
  },
};

/** About page hero background. */
export const aboutHeroImage = {
  src: about,
  alt: "Overhead view of a GM Roofing roofer in a company shirt and tool belt working at the edge of a shingle roof",
};

/** Service Areas page hero background. */
export const serviceAreasHeroImage = {
  src: serviceAreas,
  alt: "Downtown Sacramento skyline and the Tower Bridge over the Sacramento River at sunset",
};

/** About page: photo beside the owner's "I don't really look at this as a job" quote. */
export const aboutQuoteImage = {
  src: aboutQuote,
  alt: "GM Roofing roofer installing a CertainTeed ridge vent on a new shingle roof",
};

/**
 * Photo for each service card (About page and service page grids).
 * Falls back to the service's showcase photo, then its page hero photo.
 */
const cardOnly: Record<string, { src: ImageMetadata; alt: string; position?: string }> = {
  "roof-inspections-sacramento": {
    src: nrGutter,
    alt: "Close-up of shingles, roof edge and gutter screen, the details a GM Roofing inspection checks",
    position: "50% 55%",
  },
  "residential-roofing-sacramento": {
    src: nrFront,
    alt: "Aerial view of a Sacramento Valley home with a new GM Roofing shingle roof",
  },
};
export const serviceCardImage = (slug: string) => cardOnly[slug] ?? showcaseImages[slug] ?? serviceHeroImages[slug];
