# Eznaa Connect

A marketing and lead-generation website for **Eznaa Connect Global Business Services UAE** — a corporate advisory firm offering company formation, visa, tax, and compliance services across the Emirates. The site's single job is to capture qualified enquiries through a calm, formal, senior-advisor brand voice.

---

## Tech Stack

- **Framework:** TanStack Start v1 (React 19 + Vite 7), file-based routing
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` tokens) + shadcn-style primitives
- **Icons:** lucide-react
- **State / data:** TanStack Query
- **Runtime:** Bun
- **Hosting:** Cloudflare Workers (via Lovable)
- **Fonts:** Libre Baskerville (display) + Inter (body)

---

## How It Works

The site is organised around four reinforcing lead surfaces:

1. **Hero lead form** on the home page — the primary conversion surface.
2. **Per-service pages** — each service line has its own route with a sticky enquiry form and a "Learn more" dialog containing the detailed scope plus a WhatsApp deep-link CTA (no public pricing).
3. **Floating contact dock** — persistent WhatsApp + Call buttons on every page.
4. **Header CTA + dedicated contact page** — "Free Consultation" button and full contact channels.

A lightweight lead profile is stored in `localStorage` so returning visitors keep their details, can view their grievances, and edit their profile from the account menu.

### Service lines

- **Company Setup** — Mainland, Freezone, Offshore
- **Visa Services** — Investor, Employee, Family, Golden Visa
- **Tax** — VAT, Corporate Tax, Customs
- **Accounting & Compliance** — Bookkeeping, Audit, AML / UBO / ESR

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
  routes/                              File-based routes (do NOT edit routeTree.gen.ts)
    __root.tsx                         App shell — html/head/body, providers
    index.tsx                          Home
    about.tsx
    contact.tsx
    services.tsx                       Services overview
    services.company-setup.tsx
    services.visa-services.tsx
    services.tax-vat-ct.tsx
    services.accounting-compliance.tsx
    profile.tsx
  components/site/                     Header, footer, logo, lead modal, service blocks, floating dock
  lib/                                 Lead profile store, utilities
  assets/                              Logo and imagery
  styles.css                           Tailwind v4 theme tokens & custom utilities
docs/PRD.md                            Full product requirements
```

File-based routing: every `.tsx` file in `src/routes/` is a route. `routeTree.gen.ts` is auto-generated — never edit it by hand. Design tokens live in `src/styles.css`; components consume them through semantic utilities (`bg-primary`, `text-gold`, `btn-gold`, `card-soft`) rather than hardcoded colors.

---

## License

© Eznaa Connect Global Business Services UAE. All rights reserved.
