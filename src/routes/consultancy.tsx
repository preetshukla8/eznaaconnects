import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote, ShieldCheck, Star } from "lucide-react";
import { ServicesGrid, TrustStrip, StatsBand, ProcessSteps, CtaBand, ReviewsSection } from "@/components/site/SiteSections";
import { useLeadProfile } from "@/lib/lead-profile";
import heroAdvisor from "@/assets/hero-advisor.jpg";

export const Route = createFileRoute("/consultancy")({
  head: () => ({
    meta: [
      { title: "Eznaa Connects | UAE Business Setup, Visa & Tax Services" },
      { name: "description", content: "Launch and run your business in the UAE with confidence. Company formation, visas, VAT, Corporate Tax and compliance — handled end-to-end by Eznaa Connects." },
      { property: "og:title", content: "Eznaa Connects | UAE Business Solutions" },
      { property: "og:description", content: "Company setup, visas, VAT & Corporate Tax, accounting and compliance — across all 7 Emirates and 50+ Freezones." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { openModal } = useLeadProfile();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-secondary blur-3xl opacity-60" />
          <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        </div>
        <div className="container-page grid gap-12 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div className="flex flex-col justify-center">
            <p className="eyebrow-gold"><ShieldCheck className="h-3.5 w-3.5" /> Trusted UAE corporate advisors</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-primary md:text-6xl">
              Start, scale and stay compliant — <span className="text-gold">in the UAE.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Eznaa Connects handles your company formation, visas, VAT &amp; Corporate Tax, accounting and compliance — across Mainland, all 50+ Freezones and Offshore — so you can focus on the business.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={openModal} className="btn-gold">Get free consultation <ArrowRight className="h-4 w-4" /></button>
              <Link to="/services" className="btn-outline">Explore services</Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#0B2A4A", "#1d4b7a", "#2d6cb0", "#C9A24C"].map((c) => (
                  <div key={c} className="h-8 w-8 rounded-full border-2 border-background" style={{ background: c }} />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  <span className="ml-1.5 font-semibold text-primary">4.9 / 5</span>
                </div>
                <p className="text-xs text-muted-foreground">From 1,200+ founders &amp; SMEs</p>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-4">
            <div className="absolute -top-4 -left-4 hidden h-full w-full rounded-2xl border border-gold/30 lg:block" />
            <div className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-2xl bg-secondary lg:block" />
            <img
              src={heroAdvisor}
              alt="Senior Eznaa Connects business advisor in Dubai"
              width={1024}
              height={1280}
              className="relative w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="container-page pb-10">
          <TrustStrip />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section section-band">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow-gold">What we do</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Everything you need to run a UAE business</h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              One advisory team for setup, visas, tax and compliance — no juggling between agents, PROs and accountants.
            </p>
          </div>
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow-gold">How it works</p>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">From idea to active license, simply.</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              A clear four-step path with a senior advisor accountable for your file end-to-end.
            </p>
          </div>
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-band">
        <div className="container-page py-14">
          <StatsBand />
        </div>
      </section>

      {/* WHY US + TESTIMONIAL */}
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow-gold">Why Eznaa Connects</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">A formal, transparent partner — not a call center.</h2>
            <ul className="mt-6 space-y-4">
              {[
                ["Senior advisor on every file", "You speak to the consultant doing the work — not a junior intake desk."],
                ["Fixed, written pricing", "No hidden government-fee surprises. We give you a line-item proposal up front."],
                ["End-to-end coverage", "Setup, banking, visas, VAT, CT, audit and AML in one engagement."],
                ["Local + international expertise", "UAE-based team with global founders, family offices and SMEs as clients."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gold" />
                  <div>
                    <div className="font-semibold text-primary">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-soft p-7 md:p-9">
            <Quote className="h-8 w-8 text-gold" />
            <p className="mt-4 font-display text-xl leading-relaxed text-primary md:text-2xl">
              "Eznaa got our IFZA license, three investor visas and our VAT registration done in under two weeks. The proposal matched the final invoice — to the dirham."
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-secondary font-display font-bold text-primary">R</div>
              <div>
                <div className="text-sm font-semibold text-primary">Rohan Mehta</div>
                <div className="text-xs text-muted-foreground">Founder · SaaS, Dubai</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <CtaBand />
    </>
  );
}
