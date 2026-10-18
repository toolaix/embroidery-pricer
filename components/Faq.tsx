import { site } from "@/site.config";

const items = [
  {
    q: "What is an embroidery pricing calculator?",
    a: "A tool that turns stitch count, blanks, labor, and shop overhead into a suggested price per piece so you stop guessing on quotes.",
  },
  {
    q: "Does it support DTF as well?",
    a: "Yes. Switch to DTF to price film, press time, blanks, and margin the same way.",
  },
  {
    q: "Is StitchQuote free?",
    a: `${site.monetization.freeQuotaLabel}. Premium (${site.monetization.premiumPriceLabel}) remembers your real shop costs.`,
  },
  {
    q: "Are these numbers guaranteed profit?",
    a: "No. Results are estimates. Costs vary by machine, speed, waste, and local wages — edit the inputs to match your shop.",
  },
];

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>FAQ</h2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {items.map((i) => (
        <div key={i.q} style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1rem" }}>{i.q}</h3>
          <p style={{ color: "#444" }}>{i.a}</p>
        </div>
      ))}
    </section>
  );
}
