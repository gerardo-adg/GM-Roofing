/**
 * Photos that live in the repo (optimized by Astro at build time into
 * responsive AVIF/WebP). Video stays on Mux; see media.ts.
 */
import type { ImageMetadata } from "astro";
import roofReplacement from "../assets/heroes/roof-replacement.jpg";

/** Background photo for a service page hero, keyed by service slug. Used when there's no hero video. */
export const serviceHeroImages: Record<string, { src: ImageMetadata; alt: string }> = {
  "roof-replacement-sacramento": {
    src: roofReplacement,
    alt: "Aerial view of a two-story Sacramento home with a new charcoal architectural shingle roof",
  },
};
