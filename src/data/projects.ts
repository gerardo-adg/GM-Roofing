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
import nrFront from "../assets/projects/north-ridge-front.jpg";
import nrAngle from "../assets/projects/north-ridge-angle.jpg";
import nrGutter from "../assets/projects/north-ridge-gutter.jpg";
import cpPorch from "../assets/projects/cameron-park-porch.jpg";
import cpTop from "../assets/projects/cameron-park-top.jpg";
import cpSolar from "../assets/projects/cameron-park-solar.jpg";
import trBefore from "../assets/projects/tile-repair-before.jpg";
import trProgress from "../assets/projects/tile-repair-progress.jpg";
import tmTop from "../assets/projects/tile-maint-top.jpg";
import tmAngle from "../assets/projects/tile-maint-angle.jpg";
import tmClose from "../assets/projects/tile-maint-close.jpg";

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
    title: "Presidential Shake re-roof",
    service: "roof-replacement-sacramento",
    location: "Fair Oaks",
    alt: "Aerial view of a Fair Oaks home with a new CertainTeed Presidential Shake roof in Charcoal Black",
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

/**
 * Featured projects with a short write-up and materials list, shown near the
 * top of the Our Work page. Newest first.
 */

export type CaseStudy = {
  title: string;
  service: string;
  location: string;
  neighborhood?: string;
  summary: string;
  specs: { label: string; value: string }[];
  /** Two photos show side by side (good for before/after); three or more show as a mosaic. */
  photos: { src: ImageMetadata; alt: string; position?: string; label?: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Tile roof maintenance",
    service: "roof-maintenance-sacramento",
    location: "Sacramento, CA",
    summary:
      "Valleys are where water collects on a tile roof, so they are usually the first place to wear out. On this home the crew lifted the concrete tile along the valleys, put in new metal valley flashing, then cut and reset the tile to fit.",
    specs: [
      { label: "Roof type", value: "Concrete tile" },
      { label: "Work", value: "New metal valley flashing" },
      { label: "Tile", value: "Lifted, cut to fit and reset" },
    ],
    photos: [
      { src: tmAngle, alt: "GM Roofing crew cutting concrete tile beside new metal valley flashing on a Sacramento home" },
      { src: tmTop, alt: "Overhead view of a Sacramento tile roof with tile lifted along the valleys and new metal flashing installed" },
      { src: tmClose, alt: "GM Roofing roofer resetting concrete tile next to new valley flashing" },
    ],
  },
  {
    title: "Tile roof repair",
    service: "roof-repair-sacramento",
    location: "Sacramento, CA",
    summary:
      "The concrete tile on this hillside home was fine, but the underlayment beneath it had worn out. The crew lifted the tile, stripped the old underlayment and battens down to the deck, installed new underlayment and battens, and set the tile back in place.",
    specs: [
      { label: "Roof type", value: "Concrete tile" },
      { label: "Problem", value: "Worn-out underlayment under the tile" },
      { label: "Work", value: "New underlayment and battens, tile reset" },
    ],
    photos: [
      { src: trBefore, label: "Before", alt: "Tile lifted off a Sacramento roof showing the worn old underlayment and battens underneath" },
      { src: trProgress, label: "New underlayment", alt: "GM Roofing crew installing new underlayment and battens before resetting the concrete tile on a Sacramento home" },
    ],
  },
  {
    title: "Landmark Solaris re-roof",
    service: "roof-replacement-sacramento",
    location: "Cameron Park, CA",
    summary:
      "A full roof replacement on a farmhouse-style home with three front dormers and a wraparound porch. The new roof is CertainTeed Landmark Solaris in Moire Black, a reflective shingle that helps keep the attic cooler through Sacramento Valley summers.",
    specs: [
      { label: "Shingles", value: "CertainTeed Landmark Solaris" },
      { label: "Color", value: "Moire Black" },
      { label: "Scope", value: "Full roof replacement" },
    ],
    photos: [
      { src: cpPorch, alt: "Aerial view of a Cameron Park farmhouse with a new CertainTeed Landmark Solaris roof in Moire Black and a wraparound porch" },
      { src: cpTop, alt: "Overhead view of the new Moire Black roof with three dormers on a Cameron Park home" },
      { src: cpSolar, alt: "Aerial view down the ridge of the new Landmark Solaris roof with rooftop solar panels in Cameron Park" },
    ],
  },
  {
    title: "Presidential Shake re-roof",
    service: "roof-replacement-sacramento",
    location: "Fair Oaks, CA",
    neighborhood: "North Ridge Country Club",
    summary:
      "A full re-roof on a two-story home backing onto the North Ridge golf course. The new roof is CertainTeed Presidential Shake TL in Charcoal Black, finished with custom black OG gutters, 3-inch downspouts and stainless steel gutter screens.",
    specs: [
      { label: "Shingles", value: "CertainTeed Presidential Shake TL" },
      { label: "Color", value: "Charcoal Black" },
      { label: "Gutters", value: "Custom black OG gutters" },
      { label: "Downspouts", value: "3-inch" },
      { label: "Gutter guards", value: "Stainless steel screens" },
    ],
    photos: [
      { src: nrFront, alt: "Aerial view of a Fair Oaks home with a new CertainTeed Presidential Shake TL roof in Charcoal Black" },
      { src: nrAngle, alt: "Angled aerial view of the new Presidential Shake roof and black gutters on a North Ridge Country Club home" },
      { src: nrGutter, alt: "Close-up of Presidential Shake shingles at the roof edge with a stainless steel gutter screen", position: "50% 60%" },
    ],
  },
];
