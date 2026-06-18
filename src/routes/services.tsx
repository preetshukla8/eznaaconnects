import { createFileRoute } from "@tanstack/react-router";
import { ServicesGrid, CtaBand } from "@/components/site/SiteSections";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Eznaa Connects — UAE Business Setup, Visa, Tax & Compliance" },
      { name: "description", content: "Full-service UAE business solutions: Mainland/Freezone/Offshore company setup, visa services, VAT and Corporate Tax, accounting, audit and AML compliance." },
      { property: "og:title", content: "Eznaa Connects — Services" },
      { property: "og:description", content: "Company setup, visas, VAT & Corporate Tax, accounting and AML compliance under one roof." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="section-band">
        <div className="container-page section">
          <p className="eyebrow-gold">Our services</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Four practice areas. One accountable team.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            From your first trade license to ongoing VAT, Corporate Tax and audit cycles, Eznaa Connects covers the full lifecycle of a UAE business.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <ServicesGrid />
        </div>
      </section>

      <section className="section section-band">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow-gold">Talk to an advisor</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Not sure which service you need?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Share a few details and a senior consultant will recommend the right jurisdiction, license type and compliance setup — free of charge.
            </p>
          </div>
          <LeadForm title="Request a recommendation" subtitle="Reply within 1 business hour." />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
