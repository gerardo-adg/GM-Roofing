/**
 * Service pages. Each entry here becomes a page at /<slug>/ (see
 * src/pages/[service].astro), a card in the service grid, a menu + footer
 * link, an option in the estimate form and a schema.org Service node.
 *
 * Copy rules (enforced by scripts/check-copy.mjs on every build):
 * no em or en dashes, and no stock contractor phrases. Write it the way
 * you'd say it to a homeowner standing in their driveway.
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
  /** Other names people search for. Used in schema. */
  alternateNames: string[];
  audience: string;
  /** What the service covers. Shown in "At a glance" and schema. */
  includes?: string[];
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lede: string; cta: string };
  /** One-paragraph direct answer at the top of the page. Written for search snippets and AI answers. */
  answer: string;
  facts: { label: string; value: string }[];
  sections: ServiceSection[];
  faqs?: { q: string; a: string }[];
  sidebar: { title: string; text: string; cta: string };
  related: string[];
  showServiceGrid?: boolean;
};

const common = {
  area: { label: "Service area", value: "Sacramento and surrounding Sacramento Valley cities" },
  estimate: { label: "Estimates", value: "Free and in writing, after an on-site look" },
};

export const services: Service[] = [
  {
    slug: "roof-replacement-sacramento",
    name: "Roof Replacement",
    shortName: "Roof Replacement",
    blurb: "Tear-off and new roof systems",
    icon: "replacement",
    summary:
      "A full tear-off and new roof when repairs stop making sense. You get a written scope, materials and price before anything is scheduled.",
    alternateNames: ["Re-roofing", "Reroof", "New roof installation", "Roof tear-off and replacement"],
    audience: "Homeowners and property owners in the Sacramento Valley",
    includes: [
      "Tear-off and disposal of the old roof",
      "Decking inspection and repair",
      "New underlayment",
      "New flashing at walls, vents and valleys",
      "Asphalt shingle or tile roof installation",
      "Site cleanup and final walkthrough",
    ],
    seo: {
      title: "Roof Replacement Sacramento, CA | GM Roofing",
      description:
        "Roof replacement in Sacramento from a family-owned local roofer. Shingle and tile re-roofs with a free written estimate. Serving Elk Grove, Roseville, Folsom and nearby.",
    },
    hero: {
      eyebrow: "Roof replacement",
      title: "Roof replacement in <em>Sacramento.</em>",
      lede: "When patching no longer makes sense, we tear off the old roof, fix what's underneath and install a new one. You'll have the scope, materials and price in writing first.",
      cta: "Get a replacement estimate",
    },
    answer:
      "GM Roofing replaces asphalt shingle and tile roofs for homeowners in Sacramento and nearby Sacramento Valley cities. A replacement includes tear-off, decking repair where needed, new underlayment and flashing, the new roof and cleanup. Every job starts with an on-site inspection and a free written estimate.",
    facts: [
      common.area,
      { label: "Roof types", value: "Asphalt shingle, concrete tile, clay tile" },
      common.estimate,
      { label: "Starts with", value: "An in-person roof inspection" },
    ],
    sections: [
      {
        heading: "Signs it's time to replace, not repair",
        body: [
          "A replacement costs more than a repair, so we only recommend one when the roof has reached that point. These are the signs we look for:",
        ],
        list: [
          { text: "Repairs are coming more often and costing more each time" },
          { text: "Shingles are curling, cracking or missing across large areas" },
          { text: "The decking has soft spots or the roofline sags" },
          { text: "Storm or wind damage covers most of the roof, not one section" },
          { text: "New leaks keep showing up after earlier repairs" },
        ],
      },
      {
        heading: "What a roof replacement includes",
        body: [
          "We remove the existing roofing down to the deck and check the decking underneath. Damaged boards get replaced. Then new underlayment, new flashing and the new shingle or tile roof go on, followed by cleanup and a walkthrough with you.",
          "Your written estimate lists the scope, materials and cost before anything is scheduled, so you know exactly what you're paying for.",
        ],
      },
      {
        heading: "Why Sacramento roofs wear out",
        body: [
          "Long stretches of 100 degree summer days dry out shingles and bake the underlayment beneath tile. Winter storms then find every weak spot. That combination is why roof replacement is one of the most common projects we do in Sacramento, Elk Grove, Roseville and the surrounding area.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a roof replacement cost in Sacramento?",
        a: "It depends on the size and pitch of the roof, the material you choose, how many layers come off, how much decking needs replacing and permit requirements. We don't quote from the street or over the phone. We inspect the roof and give you a free written estimate with the full scope and price.",
      },
      {
        q: "How long does a roof replacement take?",
        a: "Many single-family shingle replacements take a few days on site. Tile roofs, larger homes, decking repairs and weather can add time. Your estimate includes a timeline for your specific roof.",
      },
      {
        q: "Do I need a permit to replace my roof in Sacramento?",
        a: "In California, reroofing generally requires a building permit from your city or county, and the work is inspected. We'll go over what applies to your property when we walk you through the estimate.",
      },
      {
        q: "Does a new roof in Sacramento have to be a cool roof?",
        a: "California's Title 24 energy code can require cool roof rated materials when a roof is replaced in the Sacramento area, depending on the building and the scope of work. We'll confirm what applies to your home and show you compliant options.",
      },
      {
        q: "Do I need to be home during the replacement?",
        a: "Usually not. We'll coordinate the schedule with you and keep you posted as the work moves along.",
      },
      {
        q: "Will you haul away the old roof?",
        a: "Yes. Tear-off and disposal are part of every replacement, and we clean up the site when the work is done.",
      },
    ],
    sidebar: {
      title: "Get a roof replacement estimate",
      text: "Free, in writing, and no obligation.",
      cta: "Request a free estimate",
    },
    related: ["roof-repair-sacramento", "roof-inspections-sacramento", "tile-roofing-sacramento"],
  },
  {
    slug: "roof-repair-sacramento",
    name: "Roof Repair",
    shortName: "Roof Repair",
    blurb: "Leaks, storm damage and flashing",
    icon: "repair",
    summary:
      "Leak repair, storm damage and targeted fixes for shingle, tile and flashing problems, caught before they turn into a replacement.",
    alternateNames: ["Roof leak repair", "Storm damage roof repair", "Shingle repair", "Flashing repair", "Emergency roof repair"],
    audience: "Homeowners and businesses in the Sacramento Valley",
    includes: [
      "Roof leak tracing and repair",
      "Missing or damaged shingle replacement",
      "Cracked or slipped tile repair",
      "Flashing repair at chimneys, vents and skylights",
      "Storm and wind damage repair",
    ],
    seo: {
      title: "Roof Repair Sacramento, CA | Leaks & Storm Damage | GM Roofing",
      description:
        "Roof repair in Sacramento for leaks, storm damage, missing shingles, cracked tile and failed flashing. Family-owned, free written estimates. Call or request an inspection.",
    },
    hero: {
      eyebrow: "Roof repair",
      title: "Roof repair in <em>Sacramento.</em>",
      lede: "Leaks, storm damage and failed flashing, fixed before the water reaches your decking, insulation and ceilings.",
      cta: "Schedule a roof inspection",
    },
    answer:
      "GM Roofing repairs roof leaks, storm and wind damage, missing shingles, cracked or slipped tile and failed flashing for homes and businesses in Sacramento and the surrounding Sacramento Valley. We find the source on site, explain the fix and give you a written estimate before any work starts.",
    facts: [
      common.area,
      { label: "Common repairs", value: "Leaks, storm damage, shingles, tile, flashing" },
      common.estimate,
      { label: "Roof types", value: "Asphalt shingle, concrete tile, clay tile" },
    ],
    sections: [
      {
        heading: "Roof problems we fix",
        list: [
          { title: "Roof leaks", text: "Water stains, drips or damp spots in the attic or on a ceiling." },
          { title: "Missing or damaged shingles", text: "Lost to age, wind or falling branches." },
          { title: "Storm damage", text: "Wind and heavy rain damage after a Sacramento Valley storm." },
          { title: "Flashing failures", text: "Seals that have let go around chimneys, vents and skylights." },
          { title: "Cracked or slipped tile", text: "Broken tiles that expose the underlayment below." },
          { title: "Aging roofs", text: "Small problems that keep coming back as the roof gets older." },
        ],
      },
      {
        heading: "How we handle a repair",
        body: [
          "We go up and look at the actual problem instead of guessing from a photo. Leaks often travel before they show up inside, so we trace the water back to where it's getting in.",
          "Then we explain what needs fixing and put it in writing before we start. If the roof is near the end of its life and a repair would only buy a few months, we'll tell you that too.",
        ],
      },
      {
        heading: "Small leaks get expensive",
        body: [
          "A contained leak is usually a straightforward fix. Left alone, the water soaks into decking, insulation and drywall, and a small repair becomes a much bigger project. If you've noticed a ceiling stain or a shingle out of place after a storm, have it looked at.",
        ],
      },
    ],
    faqs: [
      {
        q: "How fast can you get out to a roof leak?",
        a: "Tell us what you're seeing and we'll get you on the schedule as quickly as we can. If water is coming in, mention it when you call or fill out the form so we know it's urgent.",
      },
      {
        q: "Should I repair or replace my roof?",
        a: "Repair usually makes sense when the damage is limited to one area and the rest of the roof is in good shape. Replacement starts to make sense when repairs are frequent, the damage is widespread or the decking is failing. We'll show you what we find and give you our recommendation in writing.",
      },
      {
        q: "How much does roof repair cost in Sacramento?",
        a: "It depends on what's damaged, how much and the roofing material. We look at the roof first and give you a free written estimate before doing any work.",
      },
      {
        q: "Do you repair tile roofs?",
        a: "Yes. We replace cracked and slipped concrete and clay tiles, and we can replace the underlayment beneath existing tile when that's where the leak is coming from.",
      },
      {
        q: "What if the repair uncovers a bigger problem?",
        a: "We stop, show you what we found and explain your options before doing anything extra. You decide how to proceed.",
      },
    ],
    sidebar: {
      title: "Schedule a roof inspection",
      text: "We'll find the problem and tell you what it takes to fix it.",
      cta: "Request an inspection",
    },
    related: ["roof-replacement-sacramento", "roof-inspections-sacramento", "tile-roofing-sacramento"],
  },
  {
    slug: "tile-roofing-sacramento",
    name: "Tile Roofing",
    shortName: "Tile Roofing",
    blurb: "Concrete and clay tile roofs",
    icon: "tile",
    summary:
      "Installation, repair and underlayment replacement for concrete and clay tile roofs, common on older and custom homes across the valley.",
    alternateNames: ["Tile roof repair", "Tile roof installation", "Concrete tile roofing", "Clay tile roofing", "Tile roof underlayment replacement"],
    audience: "Homeowners with tile roofs in the Sacramento Valley",
    includes: [
      "Cracked, slipped and missing tile repair",
      "Underlayment replacement under existing tile",
      "Flashing repair at vents, chimneys and valleys",
      "New tile roof installation",
    ],
    seo: {
      title: "Tile Roofing Sacramento, CA | Tile Roof Repair | GM Roofing",
      description:
        "Concrete and clay tile roof repair, underlayment replacement and installation in Sacramento. Family-owned roofer with free written estimates.",
    },
    hero: {
      eyebrow: "Tile roofing",
      title: "Tile roof repair and installation in <em>Sacramento.</em>",
      lede: "Concrete and clay tile roofs last a long time, but the layer underneath doesn't. We repair tile, replace underlayment and install new tile roofs.",
      cta: "Request a free estimate",
    },
    answer:
      "GM Roofing repairs and installs concrete and clay tile roofs in Sacramento and the Sacramento Valley. Common tile work includes replacing cracked or slipped tiles, replacing the underlayment beneath existing tile, repairing flashing and installing new tile roofs.",
    facts: [
      common.area,
      { label: "Tile types", value: "Concrete and clay" },
      common.estimate,
      { label: "Common work", value: "Tile repair, underlayment replacement, new installs" },
    ],
    sections: [
      {
        heading: "Tile roof services",
        body: [
          "The tiles themselves often outlast everything else on the roof. Individual tiles crack or slip, the underlayment beneath them ages on its own schedule, and flashing around penetrations can fail long before the tile does. We handle:",
        ],
        list: [
          { text: "Cracked, slipped or missing tile repair" },
          { text: "Underlayment replacement beneath existing tile" },
          { text: "Flashing repair around vents, chimneys and valleys" },
          { text: "New tile roof installation" },
        ],
      },
      {
        heading: "Tile takes a different technique",
        body: [
          "Walking a tile roof the wrong way cracks tiles that were fine. We work tile roofs with that in mind, so fixing one problem doesn't create three new ones.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you reuse my existing tiles?",
        a: "Often, yes. When the tiles are in good shape and the problem is the underlayment, we can lift the tile, replace the underlayment and reset the original tile. We'll tell you after the inspection whether that's an option for your roof.",
      },
      {
        q: "Why is my tile roof leaking if the tiles look fine?",
        a: "Tile sheds most of the water, but the underlayment underneath is what keeps it out of the house. After years of Sacramento heat, that layer can dry out and crack even when the tile on top looks perfect.",
      },
    ],
    sidebar: {
      title: "Get a tile roofing estimate",
      text: "Repair, underlayment or a new tile roof. Tell us what you're dealing with.",
      cta: "Request a free estimate",
    },
    related: ["roof-repair-sacramento", "roof-replacement-sacramento", "roof-inspections-sacramento"],
  },
  {
    slug: "roof-inspections-sacramento",
    name: "Roof Inspections",
    shortName: "Inspections",
    blurb: "On-site roof evaluations",
    icon: "inspection",
    summary:
      "An in-person look at your roof's condition with written findings, before you're asked to decide anything.",
    alternateNames: ["Roof inspection", "Roof condition assessment", "Roof evaluation", "Pre-sale roof inspection"],
    audience: "Homeowners, buyers, sellers and property owners in the Sacramento Valley",
    includes: ["Roofing material condition", "Flashing check", "Visible decking check", "Chimneys, vents and valleys", "Written summary of findings"],
    seo: {
      title: "Roof Inspection Sacramento, CA | GM Roofing",
      description:
        "Roof inspections in Sacramento with written findings. Before buying or selling, after a storm or when you see a leak. Family-owned, local and no pressure.",
    },
    hero: {
      eyebrow: "Roof inspections",
      title: "Roof inspections in <em>Sacramento.</em>",
      lede: "An in-person look at your roof's actual condition. The right first step whether you've spotted a leak, you're buying a home or you just want to know where things stand.",
      cta: "Schedule an inspection",
    },
    answer:
      "A GM Roofing inspection is an in-person check of your roofing material, flashing, visible decking and common trouble spots like chimneys, vents and valleys. You get a written summary of what we found and, if work is needed, a free written estimate.",
    facts: [
      common.area,
      { label: "Typical length", value: "Under an hour for most homes" },
      { label: "You receive", value: "Written findings, plus an estimate if work is needed" },
      { label: "Good for", value: "Leaks, storms, buying or selling, aging roofs" },
    ],
    sections: [
      {
        heading: "What we check",
        body: [
          "We walk the roof and check the roofing material, flashing and visible decking, plus the usual trouble spots: chimneys, vents, skylights and valleys. You'll get a straight answer on what we find, whether that's “you're fine for now,” a repair or a conversation about replacement.",
        ],
      },
      {
        heading: "When to get a roof inspected",
        list: [
          { text: "Before buying or selling a home" },
          { text: "After a major storm" },
          { text: "When you notice a leak or water stain" },
          { text: "As routine maintenance on an older roof" },
          { text: "Before choosing between a repair and a replacement" },
        ],
      },
      {
        heading: "Information, not a sales pitch",
        body: [
          "If your roof checks out, we'll say so. If it needs work, we'll explain what and why, and the decision on whether and when to move forward is yours.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the roof inspection free?",
        a: "Estimates for roofing work are always free. Reach out and we'll confirm the details for your request.",
      },
      {
        q: "How long does a roof inspection take?",
        a: "Most take under an hour, depending on the size of the roof and how easy it is to access.",
      },
      {
        q: "Will I get the results in writing?",
        a: "Yes. You'll get a written summary of what we found and, if work is recommended, a written estimate.",
      },
      {
        q: "Should I get a roof inspection before buying a house in Sacramento?",
        a: "It's a good idea, especially on older homes. A general home inspector usually looks at the roof from the ground or a ladder. A roofer walks it and can tell you how much life it has left and what any needed work would cost.",
      },
    ],
    sidebar: {
      title: "Request an inspection",
      text: "Find out where your roof actually stands.",
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
      "Replacement, repair, tile work and inspections for Sacramento Valley homes, handled by a local family-owned crew.",
    alternateNames: ["Home roofing", "Residential roofer", "House roof replacement", "House roof repair"],
    audience: "Homeowners in the Sacramento Valley",
    seo: {
      title: "Residential Roofing Sacramento, CA | GM Roofing",
      description:
        "Residential roofing in Sacramento: roof replacement, roof repair, tile roofing and inspections from a family-owned local roofer. Free written estimates.",
    },
    hero: {
      eyebrow: "Residential roofing",
      title: "Residential roofing in <em>Sacramento.</em>",
      lede: "Replacement, repair, tile work and inspections for homes across the Sacramento Valley, from a local family-owned roofer.",
      cta: "Request a free estimate",
    },
    answer:
      "GM Roofing is a family-owned residential roofer serving Sacramento, Elk Grove, Roseville, Folsom and nearby Sacramento Valley cities. We handle roof replacement, roof repair, tile roofing and roof inspections, and every project starts with a free written estimate.",
    facts: [
      common.area,
      { label: "Services", value: "Replacement, repair, tile, inspections" },
      common.estimate,
      { label: "Ownership", value: "Family-owned and local" },
    ],
    sections: [
      {
        heading: "Roofs built for this climate",
        body: [
          "Homes in Sacramento, Elk Grove, Roseville, Folsom and the rest of the valley deal with long, hot summers and occasional heavy winter storms. That wears on shingle and tile roofs differently than milder climates do.",
          "We work on roofs in this region every week, so our recommendations come from how roofs actually hold up here.",
        ],
      },
    ],
    sidebar: {
      title: "Get a free estimate",
      text: "Wherever your roof is in its life, it starts with a look and a clear explanation of your options.",
      cta: "Request a free estimate",
    },
    related: ["roof-replacement-sacramento", "roof-repair-sacramento", "tile-roofing-sacramento"],
    showServiceGrid: true,
  },
  {
    slug: "commercial-roofing-sacramento",
    name: "Commercial Roofing",
    shortName: "Commercial",
    blurb: "For businesses and property owners",
    icon: "commercial",
    summary:
      "Roof repair, replacement and inspections for businesses and property owners, scheduled around how your operation runs.",
    alternateNames: ["Commercial roofer", "Commercial roof repair", "Commercial roof replacement", "Commercial re-roofing"],
    audience: "Businesses and commercial property owners in the Sacramento Valley",
    includes: ["Commercial roof repair and leak resolution", "Commercial roof replacement", "Roof inspections and condition assessments"],
    seo: {
      title: "Commercial Roofing Sacramento, CA | GM Roofing",
      description:
        "Commercial roof repair, replacement and inspections in Sacramento, scheduled around your business. Written scope and estimate before work begins.",
    },
    hero: {
      eyebrow: "Commercial roofing",
      title: "Commercial roofing in <em>Sacramento.</em>",
      lede: "Repairs, replacements and inspections for businesses and property owners, scheduled around how your operation runs.",
      cta: "Request a commercial estimate",
    },
    answer:
      "GM Roofing provides commercial roof repair, replacement and inspections for businesses and property owners in Sacramento and the Sacramento Valley. Every commercial project starts with an on-site evaluation and a written scope and estimate.",
    facts: [
      common.area,
      { label: "Services", value: "Repair, replacement, inspections" },
      common.estimate,
      { label: "Scheduling", value: "Planned around your hours and tenants" },
    ],
    sections: [
      {
        heading: "Commercial roofing services",
        body: [
          "Commercial work has its own priorities: keeping disruption low, working around business or tenant hours and giving the owner a clear scope before committing. We work with businesses and property owners on:",
        ],
        list: [
          { text: "Roof repair and leak resolution" },
          { text: "Roof replacement and re-roofing" },
          { text: "Inspections and condition assessments" },
          { text: "Ongoing maintenance planning for owners with multiple properties" },
        ],
      },
      {
        heading: "Scope in writing before anything is scheduled",
        body: [
          "Every commercial project starts with an on-site evaluation and a written estimate, so you know the scope and cost before work goes on the calendar.",
        ],
      },
    ],
    sidebar: {
      title: "Talk to us about your property",
      text: "Tell us about the building and what you're seeing.",
      cta: "Request an estimate",
    },
    related: ["roof-repair-sacramento", "roof-replacement-sacramento", "roof-inspections-sacramento"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
