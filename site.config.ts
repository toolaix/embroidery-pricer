/**
 * Embroidery / DTF pricing — one-keyword SEO tool under toolaix.
 */
export const site = {
  name: "StitchQuote",
  primaryKeyword: "embroidery pricing calculator",
  tagline: "Price embroidery and DTF jobs from stitch count, materials, and shop time — in under 60 seconds.",
  domain: "embroidery-pricer.pages.dev",
  locale: "en-US",
  kind: "calculator" as const,
  monetization: {
    model: "freemium" as const,
    creemCheckoutUrl: "",
    freeQuotaLabel: "Unlimited free estimates",
    premiumPriceLabel: "$9.99 / mo — save your shop costs",
  },
  seo: {
    titleTemplate: "%s | StitchQuote",
    description:
      "Free embroidery and DTF pricing calculator. Estimate materials, labor, overhead, and what to charge before you quote the customer.",
    longTails: [
      "DTF pricing calculator",
      "how to price embroidery jobs",
      "embroidery cost per thousand stitches",
      "screen printing vs embroidery pricing",
      "embroidery shop overhead calculator",
    ],
  },
  analytics: {
    cloudflareBeaconToken: "",
  },
  gsc: {
    verificationMeta: "",
  },
} as const;
