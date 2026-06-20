import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, User, FileWarning, LogOut, ChevronRight, Pencil } from "lucide-react";
import { useLeadProfile } from "@/lib/lead-profile";

function initials(name?: string) {
  if (!name) return "U";
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "U";
}

export function AccountMenu() {
  const { profile, openModal, clearProfile, grievances } = useLeadProfile();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open account menu"
        className="grid h-10 w-10 place-items-center rounded-md border border-border bg-card text-primary hover:bg-secondary"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-80 rounded-xl border border-border bg-card shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="bg-primary px-4 py-4 text-primary-foreground">
            {profile ? (
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-primary text-sm font-bold">
                  {initials(profile.name)}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold truncate">Hi, {profile.name.split(" ")[0]}</p>
                  <p className="text-[11px] text-primary-foreground/70 truncate">{profile.email}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-display text-sm font-bold">Welcome to Eznaa</p>
                <p className="text-[11px] text-primary-foreground/70">Sign in to track your enquiry & grievances</p>
                <button onClick={() => { setOpen(false); openModal(); }} className="btn-gold mt-3 w-full text-xs h-9">
                  Sign in / Register
                </button>
              </div>
            )}
          </div>

          {profile && (
            <div className="p-2">
              <Row to="/profile" icon={<User className="h-4 w-4" />} label="My Profile" onClick={() => setOpen(false)} />
              <Row to="/profile" hash="grievances" icon={<FileWarning className="h-4 w-4" />} label="My Grievances" badge={grievances.length || undefined} onClick={() => setOpen(false)} />
              <Row to="/contact" icon={<FileWarning className="h-4 w-4" />} label="Raise a Grievance" onClick={() => setOpen(false)} />
              <button
                onClick={() => { setOpen(false); openModal(); }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-secondary"
              >
                <Pencil className="h-4 w-4 text-gold" /> <span className="flex-1 text-left">Edit profile</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => { setOpen(false); clearProfile(); }}
                className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ to, hash, icon, label, badge, onClick }: { to: string; hash?: string; icon: React.ReactNode; label: string; badge?: number; onClick?: () => void }) {
  return (
    <Link
      to={to}
      hash={hash}
      onClick={onClick}
      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-secondary"
    >
      <span className="text-gold">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-primary">{badge}</span>
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}
