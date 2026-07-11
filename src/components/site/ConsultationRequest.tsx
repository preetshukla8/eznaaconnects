import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, UserCircle2 } from "lucide-react";
import { useLeadProfile } from "@/lib/lead-profile";
import { submitConsultation } from "@/lib/api";
import { validatePhone } from "@/lib/validation";
import { PhoneInput } from "./PhoneInput";
import { SuccessDialog } from "./SuccessDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  defaultService?: string;
  title?: string;
  subtitle?: string;
};

/**
 * Smart consultation form:
 * - If user is logged in: skip name/email, only ask alternate contact + service + notes.
 * - If not: ask them to sign in (opens lead-capture modal).
 * - Allows international numbers via type=tel + helper text.
 */
export function ConsultationRequest({ defaultService, title = "Request a consultation", subtitle = "Typical Response: Within 24 Business Hours." }: Props) {
  const { profile, openModal } = useLeadProfile();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [altPhoneError, setAltPhoneError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!profile) return;

    const fd = new FormData(e.currentTarget);
    const altPhone = String(fd.get("altPhone") || "").trim();
    const service = String(fd.get("service") || "").trim();
    const notes = String(fd.get("notes") || "").trim();

    // Optional field — but if provided must be valid.
    if (altPhone) {
      const err = validatePhone(altPhone);
      if (err) {
        setAltPhoneError(err);
        toast.error("Please fix the highlighted fields.");
        return;
      }
    }
    setAltPhoneError(null);

    setSubmitting(true);
    setError(null);

    try {
      const queue = JSON.parse(localStorage.getItem("eznaa_leads") || "[]");
      queue.push({
        profileEmail: profile.email,
        profileName: profile.name,
        primaryPhone: profile.phone,
        altPhone,
        service,
        notes,
        ts: new Date().toISOString(),
      });
      localStorage.setItem("eznaa_leads", JSON.stringify(queue));

      const response = await submitConsultation({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        altPhone: altPhone || undefined,
        service: service || undefined,
        notes: notes || undefined,
      });

      setDone(true);
      toast.success(response.message || "Request received — advisor will call you shortly.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "We could not send your consultation request. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!profile) {
    return (
      <div className="card-soft p-7 text-center">
        <UserCircle2 className="mx-auto h-10 w-10 text-gold" />
        <h3 className="mt-3 font-display text-xl font-bold text-primary">Sign in to request a consultation</h3>
        <p className="mt-1 text-sm text-muted-foreground">We'll pre-fill your details so you don't have to re-enter them every time.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button onClick={openModal} className="btn-gold">Sign in / Register</button>
          <button onClick={openModal} className="btn-outline">Request a callback</button>
        </div>
      </div>
    );
  }

  // Success confirmation is rendered as a modal popup — see <SuccessDialog /> below.

  return (
    <>
    <form onSubmit={onSubmit} className="card-soft p-6 md:p-7 animate-fade-in">
      <p className="eyebrow-gold">Logged in · {profile.name}</p>
      <h3 className="mt-1 font-display text-2xl font-bold text-primary">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

      <div className="mt-4 rounded-lg border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
        We'll reach out using your saved details — <span className="font-semibold text-primary">{profile.email}</span> · <span className="font-semibold text-primary">{profile.phone}</span>.{" "}
        <button type="button" onClick={openModal} className="font-semibold text-primary underline">Update</button>
      </div>

      <div className="mt-4 grid gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Alternate contact number (optional)</span>
          <PhoneInput name="altPhone" placeholder="55 236 5373" />
          {altPhoneError && <span className="text-xs font-medium text-destructive">{altPhoneError}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Service you might need</span>
          <select
            name="service"
            defaultValue={defaultService ?? profile.service ?? ""}
            className="h-11 rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
          >
            <option value="" disabled>Select a service…</option>
            {SERVICES.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Tell us more</span>
          <textarea
            name="notes"
            rows={5}
            placeholder="Describe your business, activity, jurisdiction preference, timeline, visa count, current accounting setup — anything that helps us prep for the call."
            className="rounded-md border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </label>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-5">
          <AlertTitle>We couldn’t send your request</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <button type="submit" disabled={submitting} className="btn-gold mt-5 w-full transition-transform hover:scale-[1.01]">
        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Request callback"}
      </button>
    </form>

    <SuccessDialog
      open={done}
      onClose={() => setDone(false)}
      title="Request received successfully"
      description={`Thank you, ${profile.name.split(" ")[0]}. A senior advisor will contact you on ${profile.phone}. Typical Response: Within 24 Business Hours.`}
      primaryLabel="Close"
    />
    </>
  );
}
