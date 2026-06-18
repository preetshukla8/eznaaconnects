import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/SiteSections";

export const Route = createFileRoute("/services/company-setup")({
  head: () => ({
    meta: [
      { title: "Company Setup in UAE | Mainland, Freezone & Offshore — Eznaa Connects" },
      { name: "description", content: "Form your UAE company with confidence — Mainland (DED), 50+ Freezones (IFZA, Meydan, RAKEZ, DMCC, etc.) and Offshore. Trade license, MOA, banking and visas." },
      { property: "og:title", content: "UAE Company Setup — Eznaa Connects" },
      { property: "og:description", content: "Mainland, Freezone and Offshore formation done end-to-end — license, banking and visa." },
    ],
  }),
  component: () => (
    <ServicePageTemplate
      eyebrow="Company setup"
      title="Form your UAE company — Mainland, Freezone or Offshore."
      intro="We help you pick the right jurisdiction and license type for your activity, ownership and tax goals — and we handle every approval, document and bank introduction from there."
      defaultService="Company Setup — Mainland"
      sections={[
        {
          heading: "Mainland (DED)",
          body: "Onshore companies licensed by the Department of Economy & Tourism with the freedom to trade anywhere in the UAE and bid on government work.",
          bullets: ["100% foreign ownership for most activities", "Unlimited visa quota (office-based)", "Local market & government contracts", "DED trade license & MOA"],
        },
        {
          heading: "Freezone",
          body: "50+ Freezones across the UAE — including IFZA, Meydan, DMCC, RAKEZ, SHAMS, ADGM and DIFC — with tax incentives and fast issuance.",
          bullets: ["100% ownership & repatriation", "Fast issuance (3–7 days)", "Flexi-desk / office packages", "Activity-specific Freezones"],
        },
        {
          heading: "Offshore",
          body: "Tax-efficient holding structures (JAFZA, RAK ICC, Ajman Offshore) for international trading, asset protection and IP holding.",
          bullets: ["No physical office required", "Asset protection", "International banking", "Confidential ownership"],
        },
        {
          heading: "What's included",
          body: "Initial approval, trade name reservation, MOA drafting, license issuance, Establishment Card, Chamber of Commerce, and corporate bank account introduction.",
          bullets: ["Senior advisor end-to-end", "Government liaison (PRO)", "Bank account introductions", "Post-license compliance setup"],
        },
      ]}
    />
  ),
});
