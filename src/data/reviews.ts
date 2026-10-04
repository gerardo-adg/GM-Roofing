/**
 * Real customer reviews (e.g. copied from Google). The reviews section on the
 * homepage only appears once at least one review is added here — no
 * fabricated quotes are ever shown.
 *
 * Example:
 * { quote: "They found the leak in an hour…", name: "Maria L.", location: "Elk Grove", source: "Google" }
 */
export type Review = { quote: string; name: string; location?: string; source?: string };

export const reviews: Review[] = [];
