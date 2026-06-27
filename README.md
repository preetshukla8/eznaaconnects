# Eznaa Connect — Global Business Services UAE

Marketing and lead-generation website for **Eznaa Connect Global Business Services**, a UAE-based corporate advisory firm offering company formation, visa, tax, and compliance services across the Emirates, with operations in the UAE and India.

> Built with [Lovable](https://lovable.dev) — two-way GitHub sync is enabled, so commits here flow back into the Lovable editor and vice versa.

---

## PRD Summary

The site is the v1 marketing surface for Eznaa Connect. Its single job is to **capture qualified leads** for four service lines through a calm, formal, senior-advisor brand voice — explicitly avoiding hype, popups that block content, and self-service complexity.

**Scope (v1):**
- 8 routes: Home, Services overview, 4 service detail pages (Company Setup, Visa Services, VAT & Corporate Tax, Accounting & Compliance), About, Contact.
- Multiple reinforcing lead surfaces: hero form, per-service sticky form, dedicated contact page, floating WhatsApp/Call dock, header "Free Consultation" CTA, interleaved CTA bands.
- Service detail dialogs with WhatsApp deep-link CTA (no public pricing).
- Account/profile page and grievance portal.
- Multi-office footer (UAE + India operations with full contact details).
- Lead capture accepts international phone numbers with country codes.

**Out of scope (v1):** customer portal, payments, internal CRM (leads go to `localStorage` for now), multilingual, blog/CMS.

Full PRD: [`docs/PRD.md`](docs/PRD.md).

---

## Product Goals

1. **Convert** — make enquiry the path of least resistance from every page, on every device.
2. **Communicate authority** — formal palette (deep navy + gold), serif display type, plain-English copy; no marketing fluff.
3. **Educate prospects** — each service line is explained well enough that visitors self-select the right enquiry.
4. **Zero friction** — no signup, no login, no paywall, no blocking popups.
5. **SEO-ready** — per-route metadata, semantic HTML, sitemap + robots, target Lighthouse ≥95 desktop / ≥90 mobile.
6. **Reachable globally** — UAE + India contact channels, WhatsApp-first, international phone input.

### Service lines covered
- **Company Setup** — Mainland, Freezone, Offshore.
- **Visa Services** — Investor, Employee, Family, Golden Visa.
- **Tax** — VAT registration & filing, Corporate Tax, Customs registration & linking.
- **Accounting & Compliance** — Bookkeeping, Audit, AML / UBO / ESR.

---

## Tech Stack

- **Framework:** TanStack Start v1 (React 19 + Vite 7), file-based routing
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` tokens) + shadcn-style primitives
- **Icons:** lucide-react
- **State:** TanStack Query (ready for backend wiring in v1.1)
- **Runtime:** Bun
- **Hosting:** Cloudflare Workers (via Lovable)
- **Fonts:** Libre Baskerville (display) + Inter (body)

---

## Getting Started

Prerequisites: [Bun](https://bun.sh) installed.

```bash
bun install
bun dev        # start the dev server
bun run build  # production build
```

---

## Project Structure

```
src/
  routes/              File-based routes (do NOT edit routeTree.gen.ts)
    __root.tsx         App shell (html/head/body, providers)
    index.tsx          Home
    about.tsx
    contact.tsx
    services.tsx
    services.company-setup.tsx
    services.visa-services.tsx
    services.tax-vat-ct.tsx
    services.accounting-compliance.tsx
    profile.tsx
  components/site/     Header, footer, logo, lead modal, services, etc.
  lib/                 Lead profile store, utilities
  assets/              Logo and imagery
  styles.css           Tailwind v4 theme tokens
docs/PRD.md            Full product requirements
```

---

## Contact

- **UAE Operations** — Dubai Business Bay
  - +971 55 236 5373
  - +971 558 667 1162
- **India Operations** — 1439 Omaxe City Phase 2, Ajmer Road, Jaipur
  - +91 97990 39611
- **Email** — eznaaconnect@gmail.com

---

## License

© Eznaa Connect Global Business Services UAE. All rights reserved.
