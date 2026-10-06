/**
 * Project photos and clips for the Our Work page (and the "Recent work"
 * strip on the homepage, which shows the first three).
 *
 * Each project is either a photo in the repo (src/assets/...) or a Mux clip.
 * `size` sets the tile shape on the Our Work grid:
 *   "big" 2x2, "wide" 2x1, "tall" 1x2, "regular" 1x1.
 */
import type { ImageMetadata } from "astro";
import { media, type MuxClip } from "./media";
import replacementPhoto from "../assets/heroes/roof-replacement.jpg";
import maintenancePhoto from "../assets/heroes/roof-maintenance.jpg";
import tilePhoto from "../assets/heroes/tile-roofing.jpg";
import repairPhoto from "../assets/heroes/roof-repair.jpg";
import commercialPhoto from "../assets/showcase/commercial.jpg";
import edgePhoto from "../assets/heroes/about.jpg";

export type Project = {
  title: string;
  /** Service slug, used for the filter and the link. */
  service: string;
  location?: string;
  alt: string;
  photo?: ImageMetadata;
  clip?: MuxClip;
  size?: "big" | "wide" | "tall" | "regular";
  /** CSS object-position for the crop, e.g. "50% 30%". */
  position?: string;
};

export const projects: Project[] = [
  {
    title: "Full roof replacement",
    service: "roof-replacement-sacramento",
    alt: "GM Roofing crew replacing a roof in the Sacramento Valley",
    clip: media.showcase["roof-replacement-sacramento"],
    size: "big",
  },
  {
    title: "Commercial shingle roof",
    service: "commercial-roofing-sacramento",
    alt: "GM Roofing roofer nailing new shingles over CertainTeed underlayment on a Sacramento commercial building",
    photo: commercialPhoto,
    size: "tall",
    position: "50% 55%",
  },
  {
    title: "Concrete tile re-lay with new flashing",
    service: "tile-roofing-sacramento",
    alt: "Aerial view of a GM Roofing crew re-laying concrete tile with new metal flashing",
    photo: tilePhoto,
  },
  {
    title: "Roof repair",
    service: "roof-repair-sacramento",
    alt: "GM Roofing repairing a roof in the Sacramento Valley",
    clip: media.showcase["roof-repair-sacramento"],
  },
  {
    title: "New architectural shingle roof",
    service: "roof-replacement-sacramento",
    alt: "Aerial view of a two-story Sacramento home with a new charcoal architectural shingle roof",
    photo: replacementPhoto,
    size: "wide",
  },
  {
    title: "Tile roofing",
    service: "tile-roofing-sacramento",
    alt: "GM Roofing working on a concrete tile roof in the Sacramento Valley",
    clip: media.showcase["tile-roofing-sacramento"],
  },
  {
    title: "Tile repair on a foothills home",
    service: "roof-repair-sacramento",
    alt: "GM Roofing crew repairing a tile roof and flashing on a hillside home in the Sacramento Valley foothills",
    photo: repairPhoto,
    size: "wide",
  },
  {
    title: "Underlayment and flashing replacement",
    service: "roof-maintenance-sacramento",
    alt: "GM Roofing crew lifting concrete tiles to replace underlayment and flashing",
    photo: maintenancePhoto,
    size: "tall",
  },
  {
    title: "Commercial roofing",
    service: "commercial-roofing-sacramento",
    alt: "GM Roofing on a commercial roofing project in the Sacramento Valley",
    clip: media.services["commercial-roofing-sacramento"],
  },
  {
    title: "Working the roof edge",
    service: "roof-repair-sacramento",
    alt: "Overhead view of a GM Roofing roofer working at the edge of a shingle roof",
    photo: edgePhoto,
    position: "60% 50%",
    size: "wide",
  },
].filter((p) => p.photo || p.clip?.playbackId) as Project[];
