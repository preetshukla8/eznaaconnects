import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, Briefcase, Calendar, Pencil, FileWarning, ArrowRight, LogOut } from "lucide-react";
import { useLeadProfile } from "@/lib/lead-profile";
import { GrievanceCard } from "@/components/site/GrievancePortal";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | Eznaa Connects" },
      { name: "description", content: "Your Eznaa Connects account — manage your details and track your grievances." },
    ],
  }),
  component: ProfilePage,
});

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "U";
}

function ProfilePage() {
  const { profile, openModal, clearProfile, grievances } = useLeadProfile();

  if (!profile) {
    return (
      <section className="section">
        <div className="container-page mx-auto max-w-md text-center">
          <p className="eyebrow-gold">My account</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary">You're not signed in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Register in seconds to track enquiries and raise grievances.</p>
          <div className="mt-5 flex justify-center gap-2">
            <button onClick={openModal} className="btn-gold">Sign in / Register</button>
            <Link to="/" className="btn-outline">Go home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-band">
        <div className="container-page section">
          <p className="eyebrow-gold">My account</p>
          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground font-display text-xl font-bold">
                {initials(profile.name)}
              </span>
              <div>
                <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">{profile.name}</h1>
                <p className="text-sm text-muted-foreground">Member since {new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={openModal} className="btn-primary"><Pencil className="h-4 w-4" /> Edit profile</button>
              <button onClick={clearProfile} className="btn-outline"><LogOut className="h-4 w-4" /> Sign out</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Personal details */}
          <div className="card-soft p-6">
            <h2 className="font-display text-lg font-bold text-primary">Personal details</h2>
            <p className="mt-1 text-xs text-muted-foreground">Used for callbacks and account updates.</p>
            <dl className="mt-5 space-y-4">
              <Detail icon={<Mail className="h-4 w-4" />} label="Email" value={profile.email} />
              <Detail icon={<Phone className="h-4 w-4" />} label="Phone / WhatsApp" value={profile.phone} />
              {profile.service && <Detail icon={<Briefcase className="h-4 w-4" />} label="Primary interest" value={profile.service} />}
              <Detail icon={<Calendar className="h-4 w-4" />} label="Last updated" value={new Date(profile.updatedAt).toLocaleString()} />
            </dl>
            {profile.message && (
              <div className="mt-5 rounded-md border border-border bg-secondary/50 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Notes you shared</p>
                <p className="mt-1 text-sm text-foreground/85">{profile.message}</p>
              </div>
            )}
            <button onClick={openModal} className="btn-outline mt-5 w-full"><Pencil className="h-4 w-4" /> Update details</button>
          </div>

          {/* Grievances */}
          <div id="grievances" className="scroll-mt-24">
            <div className="card-soft p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-primary">My grievances</h2>
                  <p className="mt-1 text-xs text-muted-foreground">All complaints raised from this device.</p>
                </div>
                <Link to="/contact" className="btn-gold text-xs h-9"><FileWarning className="h-4 w-4" /> Raise new</Link>
              </div>

              {grievances.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center">
                  <FileWarning className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No grievances raised yet.</p>
                  <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                    Raise a grievance <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="mt-2 space-y-3">
                  {grievances.map((g) => <GrievanceCard key={g.id} g={g} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-gold">{icon}</span>
      <div className="min-w-0 flex-1">
        <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
        <dd className="text-sm font-semibold text-primary break-all">{value}</dd>
      </div>
    </div>
  );
}
