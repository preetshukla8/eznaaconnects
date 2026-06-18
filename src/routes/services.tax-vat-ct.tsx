import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/SiteSections";

export const Route = createFileRoute("/services/tax-vat-ct")({
  head: () => ({
    meta: [
      { title: "VAT & Corporate Tax in UAE | Registration, Filing & Advisory — Eznaa Connects" },
      { name: "description", content: "FTA-aligned VAT and 9% UAE Corporate Tax — registration, return filing, advisory and impact assessment for Mainland and Freezone businesses." },
      { property: "og:title", content: "UAE VAT & Corporate Tax — Eznaa Connects" },
      { property: "og:description", content: "VAT and Corporate Tax registration, filing and advisory aligned to FTA requirements." },
    ],
  }),
  component: () => (
    <ServicePageTemplate
      eyebrow="Tax"
      title="VAT & Corporate Tax — registered, filed, advised."
      intro="The UAE's VAT and 9% Corporate Tax regimes require careful registration, classification and reporting. We make sure you stay aligned with the Federal Tax Authority — without overpaying."
      defaultService="VAT Registration & Filing"
      sections={[
        {
          heading: "VAT Registration",
          body: "Mandatory or voluntary registration with the FTA, TRN issuance and EmaraTax portal setup.",
          bullets: ["AED 375k / 187.5k thresholds", "TRN issuance", "EmaraTax onboarding", "Group / branch registration"],
        },
        {
          heading: "VAT Return Filing",
          body: "Quarterly (or monthly) returns prepared, reviewed and submitted — including reverse charge and zero-rated treatment.",
          bullets: ["Quarterly / monthly filing", "Input vs output VAT review", "Refund applications", "Voluntary disclosures"],
        },
        {
          heading: "Corporate Tax (9%)",
          body: "Registration, taxable income computation, Qualifying Freezone Person assessment and annual return filing.",
          bullets: ["CT registration with FTA", "QFZP eligibility review", "Transfer pricing alignment", "Annual CT return"],
        },
        {
          heading: "Tax Advisory",
          body: "Structuring advice, impact assessments and FTA correspondence to keep you efficient and compliant.",
          bullets: ["Tax impact assessment", "Restructuring advisory", "FTA audit support", "Cross-border treatment"],
        },
      ]}
    />
  ),
});
