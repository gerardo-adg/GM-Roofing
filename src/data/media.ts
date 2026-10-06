/**
 * Video + imagery hosted on Mux. Paste a playback ID to switch a slot on;
 * anything left blank falls back to the built-in design, so the site never
 * shows an empty placeholder. See MEDIA.md for the shot list and specs.
 *
 * Mux settings to use when uploading:
 *   - Video quality: "basic" or "premium" (required by the background video engine)
 *   - Playback policy: public
 *   - max_resolution_tier: "2160p" for the hero, "1080p" for everything else
 *
 * Stills are pulled from the videos through Mux's image API
 * (image.mux.com/<id>/thumbnail.webp?time=<seconds>), resized per device.
 */

export type MuxClip = {
  playbackId: string;
  /** Used in VideoObject schema and as accessible text. */
  title: string;
  description: string;
  /** ISO date the video was published, e.g. "2026-11-02". Required for video schema. */
  uploadDate: string;
  /** ISO 8601 duration, e.g. "PT0M12S". Optional. */
  duration?: string;
  /** Second of the video to use as the poster / still. */
  posterTime?: number;
  /**
   * The asset's Mux video quality. "plus" skips the lightweight background
   * engine (which can't play it) and goes straight to the HLS player.
   */
  quality?: "basic" | "premium" | "plus";
};

const clip = (title: string, description: string, posterTime = 1): MuxClip => ({
  playbackId: "",
  title,
  description,
  uploadDate: "",
  posterTime,
});

export const media = {
  /** Desktop hero loop, landscape 16:9 (silent, 8 to 15 seconds). */
  hero: {
    ...clip("Roof replacement in progress in Sacramento", "A GM Roofing crew installing a new roof on a Sacramento Valley home.", 1),
    playbackId: "k6A1v89YcuHM2hUtX2w9ggHnW7Jx2EOXw8Q00OqZy6WU",
    quality: "plus",
    uploadDate: "2026-10-05",
  },
  /** Phone hero loop. Falls back to `hero` when empty. */
  heroMobile: {
    ...clip("Roof replacement in progress in Sacramento", "GM Roofing working on a roof in the Sacramento Valley.", 1),
    // Testing a second cut. Previous version: yqA02fpfb1Kr4PWMLGPz9dzOjmXMMOaNQakw0084P78GE
    playbackId: "L58vXkHV36Tqu3AYrz02nhwFsusZqwhF01G00iwyj1k9sE",
    quality: "plus",
    uploadDate: "2026-10-05",
  },

  /** Featured project film with sound (60 to 120 seconds), played on click. */
  projectFilm: clip(
    "A Sacramento roof replacement, from inspection to final walkthrough",
    "Follow a GM Roofing roof replacement in the Sacramento Valley: inspection, tear-off, decking repair, underlayment, new roof and cleanup.",
    6
  ),

  /** About page: the owner telling his story on camera (60 to 120 seconds, with sound). */
  owner: clip(
    "Meet the owner of GM Roofing",
    "GM Roofing's owner on how he started roofing with his dad at nine years old and what he cares about on every job.",
    4
  ),

  /**
   * Homepage service showcase clips (the big panel that switches as you
   * hover or scroll the service list), keyed by service slug. If a service
   * has no showcase clip, its service page clip is used instead.
   */
  showcase: {
    "roof-replacement-sacramento": {
      ...clip("Roof replacement in Sacramento", "GM Roofing replacing a roof on a Sacramento Valley home.", 4),
      playbackId: "tBiWV8LWw4awPxj98100Cqpb1TfOm02IMQtPxJ00m01eELk",
      quality: "plus",
      uploadDate: "2026-10-05",
    },
    "tile-roofing-sacramento": {
      ...clip("Tile roofing in Sacramento", "GM Roofing working on a concrete tile roof in the Sacramento Valley.", 1),
      playbackId: "00fcoS8Z01YUBY02K6x6RnFKSE2FqFE00Z3l2aT02cGttu01Y",
      quality: "plus",
      uploadDate: "2026-10-06",
    },
    "roof-repair-sacramento": {
      ...clip("Roof repair in Sacramento", "GM Roofing repairing a roof in the Sacramento Valley.", 1),
      playbackId: "IPzJ00UkP8RUlfo9Rug31H86ZE7hXUtzVxrXORIqK8HA",
      quality: "plus",
      uploadDate: "2026-10-04",
    },
  } as Record<string, MuxClip>,

  /**
   * Homepage "Follow along on Instagram" section: three vertical (9:16)
   * reels with sound, plus an optional link to each post. The section stays
   * hidden until at least one has a playback ID.
   */
  instagram: [
    {
      ...clip("GM Roofing on Instagram", "A GM Roofing reel from @gmroofing_sac.", 1),
      playbackId: "du778zkSUZ5gbqBWpU2IAujwtGXuOl00027lMIw749XXo",
      quality: "plus",
      uploadDate: "2026-10-06",
      url: "",
    },
    {
      ...clip("GM Roofing on Instagram", "A GM Roofing reel from @gmroofing_sac.", 1),
      playbackId: "koWdotxrh1OzjgwPW71iyxBPCTui00H2gvlcIuAXst4I",
      quality: "plus",
      uploadDate: "2026-10-06",
      url: "",
    },
    { ...clip("GM Roofing on Instagram", "A GM Roofing reel from @gmroofing_sac.", 1), url: "" },
  ] as (MuxClip & { url?: string })[],

  /** Background loop for each service page hero, keyed by service slug. */
  services: {
    "roof-replacement-sacramento": clip("Roof replacement in Sacramento", "Tear-off and new roof installation on a Sacramento home."),
    "roof-repair-sacramento": clip("Roof repair in Sacramento", "Repairing flashing and damaged roofing on a Sacramento home."),
    "tile-roofing-sacramento": clip("Tile roofing in Sacramento", "Concrete tile roof work on a Sacramento Valley home."),
    "roof-inspections-sacramento": clip("Roof inspection in Sacramento", "A GM Roofing inspector checking a roof in the Sacramento Valley."),
    "roof-maintenance-sacramento": clip("Roof maintenance in Sacramento", "Resealing flashing and replacing damaged shingles during a maintenance visit."),
    "residential-roofing-sacramento": clip("Residential roofing in Sacramento", "Residential roofing work in the Sacramento Valley."),
    "commercial-roofing-sacramento": {
      ...clip("Commercial roofing in Sacramento", "GM Roofing on a commercial roofing project in the Sacramento Valley.", 1),
      playbackId: "ZrlfYgDtl006gMc1qNnrgA46xaSvJPPQ01ERS02KDYN9J4",
      quality: "plus",
      uploadDate: "2026-10-06",
    },
  } as Record<string, MuxClip>,
};

export const hasClip = (c?: MuxClip) => Boolean(c?.playbackId);

/** Clip for a service in the homepage showcase: its own showcase clip, else the service page clip. */
export const showcaseClip = (slug: string): MuxClip | undefined =>
  hasClip(media.showcase[slug]) ? media.showcase[slug] : media.services[slug];

export const muxStream = (id: string) => `https://stream.mux.com/${id}.m3u8`;
export const muxImage = (id: string, opts: { time?: number; width?: number; height?: number; format?: "webp" | "jpg" } = {}) => {
  const p = new URLSearchParams();
  if (opts.time !== undefined) p.set("time", String(opts.time));
  if (opts.width) p.set("width", String(opts.width));
  if (opts.height) {
    p.set("height", String(opts.height));
    p.set("fit_mode", "smartcrop");
  }
  return `https://image.mux.com/${id}/thumbnail.${opts.format ?? "webp"}?${p}`;
};
