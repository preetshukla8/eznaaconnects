import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ParentShell } from "@/components/parent/ParentShell";

export const Route = createFileRoute("/fashion")({
  head: () => ({
    meta: [
      { title: "Fashion & Apparel — Coming Soon | Eznaa Global Mart FZ-LLC" },
      {
        name: "description",
        content:
          "The Fashion & Apparel division of Eznaa Global Mart FZ-LLC is currently under development. A new lifestyle label is on the way.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Fashion & Apparel — Coming Soon" },
      { property: "og:description", content: "A new lifestyle label from the Eznaa group is on the way." },
    ],
  }),
  component: FashionComingSoon,
});

function FashionComingSoon() {
  return (
    <ParentShell>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#3a2a10_0%,transparent_70%)] opacity-70" />
          <div className="absolute bottom-0 left-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(closest-side,#c9a24c_0%,transparent_70%)] opacity-25" />
          <div className="absolute right-[-10%] top-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,#8a6a24_0%,transparent_70%)] opacity-20" />
        </div>

        <div className="container-page flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a24c]/40 bg-[#c9a24c]/10 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#e5c47a] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Division 02 · In Development
          </span>

          <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl lg:text-8xl">
            Fashion &{" "}
            <span className="bg-gradient-to-r from-[#c9a24c] via-[#e5c47a] to-[#c9a24c] bg-clip-text text-transparent">
              Apparel
            </span>
          </h1>

          <p className="mt-2 font-display text-lg italic text-white/50 md:text-xl">
            — coming soon —
          </p>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            A new lifestyle label from the Eznaa group is quietly in the making. Considered design, refined materials and contemporary silhouettes — currently under development by our team.
          </p>

          {/* Decorative divider */}
          <div className="mt-12 flex items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a24c]/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#c9a24c]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a24c]/60" />
          </div>

          <Link
            to="/"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Eznaa Global Mart
          </Link>
        </div>
      </section>
    </ParentShell>
  );
}
