import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/SiteSections";

export const Route = createFileRoute("/services/accounting-compliance")({
  head: () => ({
    meta: [
      { title: "Accounting, Audit & AML Compliance in UAE — Eznaa Connects" },
      { name: "description", content: "Bookkeeping, statutory audit, AML/CFT, UBO and ESR compliance for UAE Mainland and Freezone companies." },
      { property: "og:title", content: "UAE Accounting & Compliance — Eznaa Connects" },
      { property: "og:description", content: "Bookkeeping, audit support, AML, UBO and ESR compliance under one roof." },
    ],
  }),
  component: () => (
    <ServicePageTemplate
      eyebrow="Accounting & compliance"
      title="Keep the books clean. Keep the licence safe."
      intro="Monthly bookkeeping, audit-ready financials and regulatory filings (AML, UBO, ESR) so your trade license stays in good standing year after year."
      defaultService="Accounting & Audit"
      sections={[
        {
          heading: "Bookkeeping & Accounting",
          body: "Monthly bookkeeping on Zoho / QuickBooks / Xero with management reports tailored to your business.",
          bullets: ["Monthly bookkeeping", "Bank & card reconciliation", "Payroll & WPS", "Management reporting"],
        },
        {
          heading: "Audit Support",
          body: "Audit-ready financials and full liaison with approved UAE auditors for statutory and Freezone audits.",
          bullets: ["IFRS-aligned financials", "Auditor coordination", "Schedules & confirmations", "Year-end close"],
        },
        {
          heading: "AML / CFT",
          body: "AML registration on goAML, policies, KYC frameworks and ongoing transaction monitoring where required.",
          bullets: ["goAML registration", "AML policy & procedures", "KYC framework", "Risk assessments"],
        },
        {
          heading: "UBO & ESR",
          body: "Ultimate Beneficial Owner declarations and Economic Substance notifications/returns for in-scope activities.",
          bullets: ["UBO declarations", "ESR notification & return", "Annual maintenance", "Regulator correspondence"],
        },
      ]}
    />
  ),
});
