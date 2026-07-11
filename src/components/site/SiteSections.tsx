import { useState } from "react";

import { ArrowRight, Building2, FileCheck2, Landmark, ShieldCheck, Sparkles, BadgeCheck, Users, Clock, Globe2, FileText, Link2, MessageCircle, Star, X } from "lucide-react";
import { ConsultationRequest } from "@/components/site/ConsultationRequest";
import { useLeadProfile } from "@/lib/lead-profile";

const WHATSAPP_URL = "https://wa.me/971552365373";

export const SERVICES = [
  {
    slug: "/services/tax-vat-ct",
    icon: FileText,
    title: "VAT Registration",
    blurb: "Get your business VAT-registered with the FTA and start charging & reclaiming the 5% VAT.",
    bullets: ["Charge 5% VAT on sales", "Reclaim VAT on purchases", "Required by most B2B clients"],
    details: {
      intro: "Once registered for VAT with the Federal Tax Authority, your company becomes a credible B2B vendor — most established companies prefer to deal only with VAT-registered businesses.",
      points: [
        "You can charge 5% VAT on every sales invoice issued to your customers.",
        "You are eligible to claim back the 5% VAT paid to your suppliers at the time of filing your VAT return.",
        "Most established companies only collaborate with VAT-registered business partners.",
        "We handle the full FTA application, TRN issuance and EmaraTax onboarding.",
      ],
    },
  },
  {
    slug: "/services/tax-vat-ct",
    icon: Landmark,
    title: "Corporate Tax Registration",
    blurb: "Mandatory FTA Corporate Tax registration for every UAE company — no threshold applies.",
    bullets: ["Mandatory for all UAE companies", "Avoid AED 10,000 FTA penalty", "Required from day one"],
    details: {
      intro: "Corporate Tax registration is mandatory for every UAE company — there is no minimum revenue or threshold limit. Newly licensed companies must register immediately, even if the trade license was issued only yesterday.",
      points: [
        "Mandatory for every UAE company — Mainland, Freezone and Offshore.",
        "The Federal Tax Authority imposes a penalty of AED 10,000 if you fail to register before the deadline.",
        "Newly licensed companies must register immediately upon receiving the trade license.",
        "We prepare and file the full Corporate Tax registration on EmaraTax on your behalf.",
      ],
    },
  },
  {
    slug: "/services/company-setup",
    icon: Building2,
    title: "Custom Registration",
    blurb: "Get your Import / Export Code for Dubai — the gateway to international trade.",
    bullets: ["Import & Export Code", "Dubai Customs portal", "Trade-ready in days"],
    details: {
      intro: "Customs Registration gives your company an Import & Export Code, allowing you to legally import goods into Dubai and export to international markets.",
      points: [
        "Issuance of Import & Export Code for Dubai.",
        "Full Dubai Customs portal registration and account activation.",
        "Required for any company moving physical goods in or out of the UAE.",
        "End-to-end document handling — no need to visit Customs in person.",
      ],
    },
  },
  {
    slug: "/services/accounting-compliance",
    icon: Link2,
    title: "Customs Linking",
    blurb: "Link your VAT TRN with the Customs portal so you can reclaim 5% VAT on imports.",
    bullets: ["Link TRN ↔ Customs code", "Reclaim VAT on imports", "FTA-aligned setup"],
    details: {
      intro: "Customs Linking connects your VAT TRN (Tax Registration Number) with the Dubai Customs portal and your Customs Code with the FTA portal — unlocking VAT reclaims on imports.",
      points: [
        "Link your VAT TRN inside the Dubai Customs portal.",
        "Link your Customs Code inside the FTA / EmaraTax portal.",
        "Once linked, you can claim back the 5% VAT paid on imports during your VAT return filing.",
        "Critical for any business importing goods — protects your cashflow.",
      ],
    },
  },
] as const;

export function ServicesGrid() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { openModal } = useLeadProfile();
  const active = openIdx !== null ? SERVICES[openIdx] : null;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <div key={s.title} className="card-soft group p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
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
                <button
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-foreground"
                >
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 p-0 md:items-center md:p-6"
          onClick={() => setOpenIdx(null)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-t-2xl bg-card shadow-2xl md:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenIdx(null)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground/70 hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-secondary text-primary">
                  <active.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="eyebrow-gold">Service details</p>
                  <h3 className="font-display text-2xl font-bold text-primary">{active.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">{active.details.intro}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {active.details.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="leading-relaxed text-foreground/85">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi Eznaa Connect, I'd like more information about: ${active.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" /> Contact us on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => { setOpenIdx(null); openModal(); }}
                  className="btn-outline"
                >
                  Book free consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
    { k: "24 hrs", v: "Typical response time" },
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

export function ReviewsSection() {
  const reviews = [
    {
      name: "Rohan Mehta",
      role: "Founder · SaaS, Dubai",
      quote: "The process felt calm and structured from day one. We had clear milestones, transparent advice and a final answer on every question.",
    },
    {
      name: "Amina Al Zaabi",
      role: "Director · Trading Group, Abu Dhabi",
      quote: "Their team handled the setup, visas and tax alignment without confusion. The quality of guidance was exceptional for a premium service.",
    },
    {
      name: "Daniel Brooks",
      role: "Managing Partner · Consulting Firm, London",
      quote: "We needed a reliable UAE setup partner with international experience. Eznaa delivered with speed, precision and thoughtful follow-through.",
    },
  ];

  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-gold">Client feedback</p>
          <h3 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">Trusted by founders and growing companies</h3>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">A premium advisory experience built around responsiveness, clarity and dependable execution.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="card-soft p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={`${review.name}-${i}`} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-foreground/85">“{review.quote}”</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="font-semibold text-primary">{review.name}</div>
                <div className="text-sm text-muted-foreground">{review.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title = "Ready to start your UAE business?", note = "Talk to a senior advisor today — free, no obligation." }: { title?: string; note?: string }) {
  const { openModal } = useLeadProfile();

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
            <button type="button" onClick={openModal} className="btn-primary">Book free consultation</button>
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
  const { openModal } = useLeadProfile();

  return (
    <>
      <section className="section-band">
        <div className="container-page section grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow-gold">{eyebrow}</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={openModal} className="btn-primary">Get a quote</button>
              <a href="tel:+971552365373" className="btn-outline">Call an advisor</a>
            </div>
          </div>
          <div id="enquire" className="lg:sticky lg:top-24">
            <ConsultationRequest defaultService={defaultService} title="Free quote within 24 business hours" subtitle="Senior consultant — not a call center." />
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
