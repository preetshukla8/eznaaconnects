import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/SiteSections";
import { Award, Users, Target, Globe2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Eznaa Connects | UAE Business Solutions" },
      { name: "description", content: "Eznaa Connects is a UAE-based corporate advisory firm helping founders, SMEs and global investors set up, scale and stay compliant in the Emirates." },
      { property: "og:title", content: "About — Eznaa Connects Business Solutions" },
      { property: "og:description", content: "Senior-led, transparent UAE corporate advisory — setup, visas, tax and compliance." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Award, t: "Senior-led", d: "Every file is owned by a senior advisor — not handed to a call center." },
  { icon: Target, t: "Transparent pricing", d: "Itemised proposals up front. No hidden government-fee surprises." },
  { icon: Globe2, t: "Full-coverage", d: "All 7 Emirates and 50+ Freezones, plus offshore jurisdictions." },
  { icon: Users, t: "Long-term partner", d: "We stay on for VAT, CT, audit and renewals — not just the first license." },
];

function AboutPage() {
  return (
    <>
      <section className="section-band">
        <div className="container-page section">
          <p className="eyebrow-gold">About us</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
            A formal corporate advisor for founders building in the UAE.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Eznaa Connects Business Solutions is a UAE-based advisory firm specialising in company formation, visas, tax and compliance. We work with founders, SMEs, family offices and global investors who want a single accountable partner for their UAE business — from incorporation to ongoing compliance.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow-gold">Our mission</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Make UAE business setup effortless and honest.</h2>
            <p className="mt-4 text-muted-foreground">
              The UAE is one of the most opportunity-rich markets in the world — but it is also a regulated environment with frequent updates to tax, visa and compliance rules. Our mission is to make navigating that environment effortless: clear pricing, senior advisors, and a single team that owns your file from the first call to your annual audit.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.t} className="card-soft p-5">
                <v.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-3 font-display text-lg font-bold text-primary">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let's talk about your UAE plans" note="Senior advisor, free consultation — pick a time that works for you." />
    </>
  );
}
