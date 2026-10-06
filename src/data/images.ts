/**
 * Photos that live in the repo (optimized by Astro at build time into
 * responsive AVIF/WebP). Video stays on Mux; see media.ts.
 */
import type { ImageMetadata } from "astro";
import roofReplacement from "../assets/heroes/roof-replacement.jpg";
import roofMaintenance from "../assets/heroes/roof-maintenance.jpg";
import tileRoofing from "../assets/heroes/tile-roofing.jpg";
import roofRepair from "../assets/heroes/roof-repair.jpg";
import commercialCard from "../assets/showcase/commercial.jpg";

/** Background photo for a service page hero, keyed by service slug. Used when there's no hero video. */
export const serviceHeroImages: Record<string, { src: ImageMetadata; alt: string }> = {
  "roof-replacement-sacramento": {
    src: roofReplacement,
    alt: "Aerial view of a two-story Sacramento home with a new charcoal architectural shingle roof",
  },
  "roof-repair-sacramento": {
    src: roofRepair,
    alt: "GM Roofing crew repairing a tile roof and flashing on a hillside home in the Sacramento Valley foothills",
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
    alt: "GM Roofing roofer nailing new shingles over CertainTeed underlayment on a Sacramento commercial building",
    position: "50% 55%",
  },
};
