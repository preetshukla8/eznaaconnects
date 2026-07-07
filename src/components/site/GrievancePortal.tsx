import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2, Clock, FileWarning, Loader2, Mail, MessageCircle, Phone, Search, UserCheck } from "lucide-react";
import { useLeadProfile, type Grievance } from "@/lib/lead-profile";
import { Link } from "@tanstack/react-router";
import { PhoneInput } from "./PhoneInput";
import { SuccessDialog } from "./SuccessDialog";

const CATEGORIES = [
  "Service delivery delay",
  "Billing / pricing dispute",
  "Document handling",
  "Advisor communication",
  "Compliance / regulatory issue",
  "Refund request",
  "Other",
];

const WA_SUPPORT = "https://wa.me/971552365373?text=" + encodeURIComponent("Hi Eznaa Connects, I need help with my grievance.");

export function GrievancePortal() {
  const { profile, addGrievance, findGrievance } = useLeadProfile();
  const [tab, setTab] = useState<"raise" | "track">("raise");
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<Grievance | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [tracked, setTracked] = useState<Grievance | null | undefined>(undefined);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const g = addGrievance({
      subject: String(fd.get("subject") || ""),
      category: String(fd.get("category") || "Other"),
      description: String(fd.get("description") || ""),
      contactPhone: String(fd.get("phone") || profile?.phone || ""),
    });
    setCreated(g);
    setSuccessOpen(true);
    setSubmitting(false);
    toast.success(`Grievance ${g.id} raised`);
  }

  function onTrack(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = trackId.trim();
    if (!id) return;
    setTracked(findGrievance(id) ?? null);
  }

  return (
    <div className="space-y-4">
      <div className="card-soft p-6 md:p-7 animate-fade-in">
        <div className="flex items-center gap-2">
          <FileWarning className="h-5 w-5 text-gold" />
          <p className="eyebrow-gold">Grievance Portal</p>
        </div>
        <h3 className="mt-1 font-display text-2xl font-bold text-primary">Raise or track a complaint</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Every grievance gets a unique ID. Typical Response: Within 24 Business Hours.
        </p>

        <div className="mt-5 inline-flex rounded-lg border border-border bg-secondary p-1">
          <button onClick={() => { setTab("raise"); setCreated(null); }} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${tab === "raise" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}>
            Raise a grievance
          </button>
          <button onClick={() => { setTab("track"); setTracked(undefined); }} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${tab === "track" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}>
            Track grievance
          </button>
        </div>

        {tab === "raise" && (
          <form onSubmit={onSubmit} className="mt-5 grid gap-3 animate-fade-in">
            {!profile && (
              <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                Tip: sign in first so this grievance is saved to your profile.
              </p>
            )}
            <Field name="subject" label="Subject" required placeholder="Short summary of the issue" />
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Category</span>
              <select name="category" required defaultValue="" className="h-11 rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30">
                <option value="" disabled>Select a category…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Contact number</span>
              <PhoneInput name="phone" defaultValue={profile?.phone} placeholder="55 236 5373" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Describe the issue</span>
              <textarea name="description" required rows={4} placeholder="Dates, advisor name, what went wrong…" className="rounded-md border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" />
            </label>
            <button type="submit" disabled={submitting} className="btn-gold mt-1 transition-transform hover:scale-[1.01]">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Submit grievance"}
            </button>
          </form>
        )}

        {tab === "track" && (
          <div className="mt-5 animate-fade-in">
            <form onSubmit={onTrack} className="flex gap-2">
              <input
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="Enter grievance ID e.g. EZN-123456"
                className="h-11 flex-1 rounded-md border border-input bg-card px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
              <button type="submit" className="btn-primary"><Search className="h-4 w-4" /> Track</button>
            </form>

            {tracked === null && (
              <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                No grievance found with that ID on this device.
              </p>
            )}
            {tracked && <GrievanceCard g={tracked} />}
          </div>
        )}
      </div>

      {/* Not satisfactory? WhatsApp support */}
      <div className="card-soft flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <p className="font-display text-sm font-bold text-primary">Need Help? Not satisfactory?</p>
          <p className="text-xs text-muted-foreground">Chat with our support team directly on WhatsApp.</p>
        </div>
        <a
          href={WA_SUPPORT}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" /> Contact us on WhatsApp
        </a>
      </div>

      <SuccessDialog
        open={successOpen && !!created}
        onClose={() => { setSuccessOpen(false); if (created) { setTab("track"); setTrackId(created.id); } }}
        title="Grievance recorded"
        description="Save this reference ID. Our team will contact you within 24 business hours."
        primaryLabel="Track this grievance"
      >
        {created && (
          <div className="rounded-xl border border-gold/30 bg-gold/5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Reference ID</p>
            <p className="mt-1 font-display text-3xl font-bold tracking-wider text-primary">{created.id}</p>
            <p className="mx-auto mt-2 max-w-sm text-xs text-muted-foreground">
              Also visible in your{" "}
              <Link to="/profile" hash="grievances" className="font-semibold text-primary underline">profile</Link>.
            </p>
          </div>
        )}
      </SuccessDialog>
    </div>
  );
}

export function GrievanceCard({ g }: { g: Grievance }) {
  const tone =
    g.status === "Resolved" ? "bg-green-100 text-green-800" :
    g.status === "In Review" ? "bg-amber-100 text-amber-800" :
    "bg-blue-100 text-blue-800";
  const latest = g.latestRemark ?? g.updates[g.updates.length - 1]?.note;
  return (
    <div className="mt-4 rounded-xl border border-border bg-card p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold text-primary">{g.subject}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{g.category} · {new Date(g.createdAt).toLocaleString()}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tone}`}>{g.status}</span>
      </div>
      <p className="mt-2 text-[11px] font-semibold tracking-wider text-gold">{g.id}</p>
      <p className="mt-3 text-sm text-foreground/80">{g.description}</p>

      {/* Case details grid */}
      <div className="mt-4 grid gap-3 rounded-lg border border-border bg-secondary/40 p-4 sm:grid-cols-2">
        <DetailRow icon={CheckCircle2} label="Current status" value={g.status} />
        <DetailRow icon={Clock} label="Estimated resolution" value={g.eta ?? "Within 24 business hours"} />
        {g.assignedExecutive && (
          <>
            <DetailRow icon={UserCheck} label="Assigned executive" value={g.assignedExecutive.name} />
            <DetailRow icon={Phone} label="Executive phone" value={g.assignedExecutive.phone} href={`tel:${g.assignedExecutive.phone.replace(/\s+/g, "")}`} />
            <DetailRow icon={Mail} label="Executive email" value={g.assignedExecutive.email} href={`mailto:${g.assignedExecutive.email}`} />
          </>
        )}
        {latest && (
          <div className="sm:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Latest remarks</p>
            <p className="mt-1 text-sm text-foreground/85">{latest}</p>
          </div>
        )}
      </div>

      {g.updates.length > 0 && (
        <div className="mt-4 border-t border-border pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Update history</p>
          <ul className="mt-2 space-y-1.5">
            {g.updates.map((u, i) => (
              <li key={i} className="text-xs text-foreground/80">
                <span className="text-muted-foreground">{new Date(u.ts).toLocaleString()} —</span> {u.note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DetailRow({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} className="mt-0.5 block truncate text-sm font-semibold text-primary transition-colors hover:text-gold">{value}</a>
        ) : (
          <p className="mt-0.5 truncate text-sm font-semibold text-primary">{value}</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required, placeholder, defaultValue }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue}
        className="h-11 rounded-md border border-input bg-card px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" />
    </label>
  );
}
