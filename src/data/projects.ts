/**
 * Project photos for the homepage "Recent work" section.
 * Drop images in /public/images/projects/ and list them here.
 * The section stays hidden until at least one project is added.
 *
 * Example:
 * { src: "/images/projects/elk-grove-tile.jpg", alt: "Concrete tile re-roof in Elk Grove", title: "Tile re-roof", location: "Elk Grove" }
 */
export type Project = { src: string; alt: string; title: string; location?: string };

export const projects: Project[] = [];
