import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Crown, Sparkles, Globe2 } from "lucide-react";
import { motion } from "motion/react";
import logoAsset from "@/assets/gagan-milano-logo.jpeg";  

export const Route = createFileRoute("/fashion")({
  head: () => ({
    meta: [
      { title: "Gagan Milano — Timeless Elegance for Every Woman" },
      {
        name: "description",
        content:
          "Gagan Milano by Eznaa Global Mart FZ LLC — a premium women's fashion label from the UAE. Timeless elegance, refined craftsmanship, contemporary grace.",
      },
      { property: "og:title", content: "Gagan Milano — By Eznaa Global Mart FZ LLC" },
      {
        property: "og:description",
        content:
          "A premium women's fashion label. Now available on Noon UAE while our official experience prepares for launch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: logoAsset },
      { name: "twitter:image", content: logoAsset },
    ],
  }),
  component: GaganMilanoPage,
});

// Brand palette — feminine, luxurious, editorial
const IVORY = "#F7F1E6";
const IVORY_SOFT = "#FBF6EC";
const CREAM_DEEP = "#EFE6D3";
const FOREST = "#1F3A2B";
const FOREST_DEEP = "#152A1F";
const GOLD = "#B8894A";
const GOLD_SOFT = "#D4AF6F";
const INK = "#2C2418";
const INK_SOFT = "#6B5F4E";
const BORDER = "rgba(31, 58, 43, 0.14)";

const NOON_URL = "https://www.noon.com/uae-en/";

function GaganMilanoPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: IVORY, color: INK, fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
    >
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${BORDER}`, background: `${IVORY_SOFT}dd`, backdropFilter: "blur(8px)" }} className="sticky top-0 z-30">
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="grid h-11 w-11 place-items-center overflow-hidden rounded-full"
              style={{ border: `1.5px solid ${GOLD}`, background: IVORY_SOFT }}
            >
              <img src={logoAsset} alt="Gagan Milano" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[1.05rem] font-semibold tracking-[0.18em]" style={{ color: FOREST }}>
                GAGAN MILANO
              </span>
              <span
                className="text-[0.6rem] font-medium uppercase tracking-[0.28em]"
                style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
              >
                By EGM · FZ LLC UAE
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase transition-colors md:inline-flex"
              style={{ color: FOREST, fontFamily: "'Inter', sans-serif" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Group
            </Link>
            <a
              href={NOON_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-all hover:opacity-90"
              style={{ background: FOREST, color: IVORY, fontFamily: "'Inter', sans-serif" }}
            >
              Shop on Noon UAE <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Ornamental corner brocades */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-0 h-[560px] w-[320px] opacity-[0.09]"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${GOLD} 0%, transparent 60%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-0 h-[560px] w-[320px] opacity-[0.09]"
          style={{
            background: `radial-gradient(circle at 70% 60%, ${FOREST} 0%, transparent 60%)`,
          }}
        />

        <div className="container-page relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-10 flex justify-center"
            >
              <div
                className="relative grid h-40 w-40 place-items-center overflow-hidden rounded-full md:h-52 md:w-52"
                style={{
                  boxShadow: `0 0 0 1px ${BORDER}, 0 30px 60px -30px rgba(31,58,43,0.35)`,
                  background: IVORY_SOFT,
                }}
              >
                <img src={logoAsset} alt="Gagan Milano" className="h-full w-full object-cover" />
              </div>
            </motion.div>

            <span
              className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em]"
              style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
            >
              <span className="h-px w-8" style={{ background: GOLD }} />
              A Premium Women's Label
              <span className="h-px w-8" style={{ background: GOLD }} />
            </span>

            <h1
              className="mt-6 text-5xl leading-[1.05] tracking-[-0.01em] md:text-7xl"
              style={{ color: FOREST, fontWeight: 500 }}
            >
              Timeless Elegance
              <br />
              <em style={{ color: GOLD, fontStyle: "italic", fontWeight: 400 }}>for Every Woman</em>
            </h1>

            <p
              className="mx-auto mt-8 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Gagan Milano is a premium fashion house crafted in the United Arab Emirates —
              where refined craftsmanship meets a quiet, contemporary grace. Curated
              collections designed to feel as timeless as the woman who wears them.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-all hover:opacity-90"
                style={{ background: FOREST, color: IVORY, fontFamily: "'Inter', sans-serif" }}
              >
                About the Brand
              </a>
              <a
                href={NOON_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-all hover:gap-3"
                style={{
                  border: `1.5px solid ${GOLD}`,
                  color: FOREST,
                  fontFamily: "'Inter', sans-serif",
                  background: "transparent",
                }}
              >
                Shop on Noon UAE <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <Ornament className="mx-auto mt-14" />
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative" style={{ background: IVORY_SOFT }}>
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:col-span-5"
            >
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.32em]"
                style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
              >
                — The House
              </span>
              <h2
                className="mt-4 text-4xl leading-[1.1] md:text-5xl"
                style={{ color: FOREST, fontWeight: 500 }}
              >
                A quiet confidence,<br />
                <em style={{ fontStyle: "italic", color: GOLD }}>beautifully worn.</em>
              </h2>
              <Ornament className="mt-8" align="left" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="md:col-span-7"
            >
              <p
                className="text-lg leading-relaxed md:text-xl"
                style={{ color: INK, fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                Gagan Milano is a premium women's fashion label born of the UAE —
                a house devoted to timeless elegance and thoughtful design.
              </p>
              <p
                className="mt-6 leading-relaxed"
                style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                Each collection is curated with attention to fabric, silhouette and
                finish — combining the discipline of traditional craftsmanship with
                the ease of contemporary style. From festive occasions to everyday
                grace, our pieces are made for women who choose quality over
                trend, and presence over noise.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  { icon: Crown, label: "Premium Quality", copy: "Finest fabrics, meticulous finishing." },
                  { icon: Sparkles, label: "Timeless Design", copy: "Silhouettes made to outlast trends." },
                  { icon: Globe2, label: "Crafted for the UAE", copy: "Global sensibility, regional soul." },
                ].map((v) => (
                  <div
                    key={v.label}
                    className="rounded-md p-5"
                    style={{ background: IVORY, border: `1px solid ${BORDER}` }}
                  >
                    <v.icon className="h-5 w-5" style={{ color: GOLD }} strokeWidth={1.5} />
                    <div
                      className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: FOREST, fontFamily: "'Inter', sans-serif" }}
                    >
                      {v.label}
                    </div>
                    <p
                      className="mt-2 text-[0.85rem] leading-relaxed"
                      style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif" }}
                    >
                      {v.copy}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="relative">
        <div className="container-page py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span
              className="text-[0.68rem] font-semibold uppercase tracking-[0.32em]"
              style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
            >
              — Collections
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl" style={{ color: FOREST, fontWeight: 500 }}>
              A preview of the house
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
              style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Three editorial directions defining the season — an early glimpse of what awaits.
            </p>
            <Ornament className="mx-auto mt-8" />
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Festive Elegance",
                subtitle: "Occasion Wear",
                gradient: `linear-gradient(160deg, #6B1D2A 0%, #8B2A3A 45%, ${GOLD_SOFT} 100%)`,
                accent: "Silks · Zardozi · Heritage",
              },
              {
                title: "Contemporary Ethnic",
                subtitle: "Modern Heritage",
                gradient: `linear-gradient(160deg, ${FOREST_DEEP} 0%, ${FOREST} 55%, ${GOLD_SOFT} 100%)`,
                accent: "Silhouette · Drape · Detail",
              },
              {
                title: "Everyday Grace",
                subtitle: "Refined Essentials",
                gradient: `linear-gradient(160deg, ${CREAM_DEEP} 0%, #C9A87A 55%, ${FOREST} 100%)`,
                accent: "Linen · Cotton · Ease",
              },
            ].map((c, i) => (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-sm"
                style={{ border: `1px solid ${BORDER}` }}
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{ background: c.gradient }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30 transition-transform duration-[1400ms] group-hover:scale-110"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35) 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-end p-8">
                    <div>
                      <div
                        className="text-[0.62rem] font-semibold uppercase tracking-[0.3em]"
                        style={{ color: GOLD_SOFT, fontFamily: "'Inter', sans-serif" }}
                      >
                        {c.subtitle}
                      </div>
                      <h3
                        className="mt-2 text-3xl leading-tight"
                        style={{ color: IVORY, fontWeight: 500 }}
                      >
                        {c.title}
                      </h3>
                    </div>
                  </div>
                  {/* corner ornament */}
                  <div className="absolute right-6 top-6 flex items-center gap-1.5 opacity-80">
                    <span className="h-px w-6" style={{ background: GOLD_SOFT }} />
                    <span className="h-1.5 w-1.5 rotate-45" style={{ background: GOLD_SOFT }} />
                  </div>
                </div>
                <div className="p-5" style={{ background: IVORY_SOFT }}>
                  <div
                    className="text-[0.72rem] font-medium uppercase tracking-[0.24em]"
                    style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif" }}
                  >
                    {c.accent}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <p
            className="mt-10 text-center text-xs uppercase tracking-[0.28em]"
            style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif" }}
          >
            Editorial preview · Not for sale on this site
          </p>
        </div>
      </section>

      {/* SOFT LAUNCH */}
      <section style={{ background: FOREST, color: IVORY }} className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(${GOLD_SOFT} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-page relative py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span
              className="text-[0.68rem] font-semibold uppercase tracking-[0.32em]"
              style={{ color: GOLD_SOFT, fontFamily: "'Inter', sans-serif" }}
            >
              — A Soft Launch
            </span>
            <h2 className="mt-5 text-4xl md:text-5xl" style={{ color: IVORY, fontWeight: 500 }}>
              The house opens its doors,<br />
              <em style={{ fontStyle: "italic", color: GOLD_SOFT }}>gently.</em>
            </h2>
            <p
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(247,241,230,0.75)", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Our official Gagan Milano experience is being prepared with the same
              care we bring to every seam. In the meantime, we are introducing the
              label quietly — collection by collection — through select channels.
              The complete world of Gagan Milano launches here soon.
            </p>
            <OrnamentLight className="mx-auto mt-10" />
          </motion.div>
        </div>
      </section>

      {/* NOON UAE */}
      <section style={{ background: IVORY_SOFT }}>
        <div className="container-page py-20 md:py-28">
          <div
            className="mx-auto max-w-4xl rounded-sm px-8 py-16 text-center md:px-16 md:py-20"
            style={{
              background: IVORY,
              border: `1px solid ${GOLD}55`,
              boxShadow: "0 30px 80px -40px rgba(31,58,43,0.25)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.32em]"
                style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
              >
                — Available Now
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl" style={{ color: FOREST, fontWeight: 500 }}>
                Discover Gagan Milano <em style={{ fontStyle: "italic", color: GOLD }}>on Noon UAE</em>
              </h2>
              <p
                className="mx-auto mt-6 max-w-xl leading-relaxed"
                style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                While our official website prepares for its full launch, authentic
                Gagan Milano pieces are already available on Noon UAE — a curated
                first look at the house, delivered across the Emirates.
              </p>

              <a
                href={NOON_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-3 rounded-full px-10 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.24em] transition-all hover:gap-4"
                style={{ background: FOREST, color: IVORY, fontFamily: "'Inter', sans-serif" }}
              >
                Shop on Noon UAE <ArrowUpRight className="h-4 w-4" />
              </a>

              <p
                className="mt-6 text-[0.7rem] uppercase tracking-[0.26em]"
                style={{ color: INK_SOFT, fontFamily: "'Inter', sans-serif" }}
              >
                Authentic · UAE-wide delivery
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: FOREST_DEEP, color: "rgba(247,241,230,0.7)" }}>
        <div className="container-page py-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              className="grid h-14 w-14 place-items-center overflow-hidden rounded-full"
              style={{ border: `1px solid ${GOLD}`, background: IVORY_SOFT }}
            >
              <img src={logoAsset} alt="Gagan Milano" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="text-lg tracking-[0.22em]" style={{ color: IVORY }}>
                GAGAN MILANO
              </div>
              <div
                className="mt-1 text-[0.62rem] uppercase tracking-[0.3em]"
                style={{ color: GOLD_SOFT, fontFamily: "'Inter', sans-serif" }}
              >
                By Eznaa Global Mart FZ LLC · UAE
              </div>
            </div>
            <div
              className="text-[0.7rem] uppercase tracking-[0.24em]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              © {new Date().getFullYear()} Gagan Milano · All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Ornament({ className = "", align = "center" }: { className?: string; align?: "center" | "left" }) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      style={{ justifyContent: align === "left" ? "flex-start" : "center" }}
    >
      <span className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: GOLD }} />
      <span className="h-px w-3" style={{ background: GOLD }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: GOLD }} />
      <span className="h-px w-14" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

function OrnamentLight({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${GOLD_SOFT})` }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: GOLD_SOFT }} />
      <span className="h-px w-14" style={{ background: `linear-gradient(to left, transparent, ${GOLD_SOFT})` }} />
    </div>
  );
}
