import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2, FileWarning, Loader2, Search } from "lucide-react";
import { useLeadProfile, type Grievance } from "@/lib/lead-profile";
import { Link } from "@tanstack/react-router";

const CATEGORIES = [
  "Service delivery delay",
  "Billing / pricing dispute",
  "Document handling",
  "Advisor communication",
  "Compliance / regulatory issue",
  "Refund request",
  "Other",
];

export function GrievancePortal() {
  const { profile, addGrievance, findGrievance } = useLeadProfile();
  const [tab, setTab] = useState<"raise" | "track">("raise");
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<Grievance | null>(null);
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
    <div className="card-soft p-6 md:p-7">
      <div className="flex items-center gap-2">
        <FileWarning className="h-5 w-5 text-gold" />
        <p className="eyebrow-gold">Grievance Portal</p>
      </div>
      <h3 className="mt-1 font-display text-2xl font-bold text-primary">Raise or track a complaint</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Every grievance gets a unique ID and a written response within 24 hours.
      </p>

      <div className="mt-5 inline-flex rounded-lg border border-border bg-secondary p-1">
        <button onClick={() => { setTab("raise"); setCreated(null); }} className={`px-3 py-1.5 text-xs font-semibold rounded-md ${tab === "raise" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}>
          Raise a grievance
        </button>
        <button onClick={() => { setTab("track"); setTracked(undefined); }} className={`px-3 py-1.5 text-xs font-semibold rounded-md ${tab === "track" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}>
          Track grievance
        </button>
      </div>

      {tab === "raise" && (
        created ? (
          <div className="mt-5 rounded-xl border border-gold/30 bg-gold/5 p-5 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
            <h4 className="mt-3 font-display text-lg font-bold text-primary">Grievance recorded</h4>
            <p className="mt-1 text-xs text-muted-foreground">Your reference ID</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-wider text-primary">{created.id}</p>
            <p className="mx-auto mt-3 max-w-sm text-xs text-muted-foreground">
              Save this ID. Our team will reach out within 24 hours. You can also view all grievances in your{" "}
              <Link to="/profile" hash="grievances" className="font-semibold text-primary underline">profile</Link>.
            </p>
            <button onClick={() => { setCreated(null); setTab("track"); setTrackId(created.id); }} className="btn-outline mt-4 text-xs h-9">Track this grievance</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 grid gap-3">
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
            <Field name="phone" type="tel" label="Contact number (include country code)" defaultValue={profile?.phone} placeholder="+44 7700 900000" />
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Describe the issue</span>
              <textarea name="description" required rows={4} placeholder="Dates, advisor name, what went wrong…" className="rounded-md border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" />
            </label>
            <button type="submit" disabled={submitting} className="btn-gold mt-1">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Submit grievance"}
            </button>
          </form>
        )
      )}

      {tab === "track" && (
        <div className="mt-5">
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
  );
}

export function GrievanceCard({ g }: { g: Grievance }) {
  const tone =
    g.status === "Resolved" ? "bg-green-100 text-green-800" :
    g.status === "In Review" ? "bg-amber-100 text-amber-800" :
    "bg-blue-100 text-blue-800";
  return (
    <div className="mt-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold text-primary">{g.subject}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{g.category} · {new Date(g.createdAt).toLocaleString()}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tone}`}>{g.status}</span>
      </div>
      <p className="mt-2 text-[11px] font-semibold tracking-wider text-gold">{g.id}</p>
      <p className="mt-3 text-sm text-foreground/80">{g.description}</p>
      {g.updates.length > 0 && (
        <div className="mt-4 border-t border-border pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Updates</p>
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

function Field({ label, name, type = "text", required, placeholder, defaultValue }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue}
        className="h-11 rounded-md border border-input bg-card px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" />
    </label>
  );
}
