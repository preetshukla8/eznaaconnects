import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/fashion")({
  head: () => ({
    meta: [
      { title: "Fashion & Apparel | Eznaa Global Mart FZ-LLC" },
      {
        name: "description",
        content:
          "Eznaa Global Mart's Fashion & Apparel collection is available on Noon, Amazon UAE and other leading UAE marketplaces. A dedicated site experience is launching soon.",
      },
      { property: "og:title", content: "Fashion & Apparel — Eznaa Global Mart FZ-LLC" },
      {
        property: "og:description",
        content: "Now available on Noon, Amazon UAE and leading UAE marketplaces.",
      },
    ],
  }),
  component: FashionComingSoon,
});

const INK = "#0E1A2B";
const INK_SOFT = "#3B4A63";
const BG_TOP = "#F7F6F2";
const BG_BOTTOM = "#EEF1F6";
const GOLD = "#B8894A";
const BORDER = "rgba(14, 26, 43, 0.10)";

function FashionComingSoon() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        color: INK,
        background: `radial-gradient(1200px 600px at 50% -10%, #ffffff 0%, ${BG_TOP} 45%, ${BG_BOTTOM} 100%)`,
      }}
    >
      <header style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-md font-display text-lg font-bold"
              style={{ background: INK, color: "#F7F6F2" }}
            >
              E
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
                Fashion & Apparel Division
              </span>
            </div>
          </Link>
          <Link
            to="/"
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors md:inline-flex"
            style={{ border: `1px solid ${INK}`, color: INK }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Group
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="container-page w-full py-16 text-center md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl"
          >
            <span
              className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em]"
              style={{ color: GOLD }}
            >
              <Sparkles className="h-3.5 w-3.5" /> Fashion & Apparel Division
            </span>

            <h1
              className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl"
              style={{ color: INK, letterSpacing: "-0.02em" }}
            >
              Fashion & Apparel
            </h1>
            <p
              className="mt-3 font-display text-base md:text-lg"
              style={{ color: INK_SOFT }}
            >
              Already available across leading UAE marketplaces.
            </p>

            <div className="mx-auto mt-8 flex items-center justify-center gap-3">
              <span
                className="h-px w-16"
                style={{
                  background: `linear-gradient(to right, transparent, ${GOLD})`,
                }}
              />
              <span
                className="h-1.5 w-1.5 rotate-45"
                style={{ background: GOLD }}
              />
              <span
                className="h-px w-16"
                style={{
                  background: `linear-gradient(to left, transparent, ${GOLD})`,
                }}
              />
            </div>

            <p
              className="mx-auto mt-8 max-w-xl text-sm leading-relaxed md:text-base"
              style={{ color: INK_SOFT }}
            >
              Our Fashion & Apparel collection is currently retailing on <strong style={{ color: INK }}>Noon</strong>, <strong style={{ color: INK }}>Amazon UAE</strong> and other major e-commerce platforms across the United Arab Emirates. A dedicated Fashion & Apparel experience on this website is being crafted and will launch here soon.
            </p>

            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:gap-3"
              style={{ background: INK, color: "#F7F6F2" }}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Eznaa Global Mart
            </Link>
          </motion.div>
        </div>
      </main>

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
