import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { GrievancePortal } from "@/components/site/GrievancePortal";

const PHONE = "+971552365373";
const WA = "971552365373";
const EMAIL = "eznaaconnect@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Eznaa Connects | UAE Business Setup & Tax Advisors" },
      { name: "description", content: "Contact Eznaa Connects via phone, WhatsApp or email — or raise a grievance through our complaint portal." },
      { property: "og:title", content: "Contact — Eznaa Connects" },
      { property: "og:description", content: "Talk to a senior UAE business advisor or raise a formal grievance." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="section-band">
        <div className="container-page section">
          <p className="eyebrow-gold">Contact</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Talk to a senior advisor — or raise a grievance.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Reach us directly on phone, WhatsApp or email. Existing clients can raise a formal complaint through our grievance portal and track it with a unique ID.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <ContactRow icon={Phone} title="Call us" desc="Sun–Thu, 9:00 – 18:00 GST" href={`tel:${PHONE}`} linkText={PHONE} />
            <ContactRow icon={MessageCircle} title="WhatsApp" desc="Fastest response, all days" href={`https://wa.me/${WA}`} linkText={PHONE} />
            <ContactRow icon={Mail} title="Email" desc="We reply within 1 business hour" href={`mailto:${EMAIL}`} linkText={EMAIL} />
          </div>

          <div>
            <GrievancePortal />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon: Icon, title, desc, href, linkText }: { icon: typeof Phone; title: string; desc: string; href?: string; linkText: string }) {
  return (
    <div className="card-soft flex items-start gap-4 p-5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><Icon className="h-5 w-5" /></div>
      <div className="flex-1">
        <div className="font-display text-base font-bold text-primary">{title}</div>
        <p className="text-xs text-muted-foreground">{desc}</p>
        {href ? (
          <a href={href} className="mt-1 inline-block text-sm font-semibold text-primary hover:text-gold break-all">{linkText}</a>
        ) : (
          <p className="mt-1 text-sm font-semibold text-primary">{linkText}</p>
        )}
      </div>
    </div>
  );
}
