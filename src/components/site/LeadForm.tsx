import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

const SERVICES = [
  "Company Setup — Mainland",
  "Company Setup — Freezone",
  "Company Setup — Offshore",
  "Visa Services",
  "VAT Registration & Filing",
  "Corporate Tax (CT)",
  "Accounting & Audit",
  "AML / UBO / ESR Compliance",
  "Other / Not sure yet",
];

type Props = {
  variant?: "card" | "inline";
  defaultService?: string;
  title?: string;
  subtitle?: string;
};

export function LeadForm({ variant = "card", defaultService, title = "Get a free consultation", subtitle = "Our advisor will reach out within 1 business hour." }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setSubmitting(true);
    try {
      // Stored locally for now — wire to backend later.
      const queue = JSON.parse(localStorage.getItem("eznaa_leads") || "[]");
      queue.push({ ...payload, ts: new Date().toISOString() });
      localStorage.setItem("eznaa_leads", JSON.stringify(queue));
      await new Promise((r) => setTimeout(r, 600));
      setDone(true);
      toast.success("Thanks — we'll be in touch shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className={variant === "card" ? "card-soft p-7" : ""}>
        <div className="flex flex-col items-center text-center gap-3 py-6">
          <CheckCircle2 className="h-10 w-10 text-gold" />
          <h3 className="text-xl font-semibold text-primary">Request received</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Our consultant will contact you shortly. For urgent queries, call +971 4 000 0000 or message us on WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  const wrap = variant === "card" ? "card-soft p-6 md:p-7" : "";

  return (
    <form onSubmit={onSubmit} className={wrap}>
      {variant === "card" && (
        <div className="mb-5">
          <p className="eyebrow-gold">Free · No obligation</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-primary">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      )}

      <div className="grid gap-3">
        <Field name="name" label="Full name" placeholder="John Smith" required />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field name="email" type="email" label="Email" placeholder="you@company.com" required />
          <Field name="phone" type="tel" label="Phone / WhatsApp" placeholder="+971 50 000 0000" required />
        </div>
        <SelectField name="service" label="Service interested in" defaultValue={defaultService} options={SERVICES} />
        <TextareaField name="message" label="Tell us briefly" placeholder="Activity, jurisdiction preference, timeline…" rows={3} />
      </div>

      <button type="submit" disabled={submitting} className="btn-gold mt-5 w-full">
        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Request callback"}
      </button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        By submitting, you agree to be contacted by Eznaa Connects regarding your enquiry.
      </p>
    </form>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 rounded-md border border-input bg-card px-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}
function SelectField({ label, name, options, defaultValue }: { label: string; name: string; options: string[]; defaultValue?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="h-11 rounded-md border border-input bg-card px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
      >
        <option value="" disabled>Select a service…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function TextareaField({ label, name, placeholder, rows = 3 }: { label: string; name: string; placeholder?: string; rows?: number }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="rounded-md border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}
