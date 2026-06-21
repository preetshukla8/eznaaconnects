import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { AccountMenu } from "./AccountMenu";
import { openConsultationChat } from "./ConsultationChat";
import eznaaLogo from "@/assets/eznaa-logo.png.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const PHONE = "+971552365373";

export function SiteHeader() {
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
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        scrolled ? "border-border bg-background/85 backdrop-blur" : "border-transparent bg-background"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <div className="flex items-center gap-3">
          <AccountMenu />
          <Link to="/" className="flex items-center gap-2.5" aria-label="Eznaa Connect — Global Business Services UAE">
            <img src={eznaaLogo.url} alt="Eznaa Connect — Global Business Services UAE" className="h-10 w-auto md:h-12" />
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <button type="button" onClick={openConsultationChat} className="btn-gold">Free Consultation</button>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "rounded-md px-3 py-2.5 text-sm font-semibold text-primary bg-secondary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a href={`tel:${PHONE}`} className="rounded-md px-3 py-2.5 text-sm font-semibold text-primary">
              Call {PHONE}
            </a>
            <button type="button" onClick={openConsultationChat} className="btn-gold mt-2">Free Consultation</button>
          </div>
        </div>
      )}
    </header>
  );
}
