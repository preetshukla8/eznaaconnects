import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/SiteSections";

export const Route = createFileRoute("/services/visa-services")({
  head: () => ({
    meta: [
      { title: "UAE Visa Services | Investor, Employee, Family & Golden Visa — Eznaa Connects" },
      { name: "description", content: "Investor, partner, employee, family and Golden Visa processing in the UAE — including Emirates ID, medical, status change and PRO services." },
      { property: "og:title", content: "UAE Visa Services — Eznaa Connects" },
      { property: "og:description", content: "End-to-end UAE visa processing — investor, employee, family and Golden Visa." },
    ],
  }),
  component: () => (
    <ServicePageTemplate
      eyebrow="Visa services"
      title="UAE visas — handled end-to-end, on time."
      intro="From entry permit to Emirates ID, we manage every step of your visa file — for shareholders, employees, dependants and Golden Visa applicants."
      defaultService="Visa Services"
      sections={[
        {
          heading: "Investor & Partner Visa",
          body: "Residency tied to your shareholding in a UAE company — Mainland or Freezone.",
          bullets: ["2 or 3-year validity", "Entry permit & status change", "Medical & Emirates ID", "Family sponsorship ready"],
        },
        {
          heading: "Employee Visa",
          body: "Hire local or international staff with fully compliant labour and immigration files.",
          bullets: ["Labour contract & quota", "Entry permit & change-of-status", "Medical, EID & stamping", "Workplace insurance options"],
        },
        {
          heading: "Family Visa",
          body: "Sponsor spouse, children and parents — with income, tenancy and attestation handled.",
          bullets: ["Attested marriage/birth docs", "Tenancy & salary thresholds", "EID & medical", "Maid / domestic worker visa"],
        },
        {
          heading: "Golden Visa (10-year)",
          body: "Long-term residency for investors, founders, specialised talent and high-income professionals.",
          bullets: ["Eligibility assessment", "Document & approval handling", "ICP nominations", "Family inclusion"],
        },
      ]}
    />
  ),
});
