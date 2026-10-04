/**
 * Project clips for the homepage "Recent work" section, hosted on Mux.
 * Each tile shows a still pulled from the clip and plays the clip silently
 * while it's on screen. The section stays hidden until a project is added.
 *
 * Example:
 * {
 *   playbackId: "abc123…",
 *   title: "Concrete tile re-roof",
 *   location: "Elk Grove",
 *   alt: "New concrete tile roof on a two-story home in Elk Grove",
 *   posterTime: 3,
 * }
 */
export type Project = {
  playbackId: string;
  title: string;
  location?: string;
  alt: string;
  posterTime?: number;
};

export const projects: Project[] = [];
