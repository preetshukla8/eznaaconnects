import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, FileCheck2, Landmark, ShieldCheck, Sparkles, BadgeCheck, Users, Clock, Globe2 } from "lucide-react";
import { ConsultationRequest } from "@/components/site/ConsultationRequest";
import { openConsultationChat } from "@/components/site/ConsultationChat";

export const SERVICES = [
  {
    slug: "/services/company-setup",
    icon: Building2,
    title: "Company Setup",
    blurb: "Mainland, Freezone and Offshore formation — license, trade name, MOA, banking.",
    bullets: ["50+ Freezones", "DED Mainland", "100% ownership options"],
  },
  {
    slug: "/services/visa-services",
    icon: Users,
    title: "Visa Services",
    blurb: "Investor, Employee, Family and Golden Visas with PRO and Emirates ID handling.",
    bullets: ["Investor & Partner", "Employee & Family", "Golden Visa"],
  },
  {
    slug: "/services/tax-vat-ct",
    icon: Landmark,
    title: "VAT & Corporate Tax",
    blurb: "FTA-aligned VAT and 9% Corporate Tax registration, filing and advisory.",
    bullets: ["VAT registration", "CT registration", "Filing & advisory"],
  },
  {
    slug: "/services/accounting-compliance",
    icon: ShieldCheck,
    title: "Accounting & Compliance",
    blurb: "Bookkeeping, audit support, AML / UBO / ESR — keep your business in good standing.",
    bullets: ["Bookkeeping", "Statutory audit", "AML / UBO / ESR"],
  },
] as const;

export function ServicesGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {SERVICES.map((s) => (
        <Link key={s.slug} to={s.slug} className="card-soft group p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
              <s.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-primary">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-medium text-foreground/80">{b}</li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-foreground">
                Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function TrustStrip() {
  const items = [
    { icon: BadgeCheck, label: "Licensed corporate agent" },
    { icon: Clock, label: "Setup in 3–7 working days" },
    { icon: Globe2, label: "All 7 Emirates · 50+ Freezones" },
    { icon: Sparkles, label: "Transparent fixed pricing" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <it.icon className="h-5 w-5 text-gold" />
          <span className="text-sm font-medium text-foreground/85">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

export function StatsBand() {
  const stats = [
    { k: "5,000+", v: "Businesses launched" },
    { k: "50+", v: "UAE Freezones covered" },
    { k: "98%", v: "Client retention" },
    { k: "1 hr", v: "Avg. response time" },
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.v} className="bg-card p-6 text-center">
          <div className="font-display text-3xl font-bold text-primary md:text-4xl">{s.k}</div>
          <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
        </div>
      ))}
    </div>
  );
}

export function ProcessSteps() {
  const steps = [
    { n: "01", t: "Free consultation", d: "Tell us your goal — activity, jurisdiction, visas needed. We propose the best-fit structure." },
    { n: "02", t: "Document collection", d: "Share IDs, passport copies, proposed names. We prepare MOA, applications and approvals." },
    { n: "03", t: "License & approvals", d: "We file with DED / Freezone authority and secure your trade license." },
    { n: "04", t: "Banking & onboarding", d: "Corporate bank account, VAT/CT registration, visa stamping and Emirates ID." },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <div key={s.n} className="card-soft p-6">
          <div className="font-display text-3xl text-gold">{s.n}</div>
          <h4 className="mt-2 font-display text-lg font-bold text-primary">{s.t}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
        </div>
      ))}
    </div>
  );
}

export function CtaBand({ title = "Ready to start your UAE business?", note = "Talk to a senior advisor today — free, no obligation." }: { title?: string; note?: string }) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="card-soft flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="eyebrow-gold">Get started</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-primary md:text-3xl">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{note}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={openConsultationChat} className="btn-primary">Book free consultation</button>
            <a href="https://wa.me/971552365373" target="_blank" rel="noreferrer" className="btn-outline">WhatsApp us</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicePageTemplate({
  eyebrow,
  title,
  intro,
  sections,
  defaultService,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  defaultService: string;
}) {
  return (
    <>
      <section className="section-band">
        <div className="container-page section grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow-gold">{eyebrow}</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={openConsultationChat} className="btn-primary">Get a quote</button>
              <a href="tel:+971552365373" className="btn-outline">Call an advisor</a>
            </div>
          </div>
          <div id="enquire" className="lg:sticky lg:top-24">
            <ConsultationRequest defaultService={defaultService} title="Free quote in 1 hour" subtitle="Senior consultant — not a call center." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          {sections.map((s) => (
            <article key={s.heading} className="card-soft p-7">
              <div className="flex items-center gap-2 text-gold"><FileCheck2 className="h-5 w-5" /></div>
              <h2 className="mt-2 font-display text-2xl font-bold text-primary">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.body}</p>
              {s.bullets && (
                <ul className="mt-4 space-y-2 text-sm">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{b}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
