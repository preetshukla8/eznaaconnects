import { useEffect, useRef, useState } from "react";
import { ChevronDown, Pencil, LogOut, Mail, Phone, Briefcase } from "lucide-react";
import { useLeadProfile } from "@/lib/lead-profile";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "U";
}

export function UserProfileMenu() {
  const { profile, openModal, clearProfile } = useLeadProfile();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!profile) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-2.5 py-1 hover:border-primary/50 transition-colors"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {initials(profile.name)}
        </span>
        <span className="hidden sm:inline text-xs font-semibold text-foreground/80 max-w-[100px] truncate">
          {profile.name.split(" ")[0]}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-foreground/60" />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-72 rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-primary text-sm font-bold">
                {initials(profile.name)}
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold truncate">{profile.name}</p>
                <p className="text-[11px] text-primary-foreground/70 truncate">Member since {new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 space-y-2 text-xs">
            <Row icon={<Mail className="h-3.5 w-3.5" />} label="Email" value={profile.email} />
            <Row icon={<Phone className="h-3.5 w-3.5" />} label="Phone" value={profile.phone} />
            {profile.service && <Row icon={<Briefcase className="h-3.5 w-3.5" />} label="Interest" value={profile.service} />}
          </div>

          <div className="border-t border-border p-2 flex flex-col gap-1">
            <button
              onClick={() => { setOpen(false); openModal(); }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary"
            >
              <Pencil className="h-4 w-4 text-primary" /> Edit profile
            </button>
            <button
              onClick={() => { setOpen(false); clearProfile(); }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-gold">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}
