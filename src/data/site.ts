export const SITE_URL = "https://www.planicle.com";
export const SITE_NAME = "Planicle Labs";
export const TITLE = "Planicle Labs — Software Studio for Startups";
export const DESCRIPTION =
  "We build premium websites, apps, and AI workflows for high-growth Seed to Series B startups. Precision engineering, absolute execution, no hand-holding.";
export const KEYWORDS = [
  "software studio",
  "software studio for startups",
  "startup development",
  "mvp builders",
  "web application development",
  "ai workflows",
  "delhi developers",
  "software agency india",
];
export const OG_IMAGE = { path: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: TITLE };

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
      description: DESCRIPTION,
      address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressRegion: "DL", addressCountry: "IN" },
      areaServed: { "@type": "Country", name: "India" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@planicle.com",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "AI workflows",
        "Large language models",
        "MVP development",
        "Web application development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-product-systems`,
      serviceType: "Product Systems",
      name: "Product Systems",
      description: "Bespoke web applications, high-performance APIs, and custom database architecture built with zero tech debt.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      category: "Software Development",
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-ai-workflows`,
      serviceType: "AI Workflow Engineering",
      name: "AI Workflow Engineering",
      description: "Custom LLM integrations, semantic search pipelines, and autonomous agent systems that automate operational drag.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      category: "AI & Automation",
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-growth-infrastructure`,
      serviceType: "Growth Infrastructure",
      name: "Growth Infrastructure",
      description: "High-conversion landing pages, custom analytics pipelines, and speed-optimized onboarding flows engineered to convert.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      category: "Growth Engineering",
    },
  ],
};
