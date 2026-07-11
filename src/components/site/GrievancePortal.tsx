import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2, Clock, FileWarning, Loader2, Mail, MessageCircle, Phone, Search, UserCheck } from "lucide-react";
import { useLeadProfile, type Grievance } from "@/lib/lead-profile";
import { Link } from "@tanstack/react-router";
import { getPayloadId, submitGrievance, trackGrievance } from "@/lib/api";
import { PhoneInput } from "./PhoneInput";
import { SuccessDialog } from "./SuccessDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

function mapBackendStatus(status: unknown): Grievance["status"] {
  const s = String(status || "").toLowerCase();
  if (s === "resolved" || s === "closed" || s === "complete" || s === "completed") return "Resolved";
  if (s === "in review" || s === "in progress" || s === "pending" || s === "processing" || s === "under review") return "In Review";
  return "Open";
}

function unwrapBackendPayload(data: Record<string, unknown>): Record<string, unknown> {
  const nested = data.data;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    return nested as Record<string, unknown>;
  }

  const grievance = data.grievance;
  if (grievance && typeof grievance === "object" && !Array.isArray(grievance)) {
    return grievance as Record<string, unknown>;
  }

  return data;
}

function mapBackendGrievance(id: string, data: Record<string, unknown>): Grievance {
  const payload = unwrapBackendPayload(data);
  const assignedTo = (payload.assignedTo ?? payload.assignedExecutive ?? payload.executiveName) as string | undefined;
  const executivePhone = (payload.executivePhone ?? payload.assignedExecutivePhone ?? payload.phone) as string | undefined;
  const executiveEmail = (payload.executiveEmail ?? payload.assignedExecutiveEmail ?? payload.email) as string | undefined;
  const rawId = (payload.grievanceId ?? payload.referenceId ?? payload.id ?? payload.trackingId ?? payload.reference_number ?? id) as string | undefined;

  return {
    id: rawId ? rawId.toUpperCase() : id.toUpperCase(),
    subject: (payload.subject ?? payload.title ?? payload.issue ?? `Grievance ${id.toUpperCase()}`) as string,
    category: (payload.category ?? payload.type ?? payload.issueType ?? "Tracking update") as string,
    description: (payload.description ?? payload.details ?? payload.message ?? payload.comment ?? "") as string,
    contactPhone: (payload.contactNumber ?? payload.contactPhone ?? payload.phone ?? payload.contact) as string | undefined,
    status: mapBackendStatus(payload.status ?? payload.currentStatus ?? payload.state ?? payload.grievanceStatus),
    createdAt: new Date().toISOString(),
    updates: [],
    assignedExecutive:
      assignedTo && executivePhone && executiveEmail
        ? { name: assignedTo, phone: executivePhone, email: executiveEmail }
        : undefined,
    eta: (payload.resolutionETA ?? payload.eta ?? payload.expectedResolution) as string | undefined,
    latestRemark: (payload.remarks ?? payload.latestRemark ?? payload.message ?? payload.note) as string | undefined,
  };
}


export function GrievancePortal() {
  const { profile, addGrievance, upsertGrievance, findGrievance } = useLeadProfile();
  const [tab, setTab] = useState<"raise" | "track">("raise");
  const [submitting, setSubmitting] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [created, setCreated] = useState<Grievance | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [tracked, setTracked] = useState<Grievance | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = String(fd.get("subject") || "").trim();
    const category = String(fd.get("category") || "Other").trim();
    const description = String(fd.get("description") || "").trim();
    const contactPhone = String(fd.get("phone") || profile?.phone || "").trim();

    setSubmitting(true);
    setError(null);

    try {
      const response = await submitGrievance({
        subject,
        category,
        description,
        contactPhone: contactPhone || undefined,
        name: profile?.name,
        email: profile?.email,
      });

      const referenceId = getPayloadId(response as never) || `${Date.now()}`;
      const g = addGrievance({
        id: referenceId,
        subject,
        category,
        description,
        contactPhone,
        status: "In Review",
        createdAt: new Date().toISOString(),
        latestRemark: response.message || "Grievance received and sent to our team.",
        updates: [{ ts: new Date().toISOString(), note: response.message || "Grievance received and sent to our team." }],
      });

      setCreated(g);
      setSuccessOpen(true);
      toast.success(response.message || `Grievance ${g.id} raised`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "We could not submit your grievance right now. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function onTrack(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = trackId.trim();
    if (!id) return;

    setTracking(true);
    setError(null);

    try {
      const response = await trackGrievance(id);
      console.log("RAW TRACK RESPONSE:", JSON.stringify(response, null, 2));

      const backendData = response as Record<string, unknown> | undefined;

      if (backendData) {
        const mapped = mapBackendGrievance(id, backendData);
        const synced = upsertGrievance({
          id: mapped.id,
          subject: mapped.subject,
          category: mapped.category,
          description: mapped.description,
          contactPhone: mapped.contactPhone,
          status: mapped.status,
          createdAt: mapped.createdAt,
          updates: mapped.updates,
          assignedExecutive: mapped.assignedExecutive,
          eta: mapped.eta,
          latestRemark: mapped.latestRemark,
        });
        setTracked(synced);
        toast.success(response.message || `Tracking request for ${synced.id} received.`);
      } else {
        const localMatch = findGrievance(id);
        setTracked(localMatch ?? null);
        if (!localMatch) toast.error("No grievance found with that ID.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "We could not look up that grievance right now.";
      const localMatch = findGrievance(id);
      setTracked(localMatch ?? null);
      setError(message);
      toast.error(message);
    } finally {
      setTracking(false);
    }
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
            {error && tab === "raise" && (
              <Alert variant="destructive" className="mt-1">
                <AlertTitle>We couldn’t submit that grievance</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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
              <button type="submit" disabled={tracking} className="btn-primary">
                {tracking ? <><Loader2 className="h-4 w-4 animate-spin" /> Checking…</> : <><Search className="h-4 w-4" /> Track</>}
              </button>
            </form>

            {error && tab === "track" && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>We couldn’t look up that grievance</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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
  return (
    <div className="mt-3 rounded-lg border border-border bg-card p-3 animate-fade-in">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-primary">{g.id}</p>
          <p className="mt-1 text-sm font-semibold text-foreground">{g.subject}</p>
          <p className="mt-1 text-xs text-muted-foreground">{g.description || "No complaint details provided."}</p>
        </div>
        <div className="text-xs text-muted-foreground md:text-right">
          <p className="font-medium text-foreground">{g.category}</p>
          <p>{new Date(g.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
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
