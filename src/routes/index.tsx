import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Sparkles, Globe2, Building2, ShieldCheck, TrendingUp } from "lucide-react";
import { ParentShell } from "@/components/parent/ParentShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eznaa Global Mart FZ-LLC | Diversified UAE Holding Group" },
      {
        name: "description",
        content:
          "Eznaa Global Mart FZ-LLC is a UAE-based parent company operating diversified business divisions across professional services and lifestyle verticals.",
      },
      { property: "og:title", content: "Eznaa Global Mart FZ-LLC | UAE Holding Group" },
      {
        property: "og:description",
        content:
          "Parent company for Business Consultancy, Fashion & Apparel and future ventures — headquartered in the United Arab Emirates.",
      },
    ],
  }),
  component: ParentLanding,
});

const DIVISIONS = [
  {
    key: "consultancy",
    eyebrow: "Division 01",
    title: "Business Consultancy Services",
    description:
      "End-to-end corporate services for founders and enterprises entering the UAE — company formation, visas, VAT & Corporate Tax, accounting, audit and ongoing compliance.",
    bullets: ["Mainland · Freezone · Offshore", "Visas & PRO services", "Tax & audit compliance"],
    cta: { label: "Explore Business Consultancy", to: "/consultancy" as const },
    icon: Briefcase,
    accent: "from-[#4a7cff] to-[#7d5cff]",
    status: "active" as const,
  },
  {
    key: "fashion",
    eyebrow: "Division 02",
    title: "Fashion & Apparel",
    description:
      "A forthcoming lifestyle label from the Eznaa group — considered design, refined materials, and contemporary silhouettes for the modern wardrobe.",
    bullets: ["Ready-to-wear collections", "Premium sourcing", "Direct-to-consumer"],
    cta: { label: "Coming Soon", to: "/fashion" as const },
    icon: Sparkles,
    accent: "from-[#c9a24c] to-[#e5c47a]",
    status: "coming-soon" as const,
  },
];

function ParentLanding() {
  return (
    <ParentShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#1a2a55_0%,transparent_70%)] opacity-70" />
          <div className="absolute top-40 left-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(closest-side,#c9a24c_0%,transparent_70%)] opacity-20" />
          <div className="absolute right-[-10%] top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,#4a7cff_0%,transparent_70%)] opacity-15" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="container-page pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24c]" />
              Eznaa Global Mart FZ-LLC
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
              A diversified UAE group{" "}
              <span className="bg-gradient-to-r from-[#c9a24c] via-[#e5c47a] to-[#c9a24c] bg-clip-text text-transparent">
                building brands that endure.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Headquartered in the United Arab Emirates, Eznaa Global Mart is the parent company behind a growing family of professional service and lifestyle ventures — each held to a single standard of craft, trust and long-term thinking.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#divisions"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c9a24c] to-[#e5c47a] px-6 py-3 text-sm font-semibold text-[#050914] shadow-xl shadow-[#c9a24c]/20 transition-transform hover:scale-[1.02]"
              >
                Our Business Divisions <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/consultancy"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Business Consultancy
              </Link>
            </div>
          </div>

          {/* Pillars */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:mt-24 md:grid-cols-3">
            {[
              { icon: Globe2, title: "UAE-headquartered", desc: "Free Zone licensed, operating regionally and internationally." },
              { icon: ShieldCheck, title: "Governance-first", desc: "Every venture built on transparent, formal corporate standards." },
              { icon: TrendingUp, title: "Built to scale", desc: "A holding architecture designed for new divisions and partnerships." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-white/5 text-[#c9a24c] ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section id="divisions" className="relative border-t border-white/5 py-20 md:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#c9a24c]">
              <Building2 className="h-3.5 w-3.5" /> The Group
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-5xl">
              Our Business Divisions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
              Two active verticals today, with a scalable structure ready for tomorrow.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {DIVISIONS.map((d) => {
              const Icon = d.icon;
              const isActive = d.status === "active";
              return (
                <div
                  key={d.key}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 backdrop-blur transition-all hover:border-white/25 hover:from-white/[0.08] md:p-10"
                >
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br ${d.accent} opacity-20 blur-3xl transition-opacity group-hover:opacity-30`}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                        {d.eyebrow}
                      </span>
                      {!isActive && (
                        <span className="rounded-full border border-[#c9a24c]/40 bg-[#c9a24c]/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#e5c47a]">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <div
                      className={`mt-6 grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br ${d.accent} text-[#050914] shadow-lg`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold text-white md:text-3xl">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">
                      {d.description}
                    </p>

                    <ul className="mt-6 space-y-2">
                      {d.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-white/70">
                          <span className="h-1 w-1 rounded-full bg-[#c9a24c]" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={d.cta.to}
                      className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-white text-[#050914] hover:scale-[1.02]"
                          : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {d.cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.22em] text-white/40">
            More divisions in development
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1530] via-[#0a1128] to-[#050914] p-10 md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a24c]/20 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold text-white md:text-4xl">
                  Partner with the Eznaa group.
                </h3>
                <p className="mt-3 max-w-xl text-sm text-white/65 md:text-base">
                  For consulting engagements, corporate services or venture partnerships, our team is one message away.
                </p>
              </div>
              <Link
                to="/consultancy"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#c9a24c] to-[#e5c47a] px-6 py-3 text-sm font-semibold text-[#050914] shadow-xl shadow-[#c9a24c]/20 transition-transform hover:scale-[1.02]"
              >
                Talk to Consultancy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ParentShell>
  );
}
