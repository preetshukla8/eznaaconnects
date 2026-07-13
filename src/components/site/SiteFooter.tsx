import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const EMAIL = "eznaaconnect@gmail.com";
const UAE_PHONE = "+971552365373";
const UAE_PHONE_2 = "+9715580671162";
const IN_PHONE = "+919799039611";

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
          <Logo />
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
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Our Offices</h4>
          <div className="space-y-5 text-sm text-foreground/80">
            <div>
              <div className="mb-2 font-display text-sm font-bold text-primary">UAE Operations</div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Dubai Business Bay, United Arab Emirates</li>
                <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href={`tel:${UAE_PHONE}`}>{UAE_PHONE}</a></li>
                <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href={`tel:${UAE_PHONE_2}`}>{UAE_PHONE_2}</a></li>
                <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href={`mailto:${EMAIL}`} className="break-all">{EMAIL}</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-2 font-display text-sm font-bold text-primary">India Operations</div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> 1439 Omaxe City Phase 2, Ajmer Road, Jaipur, India</li>
                <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href={`tel:${IN_PHONE}`}>{IN_PHONE}</a></li>
                <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href={`mailto:${EMAIL}`} className="break-all">{EMAIL}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Eznaa Connect Global Business Services UAE. All rights reserved.</p>
          <p>Licensed corporate service provider · UAE &amp; India</p>
        </div>
      </div>
    </footer>
  );
}
