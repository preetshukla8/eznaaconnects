# Eznaa Connects Business Solutions — Product Requirements Document (PRD)

**Document owner:** Founder / Product
**Status:** v1.0 — Initial website (lead-generation focused)
**Last updated:** 2026-06-18

---

## 1. Overview

**Eznaa Connects Business Solutions** is a UAE-based corporate advisory firm offering company formation, visa, tax and compliance services across the Emirates. Reference market positioning is inspired by Shuraa Business (`lp.shuraa.com`) — a high-converting, lead-capture-first marketing surface — but our brand voice is more formal, transparent and senior-advisor led.

This PRD scopes **v1 of the marketing website** whose primary purpose is **lead generation**, not transactional self-service.

---

## 2. Goals & Non-Goals

### Goals
1. **Capture qualified leads** for four service lines via a single, persistent enquiry path (hero form, sticky CTAs, per-service form, dedicated contact page).
2. **Communicate authority and formality** — formal palette, serif display headings, no marketing fluff.
3. **Educate prospects** on each service line clearly enough that they self-select the right enquiry path.
4. **Zero friction**: no signup, no login, no paywall, no popups blocking content.
5. **SEO-ready**: per-route metadata, sitemap, robots, semantic HTML, structured copy.

### Non-Goals (v1)
- No customer portal / dashboard.
- No payments or invoicing.
- No internal CRM (leads are written to localStorage in v1; backend wiring is v1.1).
- No multilingual (English only in v1; Arabic in v1.2).
- No blog/CMS (planned in v1.2).

---

## 3. Target Audience

| Segment | Need | Entry point |
|---|---|---|
| First-time founder relocating to UAE | Pick jurisdiction, get license + visa | Home / Company Setup |
| SME owner | VAT / Corporate Tax registration & filing | Tax page |
| Existing UAE company | Audit, AML/UBO/ESR, accounting | Compliance page |
| Family / investor | Golden Visa, family visa, holding structure | Visa / Offshore |

---

## 4. Brand & Design System

- **Brand name:** Eznaa Connects Business Solutions
- **Voice:** Formal, calm, plain-English. No hype words ("revolutionary", "AI-powered"). No emojis.
- **Palette (light theme):**
  - Background: warm off-white `oklch(0.992 0.004 95)`
  - Primary (deep navy): `oklch(0.28 0.07 255)`
  - Gold accent: `oklch(0.74 0.12 80)`
  - Muted slate: `oklch(0.48 0.025 250)`
- **Typography:** Libre Baskerville (display) + Inter (body).
- **Components:** Soft elevated cards, hairline dividers, gold accent for CTAs and stat highlights.
- **No dark mode in v1** (formal, daytime business context).

---

## 5. Information Architecture

```
/                           Home (hero lead form, services overview, process, stats, social proof, CTA)
/services                   Services overview
/services/company-setup     Mainland / Freezone / Offshore
/services/visa-services     Investor / Employee / Family / Golden
/services/tax-vat-ct        VAT + Corporate Tax
/services/accounting-compliance   Bookkeeping / Audit / AML / UBO / ESR
/about                      About / mission / values
/contact                    All contact channels + lead form
/sitemap.xml                Generated
/robots.txt                 Static
```

All routes ship with unique `<title>`, `meta description`, `og:title`, `og:description`.

---

## 6. Lead Capture (the core of v1)

The site is built around four reinforcing lead surfaces:

1. **Hero lead form** on `/` — primary conversion surface, immediately visible.
2. **Per-service lead form** — sticky on desktop, full-width on mobile, with the service pre-selected.
3. **Dedicated `/contact` page** — phone, WhatsApp, email, office, plus full form.
4. **Floating contact dock** — bottom-right WhatsApp + Call buttons, present on every page.
5. **CTA bands** — interleaved between sections ("Book consultation" / "WhatsApp us").
6. **Top-bar CTA** — "Free Consultation" gold button + phone number in header.

### Lead Form Fields (v1)
- Full name *(required)*
- Email *(required)*
- Phone / WhatsApp *(required)*
- Service interested in *(select; pre-filled on service pages)*
- Free-text message *(optional)*

