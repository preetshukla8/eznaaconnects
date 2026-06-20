import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/SiteSections";
import { Award, Users, Target, Globe2, Eye, Compass, Building2, HeartHandshake } from "lucide-react";

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
          <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
            Eznaa Connects Business Solutions is a UAE-based advisory firm specialising in company formation, visas, tax and compliance. We work with founders, SMEs, family offices and global investors who want a single accountable partner for their UAE business — from incorporation to ongoing compliance.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow-gold"><Building2 className="h-3.5 w-3.5" /> Who we are</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Built by UAE-based advisors who've sat on both sides of the table.</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Eznaa Connects was founded by a team of chartered accountants, PRO specialists and ex-Freezone authority consultants who saw the same story repeat: founders being passed between agents, hit with surprise government fees, and left alone the moment their license printed. We built Eznaa to be the opposite — a single senior-led firm that owns your file from incorporation through every renewal, return and audit that follows.
            </p>
            <p>
              We're licensed corporate service providers headquartered in Dubai, with active mandates across Abu Dhabi, Sharjah, RAK, Ajman, Fujairah, UAQ and 50+ Freezones including IFZA, DMCC, Meydan, DIFC, ADGM, SHAMS and JAFZA. Our clients include first-time founders, regulated fintech operators, e-commerce groups, professional services firms and family offices relocating to the UAE.
            </p>
            <p>
              Every engagement starts with a free consultation with a senior advisor — not a junior intake desk — so the person scoping your file is the same person you'll work with for years.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="section section-band">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="card-soft p-7 md:p-8">
            <Compass className="h-7 w-7 text-gold" />
            <p className="eyebrow-gold mt-4">Our mission</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-primary md:text-3xl">Make UAE business setup effortless and honest.</h3>
            <p className="mt-3 text-muted-foreground">
              The UAE is one of the most opportunity-rich markets in the world — but it's also a regulated environment with frequent updates to tax, visa and compliance rules. Our mission is to make navigating that environment effortless: clear pricing, senior advisors, and a single team that owns your file from the first call to your annual audit.
            </p>
          </div>

          <div className="card-soft p-7 md:p-8">
            <Eye className="h-7 w-7 text-gold" />
            <p className="eyebrow-gold mt-4">Our vision</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-primary md:text-3xl">Be the most trusted business partner in the Emirates.</h3>
            <p className="mt-3 text-muted-foreground">
              We're building Eznaa Connects to become the default corporate advisor for anyone starting or running a business in the UAE — known not for being the cheapest, but for being the most transparent, technically sharp and reliably present partner in the market. A firm where the answer to "who handles your UAE setup?" is always the same name.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE STAND FOR */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow-gold"><HeartHandshake className="h-3.5 w-3.5" /> What we stand for</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Four commitments we make to every client.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
