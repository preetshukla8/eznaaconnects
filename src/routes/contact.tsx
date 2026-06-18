import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/LeadForm";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Eznaa Connects | UAE Business Setup & Tax Advisors" },
      { name: "description", content: "Book a free consultation with a senior Eznaa Connects advisor. Phone, WhatsApp, email or visit our Business Bay office in Dubai." },
      { property: "og:title", content: "Contact — Eznaa Connects" },
      { property: "og:description", content: "Talk to a senior UAE business advisor. Free consultation, 1-hour response." },
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
            Talk to a senior advisor today.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Free, no-obligation consultation. We respond to every enquiry within 1 business hour.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            <ContactRow icon={Phone} title="Call us" desc="Sun–Thu, 9:00 – 18:00 GST" href="tel:+97140000000" linkText="+971 4 000 0000" />
            <ContactRow icon={MessageCircle} title="WhatsApp" desc="Fastest response, all days" href="https://wa.me/971500000000" linkText="+971 50 000 0000" />
            <ContactRow icon={Mail} title="Email" desc="We reply within 1 business hour" href="mailto:hello@eznaaconnects.ae" linkText="hello@eznaaconnects.ae" />
            <ContactRow icon={MapPin} title="Office" desc="Walk-ins by appointment" linkText="Business Bay, Dubai, UAE" />
            <ContactRow icon={Clock} title="Hours" desc="Closed Friday & Saturday" linkText="Sun – Thu · 9:00 – 18:00 GST" />
          </div>

          <div>
            <LeadForm />
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
          <a href={href} className="mt-1 inline-block text-sm font-semibold text-primary hover:text-gold">{linkText}</a>
        ) : (
          <p className="mt-1 text-sm font-semibold text-primary">{linkText}</p>
        )}
      </div>
    </div>
  );
}
