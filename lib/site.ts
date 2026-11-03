/**
 * Business details, from the client's website questionnaire.
 *
 * Everything that appears in the header, footer, contact page and structured
 * data reads from here, so a new phone number or a confirmed address is a
 * one-line change.
 */
export const SITE = {
  name: "DRZ Emergency Response Training",
  legalName: "Emergency Response Training DRZ",
  shortName: "DRZ Training",
  tagline: "Be Ready. Act Fast. Save Lives.",
  /** Set NEXT_PUBLIC_SITE_URL in the host once the domain is bought. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.drztraining.com",
  phone: "(626) 786-3632",
  phoneHref: "tel:+16267863632",
  email: "drztraining026@gmail.com",
  /** The questionnaire gives hours but not days. */
  hours: "8:00 am – 5:00 pm",
  /** "To be determined" in the questionnaire. Shown nowhere until it is set. */
  address: null as null | { street: string; city: string; region: string; postalCode: string },
  serviceArea: "Los Angeles County and neighboring counties",
  /** Cities for the service-area list in the footer and on the group page. */
  cities: [
    "Los Angeles",
    "Pasadena",
    "Glendale",
    "Burbank",
    "Arcadia",
    "Alhambra",
    "El Monte",
    "West Covina",
    "Pomona",
    "Long Beach",
    "Torrance",
    "Santa Clarita",
  ],
  counties: ["Los Angeles", "Orange", "Ventura", "San Bernardino", "Riverside"],
  maxGroupPerDay: 18,
  payment: "Card, Zelle or check",
} as const;
