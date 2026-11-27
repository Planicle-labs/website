/**
 * Content and data for /snug. Brand figures are garment chest (cm) of regular-fit
 * t-shirts from each brand's published size chart, checked Sep 2026, as held in
 * Snug's reference database. SAHAJ is a fictional sample store with a made-up chart.
 */
import { SITE_URL } from "./site";
import type { Chart } from "./snug_engine";

export { translate, type Chart, type Match, type Size } from "./snug_engine";

export const SNUG_URL = `${SITE_URL}/snug`;
export const SNUG_TITLE = "Snug: size recommendations for Shopify t-shirt brands";
export const SNUG_DESCRIPTION =
  "Snug tells your shoppers which size to take in your tees, from the brand and size they already wear. A size recommendation widget for Indian Shopify t-shirt and polo brands, built to cut size returns.";
export const SNUG_OG = { path: "/snug/og.png", width: 1200, height: 630, type: "image/png", alt: "Snug. Your size, translated." };

export const DATA_SOURCE = "Garment chest, regular-fit t-shirts, from each brand’s own size chart, checked Sep 2026.";

/** Reference brands shown in the demo (regular-fit tees, real figures). */
export const BRANDS: Chart[] = [
  {
    id: "bewakoof",
    name: "Bewakoof",
    sizes: [
      { size: "S", chest: 96.5 },
      { size: "M", chest: 101.6 },
      { size: "L", chest: 106.7 },
      { size: "XL", chest: 111.8 },
    ],
  },
  {
    id: "nobero",
    name: "Nobero",
    sizes: [
      { size: "S", chest: 96.5 },
      { size: "M", chest: 101.6 },
      { size: "L", chest: 106.7 },
      { size: "XL", chest: 111.8 },
    ],
  },
  {
    id: "bear-house",
    name: "The Bear House",
    sizes: [
      { size: "S", chest: 101.6 },
      { size: "M", chest: 108.0 },
      { size: "L", chest: 114.3 },
      { size: "XL", chest: 120.7 },
    ],
  },
];

/** Fictional sample store (made-up chart, regular fit). */
export const SAMPLE_STORE: Chart = {
  id: "sahaj",
  name: "SAHAJ",
  sizes: [
    { size: "S", chest: 99 },
    { size: "M", chest: 104 },
    { size: "L", chest: 109 },
    { size: "XL", chest: 114 },
    { size: "XXL", chest: 119 },
  ],
};

export const REFERENCE_BRANDS = ["Being Human", "Bewakoof", "Nobero", "Snitch", "The Bear House"];

export const PLANS = [
  { name: "Starter", price: "₹999", period: "per 30 days", allowance: 10000, allowanceLabel: "10,000", note: "recommendations" },
  { name: "Growth", price: "₹2,999", period: "per 30 days", allowance: 50000, allowanceLabel: "50,000", note: "recommendations" },
  { name: "Enterprise", price: "Custom", period: "per 30 days", allowance: 0, allowanceLabel: "50,000+", note: "recommendations" },
] as const;

export const FOUNDING = {
  open: 5,
  total: 5,
  gets: [
    "Your first month free",
    "We set Snug up for you",
    "A direct line to the two founders",
    "We add the brands your shoppers wear",
    "Featured as a founding brand",
  ],
  asks: [
    "Honest feedback",
    "Your size-related return numbers, before and after",
    "Permission to share the results, with your name",
  ],
};

export const FAQ = [
  {
    q: "Does the shopper need a measuring tape?",
    a: "No. They pick a brand they already own, the garment type and the size they wear in it. Snug does the measuring, using the garment charts.",
  },
  {
    q: "Which brands can shoppers pick from?",
    a: `Today: ${REFERENCE_BRANDS.slice(0, -1).join(", ")} and ${REFERENCE_BRANDS.at(-1)}, for t-shirts and polos. Founding brands can ask us to add the brands their shoppers wear.`,
  },
  {
    q: "How does Snug decide the size?",
    a: "It takes the chest of the tee the shopper owns, allows for its fit to estimate their body chest, then picks the closest size on your chart for your fit. Plain arithmetic on garment measurements: the same question always gets the same answer.",
  },
  {
    q: "What if a shopper is between two sizes?",
    a: "Snug says so. Every answer carries a confidence level and a short reason, and when a shopper sits between two sizes they choose between a snug and a relaxed fit.",
  },
  {
    q: "What do I need to set up?",
    a: "Inside your Shopify admin: pick the reference brands, map your products to a garment and fit, add your size charts (there is a CSV template) and switch the widget on. For the Founding Five, we do this with you.",
  },
  {
    q: "Will it match my theme?",
    a: "Yes. You can change the button text, colours and position, and how the dialog looks. The widget script is about 9.5 KB, and the dialog only loads when a shopper opens it.",
  },
  {
    q: "What counts as a recommendation?",
    a: "Each size answer a shopper gets. Starter includes 10,000 every 30 days and Growth 50,000. Above that, Enterprise is priced with you.",
  },
  {
    q: "Is there a free trial?",
    a: "No, with one exception: the Founding Five get their first month free. After that it is standard pricing, and you stay only if it is working.",
  },
];

export const snugJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SNUG_URL}#app`,
      name: "Snug",
      url: SNUG_URL,
      description: SNUG_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web (Shopify)",
      image: `${SITE_URL}${SNUG_OG.path}`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      creator: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Planicle Labs",
      url: SITE_URL,
    },
    {
      "@type": "WebPage",
      "@id": `${SNUG_URL}#webpage`,
      url: SNUG_URL,
      name: SNUG_TITLE,
      description: SNUG_DESCRIPTION,
      inLanguage: "en-IN",
      about: { "@id": `${SNUG_URL}#app` },
      isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Planicle Labs" },
    },
    {
      "@type": "FAQPage",
      "@id": `${SNUG_URL}#faq`,
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};
