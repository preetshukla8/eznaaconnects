import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/consultancy", label: "Business Consultancy", exact: false },
  { to: "/fashion", label: "Fashion & Apparel", exact: false },
] as const;

export function ParentHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all ${
        scrolled
          ? "border-white/10 bg-[#050914]/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#c9a24c] to-[#8a6a24] font-display text-lg font-bold text-[#050914] shadow-lg shadow-[#c9a24c]/20">
            E
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1rem] font-bold text-white md:text-[1.1rem]">
              Eznaa Global Mart
            </span>
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/50 md:text-[0.66rem]">
              FZ-LLC · Parent Company
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
              activeProps={{
                className:
                  "rounded-md px-3 py-2 text-sm font-semibold text-white bg-white/10",
              }}
              activeOptions={{ exact: item.exact }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/consultancy"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-[#c9a24c] to-[#e5c47a] px-5 py-2.5 text-sm font-semibold text-[#050914] shadow-lg shadow-[#c9a24c]/20 transition-transform hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#050914]/95 backdrop-blur-xl md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
                activeProps={{
                  className:
                    "rounded-md px-3 py-2.5 text-sm font-semibold text-white bg-white/10",
                }}
                activeOptions={{ exact: item.exact }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function ParentFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050914]">
      <div className="container-page py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#c9a24c] to-[#8a6a24] font-display text-lg font-bold text-[#050914]">
                E
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-bold text-white">
                  Eznaa Global Mart FZ-LLC
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                  Parent Company
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              A diversified holding company operating across professional services and lifestyle verticals from the United Arab Emirates.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
              Divisions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/consultancy" className="text-white/75 hover:text-white">
                  Business Consultancy
                </Link>
              </li>
              <li>
                <Link to="/fashion" className="text-white/75 hover:text-white">
                  Fashion & Apparel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/75 hover:text-white">
                  About the Group
                </Link>
              </li>
              <li>
                <Link to="/consultancy" className="text-white/75 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-xs text-white/40">
          © {new Date().getFullYear()} Eznaa Global Mart FZ-LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function ParentShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <ParentHeader />
      {children}
      <ParentFooter />
    </div>
  );
}
