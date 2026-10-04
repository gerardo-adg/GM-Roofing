/**
 * Service pages. Each entry here becomes a page at /<slug>/ (see
 * src/pages/[service].astro), a card in the service grid, a footer link,
 * an option in the estimate form and a schema.org Service entry.
 *
 * To add a service: add an object below. That's it.
 */

export type IconName = "replacement" | "repair" | "tile" | "inspection" | "residential" | "commercial";

export type ServiceSection = {
  heading: string;
  body?: string[];
  list?: { title?: string; text: string }[];
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  /** Few words for menus. */
  blurb: string;
  icon: IconName;
  summary: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lede: string; cta: string };
  sections: ServiceSection[];
  faqs?: { q: string; a: string }[];
  sidebar: { title: string; text: string; cta: string };
  related: string[];
  showServiceGrid?: boolean;
};

export const services: Service[] = [
  {
    slug: "roof-replacement-sacramento",
    name: "Roof Replacement",
    shortName: "Roof Replacement",
    blurb: "Full tear-off & new roof systems",
    icon: "replacement",
    summary:
      "A full tear-off and new roof system when repairs no longer make sense — installed with clear communication from estimate to final walkthrough.",
    seo: {
      title: "Roof Replacement Sacramento, CA | GM Roofing",
      description:
        "Sacramento roof replacement from a family-owned local contractor. Free written estimates, honest recommendations, and quality workmanship. Get started today.",
    },
    hero: {
      eyebrow: "Roof Replacement",
      title: "Sacramento roof replacement",
      lede: "A full roof replacement, done with clear communication from the first inspection to the final walkthrough — for homeowners across the Sacramento Valley.",
      cta: "Get a replacement estimate",
    },
    sections: [
      {
        heading: "When a roof needs to be replaced, not repaired",
        body: [
          "Roof replacement is a bigger investment than a repair, so we only recommend it when it's genuinely the right call. Common signs include:",
        ],
        list: [
          { text: "The roof is old enough that repairs are becoming frequent and costly" },
          { text: "Shingles are curling, cracking, or missing across large sections" },
          { text: "Decking underneath shows soft spots or visible sagging" },
          { text: "Storm or wind damage covers most of the roof rather than one area" },
          { text: "Leaks keep showing up in new spots after previous repairs" },
        ],
      },
      {
        heading: "What's included in a roof replacement",
        body: [
          "A full replacement typically involves a tear-off of the existing roofing material, an inspection and repair of the decking underneath, new underlayment, flashing, and the new roof covering — whether that's shingle or tile — followed by a final cleanup and walkthrough.",
          "Before anything starts, you'll get a written estimate that spells out the scope of work, materials, and cost, so there's no ambiguity about what you're paying for.",
        ],
      },
      {
        heading: "Roof replacement across the Sacramento Valley",
        body: [
          "Sacramento Valley roofs take a beating from long, hot summers and periodic heavy winter storms. That combination shortens the life of shingle roofs in particular, which is why roof replacement is one of the most common projects we handle for homeowners in Sacramento, Elk Grove, Roseville, and the surrounding area.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a roof replacement take?",
        a: "Timelines vary with roof size, material, and weather, and we'll give you a specific estimate for your project before work begins.",
      },
      {
        q: "Do I need to be home during the replacement?",
        a: "Not typically, though we'll coordinate with you on scheduling and keep you updated as the work progresses.",
      },
      {
        q: "Will you handle the old roofing material?",
        a: "Yes — tear-off and disposal of the old roofing material is part of a full replacement, and the job site is cleaned up when the work is done.",
      },
    ],
    sidebar: {
      title: "Request a roof replacement estimate",
      text: "A free, written estimate — no pressure, no obligation.",
      cta: "Request a free estimate",
    },
    related: ["roof-repair-sacramento", "roof-inspections-sacramento", "tile-roofing-sacramento"],
  },
  {
    slug: "roof-repair-sacramento",
    name: "Roof Repair",
    shortName: "Roof Repair",
    blurb: "Leaks, storm damage & flashing",
    icon: "repair",
    summary:
      "Leak repair, storm damage, and targeted fixes for shingle, tile, and flashing problems before they turn into a full replacement.",
    seo: {
      title: "Roof Repair Sacramento, CA | GM Roofing",
      description:
        "Sacramento roof repair for leaks, storm damage, and flashing issues. Family-owned, honest estimates, and quality workmanship. Schedule an inspection today.",
    },
    hero: {
      eyebrow: "Roof Repair",
      title: "Sacramento roof repair",
      lede: "Leaks, storm damage, and flashing problems handled before they turn into something bigger — for homes and businesses across the Sacramento Valley.",
      cta: "Schedule a roof inspection",
    },
    sections: [
      {
        heading: "Common roof repair issues we handle",
        list: [
          { title: "Roof leaks", text: "Water stains, drips, or damp spots in the attic or ceiling." },
          { title: "Missing or damaged shingles", text: "From age, wind, or debris." },
          { title: "Storm damage", text: "Wind and heavy rain damage after a Sacramento Valley storm." },
          { title: "Flashing problems", text: "Failed seals around chimneys, vents, and skylights." },
          { title: "Aging roofs", text: "General wear that's starting to show as recurring small issues." },
        ],
      },
      {
        heading: "How we approach a repair",
        body: [
          "We start with an on-site look at the actual problem rather than guessing from a photo or a description over the phone. Once we know what's going on, we'll explain the repair that's needed and give you a written estimate before doing any work. If the roof is closer to the end of its life and repair isn't the right long-term move, we'll tell you that too, plainly.",
        ],
      },
      {
        heading: "Don't wait on a small leak",
        body: [
          "A small, contained leak is usually a straightforward repair. Left alone, water finds its way into decking, insulation, and drywall, turning a simple fix into a much larger project. If you've noticed a stain on a ceiling or a shingle out of place after a storm, it's worth having it looked at.",
        ],
      },
    ],
    faqs: [
      {
        q: "How fast can you get to a leak?",
        a: "Reach out with what you're seeing and we'll work with you to get a time on the calendar as quickly as we can.",
      },
      {
        q: "Will a repair void my roof's remaining life?",
        a: "No — a properly done repair is meant to extend the useful life of the roof, not shorten it.",
      },
      {
        q: "What if the repair reveals a bigger problem?",
        a: "We'll show you what we find and explain the options before doing any additional work — you decide how to proceed.",
      },
    ],
    sidebar: {
      title: "Schedule a roof inspection",
      text: "We'll take a look and tell you honestly what your roof needs.",
      cta: "Request an inspection",
    },
    related: ["roof-replacement-sacramento", "roof-inspections-sacramento", "tile-roofing-sacramento"],
  },
  {
    slug: "tile-roofing-sacramento",
    name: "Tile Roofing",
    shortName: "Tile Roofing",
    blurb: "Concrete & clay tile roofs",
    icon: "tile",
    summary:
      "Installation, repair, and restoration for concrete and clay tile roofs — a common roof type across older and custom Sacramento Valley homes.",
    seo: {
      title: "Tile Roofing Sacramento, CA | GM Roofing",
      description:
        "Tile roof installation, repair, and restoration in Sacramento. GM Roofing works concrete and clay tile roofs across the Sacramento Valley.",
    },
    hero: {
      eyebrow: "Tile Roofing",
      title: "Sacramento tile roofing",
      lede: "Installation, repair, and restoration for concrete and clay tile roofs, common across older and custom homes throughout the Sacramento Valley.",
      cta: "Request a free estimate",
    },
    sections: [
      {
        heading: "Tile roofing services",
        body: [
          "Tile roofs are durable but not maintenance-free — individual tiles crack or slip, the underlayment beneath them ages separately from the tile itself, and flashing around penetrations can fail well before the tile does. We handle:",
        ],
        list: [
          { text: "Cracked, slipped, or missing tile repair" },
          { text: "Underlayment replacement beneath existing tile" },
          { text: "Flashing repair around vents, chimneys, and valleys" },
          { text: "Full tile roof installation and restoration" },
        ],
      },
      {
        heading: "Why tile roofs need a specific approach",
        body: [
          "Walking and repairing a tile roof takes a different technique than a shingle roof — done carelessly, it's easy to crack tiles that were otherwise fine. We approach tile work with that in mind, so a repair doesn't create new problems on the way out.",
        ],
      },
    ],
    sidebar: {
      title: "Get a tile roofing estimate",
      text: "Repair, restoration, or full installation — tell us what you're dealing with.",
      cta: "Request a free estimate",
    },
    related: ["roof-repair-sacramento", "roof-replacement-sacramento", "roof-inspections-sacramento"],
  },
  {
    slug: "roof-inspections-sacramento",
    name: "Roof Inspections",
    shortName: "Inspections",
    blurb: "Honest on-site evaluations",
    icon: "inspection",
    summary:
      "A straightforward, on-site evaluation of your roof's condition, with honest findings before you're asked to make any decision.",
    seo: {
      title: "Roof Inspections Sacramento, CA | GM Roofing",
      description:
        "Professional roof inspections in Sacramento. A straightforward, honest evaluation of your roof's condition before you're asked to make any decision.",
    },
    hero: {
      eyebrow: "Roof Inspections",
      title: "Sacramento roof inspections",
      lede: "A clear, on-site look at your roof's actual condition — the right first step whether you're seeing a leak, planning ahead, or just want peace of mind.",
      cta: "Schedule an inspection",
    },
    sections: [
      {
        heading: "What a roof inspection covers",
        body: [
          "We walk the roof in person and check the condition of the roofing material, flashing, and visible decking, along with common trouble spots like chimneys, vents, and valleys. You'll get an honest read on what we find — whether that's “you're fine for now,” a repair recommendation, or a conversation about replacement.",
        ],
      },
      {
        heading: "When to get a roof inspected",
        list: [
          { text: "Before buying or selling a home" },
          { text: "After a significant storm" },
          { text: "If you've noticed a leak or water stain" },
          { text: "As routine maintenance for an aging roof" },
          { text: "Before deciding between a repair and a replacement" },
        ],
      },
      {
        heading: "No pressure, just information",
        body: [
          "An inspection isn't a sales pitch. If your roof checks out, we'll say so. If it needs work, we'll explain what and why, and you can decide how — or whether — to move forward.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the inspection free?",
        a: "Estimates for roofing work are always free. Reach out and we'll confirm the details for your specific request.",
      },
      {
        q: "How long does an inspection take?",
        a: "Most inspections take under an hour, depending on the size and accessibility of the roof.",
      },
      {
        q: "Will I get something in writing?",
        a: "Yes — you'll receive a written summary of what was found and, if work is recommended, a written estimate.",
      },
    ],
    sidebar: {
      title: "Request an inspection",
      text: "Get a straightforward read on your roof's condition.",
      cta: "Schedule a roof inspection",
    },
    related: ["roof-replacement-sacramento", "roof-repair-sacramento"],
  },
  {
    slug: "residential-roofing-sacramento",
    name: "Residential Roofing",
    shortName: "Residential",
    blurb: "Roofing for valley homes",
    icon: "residential",
    summary:
      "Roofing for Sacramento Valley homes — replacement, repair, and maintenance handled by a team that treats your property like it matters.",
    seo: {
      title: "Residential Roofing Sacramento, CA | GM Roofing",
      description:
        "Residential roofing for Sacramento Valley homes — replacement, repair, tile roofing, and inspections from a family-owned local contractor.",
    },
    hero: {
      eyebrow: "Residential Roofing",
      title: "Residential roofing in Sacramento",
      lede: "Roofing for Sacramento Valley homes, handled by a team that treats your property the way they'd want their own treated.",
      cta: "Request a free estimate",
    },
    sections: [
      {
        heading: "Built for the Sacramento Valley climate",
        body: [
          "Homes across Sacramento, Elk Grove, Roseville, Folsom, and the surrounding valley face long, intense summer heat and occasional heavy winter storms — a combination that wears differently on shingle and tile roofs than milder climates.",
          "We work residential roofs across this region regularly, which means the recommendations you get are based on how roofs actually hold up here, not generic advice.",
        ],
      },
    ],
    sidebar: {
      title: "Get a free estimate",
      text: "Whatever stage your home's roof is at, it starts with an honest look and a clear explanation of the options.",
      cta: "Request a free estimate",
    },
    related: ["roof-replacement-sacramento", "roof-repair-sacramento", "tile-roofing-sacramento"],
    showServiceGrid: true,
  },
  {
    slug: "commercial-roofing-sacramento",
    name: "Commercial Roofing",
    shortName: "Commercial",
    blurb: "For businesses & property owners",
    icon: "commercial",
    summary:
      "Roofing for businesses and property owners across the Sacramento Valley, scheduled around how your operation actually runs.",
    seo: {
      title: "Commercial Roofing Sacramento, CA | GM Roofing",
      description:
        "Commercial roofing for Sacramento Valley businesses and property owners. Roof repair, replacement, and inspections scheduled around your operation.",
    },
    hero: {
      eyebrow: "Commercial Roofing",
      title: "Sacramento commercial roofing",
      lede: "Roofing for businesses and property owners across the Sacramento Valley, scheduled around how your operation actually runs.",
      cta: "Request a commercial estimate",
    },
    sections: [
      {
        heading: "Commercial roofing services",
        body: [
          "Commercial roofing comes with its own set of priorities: minimizing disruption, working around tenant or business hours, and giving a property owner a clear scope before committing to a project. We work with businesses and property owners on:",
        ],
        list: [
          { text: "Roof repair and leak resolution" },
          { text: "Roof replacement and re-roofing" },
          { text: "Roof inspections and condition assessments" },
          { text: "Ongoing maintenance conversations for multi-property owners" },
        ],
      },
      {
        heading: "A clear scope before anything is scheduled",
        body: [
          "Every commercial project starts with an on-site evaluation and a written estimate, so you know the scope and cost before work is scheduled.",
        ],
      },
    ],
    sidebar: {
      title: "Talk to us about your property",
      text: "Tell us about the property and what you're seeing.",
      cta: "Request an estimate",
    },
    related: ["roof-repair-sacramento", "roof-replacement-sacramento", "roof-inspections-sacramento"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
