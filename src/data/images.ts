/**
 * Photos that live in the repo (optimized by Astro at build time into
 * responsive AVIF/WebP). Video stays on Mux; see media.ts.
 */
import type { ImageMetadata } from "astro";
import roofReplacement from "../assets/heroes/roof-replacement.jpg";
import roofMaintenance from "../assets/heroes/roof-maintenance.jpg";
import tileRoofing from "../assets/heroes/tile-roofing.jpg";

/** Background photo for a service page hero, keyed by service slug. Used when there's no hero video. */
export const serviceHeroImages: Record<string, { src: ImageMetadata; alt: string }> = {
  "roof-replacement-sacramento": {
    src: roofReplacement,
    alt: "Aerial view of a two-story Sacramento home with a new charcoal architectural shingle roof",
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
