import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eznaa Global Mart FZ-LLC | UAE Holding Group" },
      {
        name: "description",
        content:
          "Eznaa Global Mart FZ-LLC — a UAE-based holding group operating across Business Consultancy and Fashion & Apparel.",
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

function ParentGateway() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/70">
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">
              E
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[1rem] font-bold text-primary md:text-[1.1rem]">
                Eznaa Global Mart FZ-LLC
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground md:text-[0.66rem]">
                Parent Company · UAE
              </span>
            </div>
          </div>
          <span className="hidden text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground md:inline">
            Select a division
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="container-page w-full py-10 md:py-16">
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
            <p className="eyebrow-gold justify-center">Our Divisions</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
              Where would you like to go?
            </h1>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
            {/* Card 1 - Consultancy */}
            <Link
              to="/consultancy"
              className="card-soft group relative flex flex-col overflow-hidden p-8 transition-all hover:-translate-y-0.5 hover:shadow-lift md:p-10"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-primary md:text-3xl">
                Business Consultancy Services
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Business setup, corporate advisory, compliance and strategic consulting.
              </p>
              <span className="btn-primary mt-8 w-fit">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Card 2 - Fashion */}
            <Link
              to="/fashion"
              className="card-soft group relative flex flex-col overflow-hidden p-8 transition-all hover:-translate-y-0.5 hover:shadow-lift md:p-10"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[color:var(--color-gold)]/15 text-[color:oklch(0.55_0.11_80)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-primary md:text-3xl">
                Fashion & Apparel
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Premium fashion and lifestyle division.
              </p>
              <span className="btn-gold mt-8 w-fit">
                Coming Soon <ArrowRight className="h-4 w-4" />
              </span>
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
