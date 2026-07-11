import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import ParentLogo from "@/assets/parent-company-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eznaa Global Mart FZ-LLC | UAE Holding Group" },
      {
        name: "description",
        content:
          "Eznaa Global Mart FZ-LLC — a UAE-based holding group. Select a business division to explore.",
      },
      { property: "og:title", content: "Eznaa Global Mart FZ-LLC" },
      {
        property: "og:description",
        content: "Choose a division: Business Consultancy Services or Fashion & Apparel.",
      },
    ],
  }),
  component: ParentGateway,
});

// Slightly more authoritative palette than the consultancy site:
// deeper slate ink on a cool off-white with a warm gold accent.
const INK = "#0E1A2B";
const INK_SOFT = "#3B4A63";
const BG_TOP = "#F7F6F2";
const BG_BOTTOM = "#EEF1F6";
const GOLD = "#B8894A";
const BORDER = "rgba(14, 26, 43, 0.10)";

function ParentGateway() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        color: INK,
        background: `radial-gradient(1200px 600px at 50% -10%, #ffffff 0%, ${BG_TOP} 45%, ${BG_BOTTOM} 100%)`,
      }}
    >
      {/* Header */}
      <header
        className="w-full"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-white/80 shadow-sm">
              <img
                src={ParentLogo}
                alt="Eznaa Global Mart FZ-LLC logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="font-display text-[1rem] font-bold md:text-[1.1rem]"
                style={{ color: INK }}
              >
                Eznaa Global Mart FZ-LLC
              </span>
              <span
                className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] md:text-[0.66rem]"
                style={{ color: INK_SOFT }}
              >
                United Arab Emirates
              </span>
            </div>
          </div>
          <span
            className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.22em] md:inline"
            style={{ color: INK_SOFT }}
          >
            Est. UAE
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center">
        <div className="container-page w-full py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
          >
            <span
              className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em]"
              style={{ color: GOLD }}
            >
              <span
                className="h-1 w-6"
                style={{ background: GOLD }}
              />
              The Group
            </span>
            <h1
              className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl"
              style={{ color: INK, letterSpacing: "-0.02em" }}
            >
              Welcome to Eznaa Global Mart FZ-LLC
            </h1>
            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-relaxed md:text-base"
              style={{ color: INK_SOFT }}
            >
              A diversified enterprise with an established presence across the Middle East and India — delivering trusted business, advisory and lifestyle solutions.
            </p>
            <div
              className="mx-auto mt-4 flex items-center justify-center gap-3 text-lg md:text-xl"
              aria-label="Countries of operation: UAE, India, Oman, Saudi Arabia"
            >
              <span>🇦🇪</span>
              <span style={{ color: GOLD }}>·</span>
              <span>🇮🇳</span>
              <span style={{ color: GOLD }}>·</span>
              <span>🇴🇲</span>
              <span style={{ color: GOLD }}>·</span>
              <span>🇸🇦</span>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
            <DivisionCard
              to="/consultancy"
              index={0}
              title="Business Consultancy Services"
              description="Business setup, corporate advisory, compliance and strategic consulting."
              cta="Explore"
              icon={<Briefcase className="h-5 w-5" />}
              accent={INK}
              buttonStyle={{ background: INK, color: "#F7F6F2" }}
            />
            <DivisionCard
              to="/fashion"
              index={1}
              title="Fashion & Apparel"
              description="Premium fashion and lifestyle division."
              cta="Explore"
              icon={<Sparkles className="h-5 w-5" />}
              accent={GOLD}
              buttonStyle={{
                background: "transparent",
                color: INK,
                border: `1px solid ${INK}`,
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}` }}>
        <div
          className="container-page py-5 text-center text-xs"
          style={{ color: INK_SOFT }}
        >
          © {new Date().getFullYear()} Eznaa Global Mart FZ-LLC · All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function DivisionCard({
  to,
  index,
  title,
  description,
  cta,
  icon,
  accent,
  buttonStyle,
}: {
  to: "/consultancy" | "/fashion";
  index: number;
  title: string;
  description: string;
  cta: string;
  icon: React.ReactNode;
  accent: string;
  buttonStyle: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.008 }}
    >
      <Link
        to={to}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 md:p-10"
        style={{
          background: "#FFFFFF",
          border: `1px solid ${BORDER}`,
          boxShadow:
            "0 1px 2px rgba(14,26,43,0.04), 0 12px 32px -18px rgba(14,26,43,0.18)",
          transition: "box-shadow 250ms ease, border-color 250ms ease",
        }}
      >
        {/* Accent bar */}
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: accent }}
        />

        <div className="flex items-center justify-end">
          <div
            className="grid h-10 w-10 place-items-center rounded-lg"
            style={{
              background: "rgba(14,26,43,0.04)",
              color: accent,
            }}
          >
            {icon}
          </div>
        </div>

        <h2
          className="mt-8 font-display text-2xl font-bold leading-snug md:text-[1.75rem]"
          style={{ color: INK, letterSpacing: "-0.015em" }}
        >
          {title}
        </h2>
        <p
          className="mt-3 text-sm leading-relaxed md:text-base"
          style={{ color: INK_SOFT }}
        >
          {description}
        </p>

        <div className="mt-auto pt-8">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
            style={buttonStyle}
          >
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Soft corner glow on hover */}
        <span
          className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: accent }}
        />
      </Link>
    </motion.div>
  );
}
