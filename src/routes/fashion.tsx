import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/fashion")({
  head: () => ({
    meta: [
      { title: "Fashion & Apparel — Coming Soon | Eznaa Global Mart FZ-LLC" },
      {
        name: "description",
        content:
          "The Fashion & Apparel division of Eznaa Global Mart FZ-LLC is currently in development.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Fashion & Apparel — Coming Soon" },
      {
        property: "og:description",
        content: "A new premium lifestyle label from the Eznaa group is on the way.",
      },
    ],
  }),
  component: FashionComingSoon,
});

function FashionComingSoon() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/70">
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">
              E
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[1rem] font-bold text-primary md:text-[1.1rem]">
                Eznaa Global Mart FZ-LLC
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground md:text-[0.66rem]">
                Fashion & Apparel Division
              </span>
            </div>
          </Link>
          <Link to="/" className="btn-outline hidden md:inline-flex">
            <ArrowLeft className="h-4 w-4" /> Back to Group
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="container-page w-full py-16 text-center md:py-24">
          <div className="mx-auto max-w-2xl">
            <span className="eyebrow-gold justify-center">
              <Sparkles className="h-3.5 w-3.5" /> In Development
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-primary md:text-6xl">
              Fashion & Apparel
            </h1>
            <p className="mt-3 font-display text-lg italic text-muted-foreground md:text-xl">
              — coming soon —
            </p>

            <div className="mx-auto mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[color:var(--color-gold)]/70" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[color:var(--color-gold)]" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[color:var(--color-gold)]/70" />
            </div>

            <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              A new premium lifestyle label from the Eznaa group is quietly in the making —
              considered design, refined materials and contemporary silhouettes.
            </p>

            <Link to="/" className="btn-outline mt-10 inline-flex">
              <ArrowLeft className="h-4 w-4" /> Back to Eznaa Global Mart
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/70">
        <div className="container-page py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Eznaa Global Mart FZ-LLC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
