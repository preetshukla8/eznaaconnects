import { useEffect, useState, type FormEvent } from "react";
import { X, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useLeadProfile } from "@/lib/lead-profile";
import { PhoneInput } from "./PhoneInput";
import { SuccessDialog } from "./SuccessDialog";

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

export function LeadCaptureModal() {
  const { modalOpen, closeModal, saveProfile, profile } = useLeadProfile();
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const editing = !!profile;

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [modalOpen, closeModal]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    const wasEditing = editing;
    saveProfile({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
    });
    setSubmitting(false);
    if (wasEditing) {
      toast.success("Profile updated");
    } else {
      setSuccessOpen(true);
    }
  }

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm animate-fade-in" onClick={closeModal} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-t-2xl sm:rounded-2xl bg-card shadow-2xl animate-scale-in">
            <button aria-label="Close" onClick={closeModal} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-secondary/80 text-foreground/70 transition-colors hover:bg-secondary">
              <X className="h-4 w-4" />
            </button>

            <div className="bg-primary px-6 py-5 text-primary-foreground sm:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                {editing ? "Update your details" : "Free Consultation"}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">
                {editing ? "Edit your profile" : "Let's set up your UAE business."}
              </h2>
              <p className="mt-1.5 text-sm text-primary-foreground/80">
                {editing ? "Changes apply across this device." : "Tell us a bit about you — Typical Response: Within 24 Business Hours."}
              </p>
            </div>

            <form onSubmit={onSubmit} className="px-6 py-5 sm:px-8 sm:py-6">
              <div className="grid gap-3">
                <Field name="name" label="Full name" required defaultValue={profile?.name} placeholder="John Smith" />
                <Field name="email" type="email" label="Email" required defaultValue={profile?.email} placeholder="you@company.com" />
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Phone / WhatsApp</span>
                  <PhoneInput name="phone" required defaultValue={profile?.phone} placeholder="55 236 5373" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Service interested in</span>
                  <select name="service" defaultValue={profile?.service ?? ""} className="h-11 rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30">
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Tell us briefly</span>
                  <textarea name="message" rows={2} defaultValue={profile?.message} placeholder="Activity, jurisdiction preference, timeline…" className="rounded-md border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" />
                </label>
              </div>

              <button type="submit" disabled={submitting} className="btn-gold mt-4 w-full transition-transform hover:scale-[1.01]">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> {editing ? "Saving…" : "Submitting…"}</> : (editing ? "Save changes" : "Request callback")}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                We respect your privacy. No spam, ever.
              </div>
            </form>
          </div>
        </div>
      )}

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Consultation request received"
        description="Thank you! Your request has been recorded successfully. A senior advisor will reach out shortly. Typical Response: Within 24 Business Hours."
        primaryLabel="Great, thanks"
      />
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder, defaultValue }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      <input name={name} type={type} required={required} defaultValue={defaultValue} placeholder={placeholder} className="h-11 rounded-md border border-input bg-card px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" />
    </label>
  );
}
