import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

const PHONE = "+971552365373";
const EMAIL = "eznaaglobalmart@gmail.com";

const COL_SERVICES = [
  { to: "/services/company-setup", label: "Company Setup" },
  { to: "/services/visa-services", label: "Visa Services" },
  { to: "/services/tax-vat-ct", label: "VAT & Corporate Tax" },
  { to: "/services/accounting-compliance", label: "Accounting & Compliance" },
];
const COL_COMPANY = [
  { to: "/about", label: "About Us" },
  { to: "/services", label: "All Services" },
  { to: "/contact", label: "Contact / Grievance" },
  { to: "/profile", label: "My Account" },
];

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-surface-deep">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground font-display text-lg">E</span>
            <span className="font-display text-base font-bold text-primary">Eznaa Connects</span>
          </div>
          <p className="text-sm text-muted-foreground">
            End-to-end business setup, visa, tax and compliance services across the UAE — Mainland, Freezones and Offshore.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Services</h4>
          <ul className="space-y-2 text-sm">
            {COL_SERVICES.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-foreground/80 hover:text-primary">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Company</h4>
          <ul className="space-y-2 text-sm">
            {COL_COMPANY.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-foreground/80 hover:text-primary">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Get in touch</h4>
          <ul className="space-y-2.5 text-sm text-foreground/80">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-gold" /> <a href={`tel:${PHONE}`}>{PHONE}</a></li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-gold" /> <a href={`mailto:${EMAIL}`} className="break-all">{EMAIL}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> UAE</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Eznaa Connects Business Solutions. All rights reserved.</p>
          <p>Licensed corporate service provider · UAE</p>
        </div>
      </div>
    </footer>
  );
}