### Submission behaviour (v1)
- Client-side validation only.
- Stored in `localStorage` under `eznaa_leads`.
- Toast confirmation + inline success state.

### Submission behaviour (v1.1 — backend)
- POST to a TanStack server function → Lovable Cloud table `leads`.
- Auto-email notification to sales inbox via Resend.
- Slack/Telegram webhook for new-lead alert.
- Anti-spam: honeypot field + simple rate-limit by IP.

---

## 7. Page Specs

### 7.1 Home (`/`)
- Hero: H1, supporting paragraph, gold CTA, secondary outline CTA, social-proof avatars + 4.9★ rating.
- Hero-side lead form (card).
- Trust strip: licensed agent, fast turnaround, full coverage, transparent pricing.
- Services grid (4 cards linking to service pages).
- Four-step "How it works" process.
- Stats band: 5,000+ businesses, 50+ freezones, 98% retention, 1hr response.
- "Why Eznaa" 4-point list + testimonial card.
- Closing CTA band.

### 7.2 Service pages
Shared `ServicePageTemplate` with:
- Eyebrow + H1 + intro + dual CTAs (anchor to form + tel link).
- Sticky lead form on right (desktop).
- Four content cards (e.g. Mainland / Freezone / Offshore / What's included).
- CTA band footer.

### 7.3 `/services`
Overview + grid + secondary "not sure?" lead form + CTA band.

### 7.4 `/about`
Mission, four values (senior-led, transparent pricing, full coverage, long-term partner), CTA band.

### 7.5 `/contact`
Channel grid (call, WhatsApp, email, office, hours) + full lead form.

---

## 8. Technical Stack

- **Framework:** TanStack Start v1 (React 19 + Vite 7), file-based routing.
- **Styling:** Tailwind v4 (CSS-first, `@theme` tokens) + shadcn-style primitives.
- **State / data:** TanStack Query (ready for v1.1 backend wiring).
- **Hosting:** Cloudflare Workers via Lovable.
- **Fonts:** Google Fonts (`Libre Baskerville`, `Inter`) loaded via `<link>` in `__root.tsx`.
- **Icons:** lucide-react.

### Code conventions
- All design tokens live in `src/styles.css` under `@theme inline` / `:root`.
- No hardcoded color utilities in JSX (`text-white`, `bg-[#...]`) — use semantic tokens (`bg-primary`, `text-gold`).
- Custom utilities (`btn-primary`, `btn-gold`, `card-soft`, `section`, `container-page`) defined via `@utility`.

---

## 9. SEO & Performance

- Per-route `head()` with title (<60 chars) + description (<160 chars) + OG/Twitter tags.
- Single H1 per route, semantic HTML.
- Auto-generated `/sitemap.xml` + static `/robots.txt`.
- Lazy-loaded images (none required in v1 — illustration-free, palette-driven).
- Target Lighthouse: ≥95 across the board on desktop, ≥90 on mobile.

---

## 10. Roadmap

| Version | Scope |
|---|---|
| **v1.0 (this build)** | Marketing site, lead forms (localStorage), 8 routes, full design system. |
| **v1.1** | Lovable Cloud `leads` table + server function, email + Slack notifications, anti-spam, basic admin lead-list. |
| **v1.2** | Blog/CMS (jurisdictions, FTA updates), Arabic locale, case studies, partner logos. |
| **v1.3** | Online cost-estimator quizzes per service, calendly embed for senior advisors, payment-ready proposals. |
| **v2.0** | Client portal (post-sale): document upload, license status, visa tracker, VAT/CT filing calendar. |

---

## 11. Open Questions

1. Final brand phone numbers, WhatsApp number, office address — placeholders used.
2. Logo direction — currently typographic "E" mark; do we commission a custom mark?
3. Notification routing — single sales inbox vs round-robin to advisors?
4. Pricing transparency — publish indicative ranges per jurisdiction, or keep "Get a quote" only?

---

*End of PRD.*
