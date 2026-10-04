/**
 * schema.org structured data, emitted as one linked @graph per page.
 *
 * Every node has a stable @id so Google and AI search tools can connect the
 * business, its services, its service area, each page and its FAQs as one
 * entity rather than separate fragments. Nothing here is invented:
 * contact fields only appear once they're filled in business.ts.
 */
import { business, hasPhone, hasEmail } from "../data/business";
import { services, type Service } from "../data/services";
import { hasClip, muxImage, muxStream, type MuxClip } from "../data/media";

const SITE = business.siteUrl.replace(/\/$/, "");
export const ids = {
  business: `${SITE}/#business`,
  website: `${SITE}/#website`,
  logo: `${SITE}/#logo`,
};

const wiki = (city: string) => `https://en.wikipedia.org/wiki/${city.replace(/ /g, "_")},_California`;

export const cityNodes = () =>
  business.cities.map((name) => ({
    "@type": "City",
    name,
    sameAs: wiki(name),
    containedInPlace: { "@type": "State", name: "California" },
  }));

export function businessNode() {
  const node: Record<string, unknown> = {
    "@type": "RoofingContractor",
    "@id": ids.business,
    name: business.name,
    legalName: business.legalName,
    url: `${SITE}/`,
    description: business.descriptionShort,
    logo: { "@type": "ImageObject", "@id": ids.logo, url: `${SITE}/logo.png`, width: 512, height: 512 },
    image: `${SITE}/og-default.jpg`,
    address: {
      "@type": "PostalAddress",
      ...(business.address.showOnSite && business.address.streetAddress
        ? { streetAddress: business.address.streetAddress }
        : {}),
      ...(business.address.postalCode ? { postalCode: business.address.postalCode } : {}),
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      addressCountry: "US",
    },
    areaServed: cityNodes(),
    knowsAbout: [
      "Roof replacement",
      "Re-roofing",
      "Roof repair",
      "Roof leak repair",
      "Storm damage roof repair",
      "Roof flashing repair",
      "Asphalt shingle roofing",
      "Concrete tile roofing",
      "Clay tile roofing",
      "Roof underlayment replacement",
      "Roof inspection",
      "Commercial roofing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Roofing services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": `${SITE}/${s.slug}/#service` },
      })),
    },
  };
  if (hasPhone) {
    node.telephone = business.phone.tel;
    node.contactPoint = {
      "@type": "ContactPoint",
      telephone: business.phone.tel,
      contactType: "customer service",
      areaServed: "US-CA",
      availableLanguage: "English",
    };
  }
  node.openingHoursSpecification = business.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
  node.slogan = business.tagline;
  if (hasEmail) node.email = business.email;
  if (business.license.number) {
    node.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: `California CSLB ${business.license.type}`,
      identifier: business.license.number,
      recognizedBy: { "@type": "GovernmentOrganization", name: "Contractors State License Board", url: "https://www.cslb.ca.gov" },
    };
  }
  const sameAs = Object.values(business.social).filter(Boolean);
  if (sameAs.length) node.sameAs = sameAs;
  return node;
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${SITE}/`,
    name: business.name,
    description: business.descriptionShort,
    publisher: { "@id": ids.business },
    inLanguage: "en-US",
  };
}

export type Crumb = { label: string; href: string };

export function webPageNode(opts: {
  path: string;
  title: string;
  description: string;
  type?: string;
  about?: string;
  hasBreadcrumb: boolean;
  primaryImage?: string;
}) {
  const url = SITE + opts.path;
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": ids.website },
    about: { "@id": opts.about ?? ids.business },
    ...(opts.hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    primaryImageOfPage: { "@type": "ImageObject", url: opts.primaryImage ?? `${SITE}/og-default.jpg` },
    inLanguage: "en-US",
    dateModified: new Date().toISOString().slice(0, 10),
  };
}

export function breadcrumbNode(path: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE}${path}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: SITE + c.href,
    })),
  };
}

export function serviceNode(s: Service) {
  const url = `${SITE}/${s.slug}/`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `${s.name} in ${business.primaryCity}, CA`,
    alternateName: s.alternateNames,
    serviceType: s.name,
    category: "Roofing",
    description: s.summary,
    url,
    provider: { "@id": ids.business },
    areaServed: cityNodes(),
    audience: { "@type": "Audience", audienceType: s.audience },
    ...(s.includes?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${s.name} services`,
            itemListElement: s.includes.map((name) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name },
            })),
          },
        }
      : {}),
  };
}

export function faqNode(path: string, faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE}${path}#faq`,
    isPartOf: { "@id": `${SITE}${path}#webpage` },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** VideoObject for a Mux clip. Skipped until the clip has an ID and an upload date. */
export function videoNode(path: string, clip: MuxClip, key: string) {
  if (!hasClip(clip) || !clip.uploadDate) return null;
  return {
    "@type": "VideoObject",
    "@id": `${SITE}${path}#video-${key}`,
    name: clip.title,
    description: clip.description,
    thumbnailUrl: [
      muxImage(clip.playbackId, { time: clip.posterTime, width: 1280, height: 720, format: "jpg" }),
      muxImage(clip.playbackId, { time: clip.posterTime, width: 1080, height: 1080, format: "jpg" }),
    ],
    uploadDate: clip.uploadDate,
    ...(clip.duration ? { duration: clip.duration } : {}),
    contentUrl: muxStream(clip.playbackId),
    embedUrl: `https://player.mux.com/${clip.playbackId}`,
    publisher: { "@id": ids.business },
    isPartOf: { "@id": `${SITE}${path}#webpage` },
  };
}
