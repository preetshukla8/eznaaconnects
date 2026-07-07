import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type LeadProfile = {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
};

export type Grievance = {
  id: string;          // EZN-XXXXXX
  subject: string;
  category: string;
  description: string;
  contactPhone?: string;
  status: "Open" | "In Review" | "Resolved";
  createdAt: string;
  updates: { ts: string; note: string }[];
  assignedExecutive?: {
    name: string;
    phone: string;
    email: string;
  };
  eta?: string;
  latestRemark?: string;
};

const EXECUTIVE_POOL = [
  { name: "Priya Sharma", phone: "+971 55 236 5373", email: "priya@eznaaconnects.ae" },
  { name: "Ahmed Al Marri", phone: "+971 55 236 5373", email: "ahmed@eznaaconnects.ae" },
  { name: "Rahul Verma", phone: "+971 55 236 5373", email: "rahul@eznaaconnects.ae" },
];

const STORAGE_KEY = "eznaa_profile";
const DISMISS_KEY = "eznaa_modal_dismissed";
const GRIEV_KEY = "eznaa_grievances";

type Ctx = {
  profile: LeadProfile | null;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  saveProfile: (data: Omit<LeadProfile, "createdAt" | "updatedAt">) => void;
  clearProfile: () => void;
  grievances: Grievance[];
  addGrievance: (g: Omit<Grievance, "id" | "status" | "createdAt" | "updates">) => Grievance;
  findGrievance: (id: string) => Grievance | undefined;
};

const LeadProfileContext = createContext<Ctx | null>(null);

function genId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `EZN-${n}`;
}

export function LeadProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<LeadProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
      const g = localStorage.getItem(GRIEV_KEY);
      if (g) setGrievances(JSON.parse(g));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (profile) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setModalOpen(true), 800);
    return () => clearTimeout(t);
  }, [hydrated, profile]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch {}
  }, []);

  const saveProfile = useCallback((data: Omit<LeadProfile, "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    setProfile((prev) => {
      const next: LeadProfile = { ...data, createdAt: prev?.createdAt ?? now, updatedAt: now };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        const queue = JSON.parse(localStorage.getItem("eznaa_leads") || "[]");
        queue.push({ ...next, ts: now });
        localStorage.setItem("eznaa_leads", JSON.stringify(queue));
      } catch {}
      return next;
    });
    setModalOpen(false);
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const persistGrievances = (next: Grievance[]) => {
    setGrievances(next);
    try { localStorage.setItem(GRIEV_KEY, JSON.stringify(next)); } catch {}
  };

  const addGrievance = useCallback<Ctx["addGrievance"]>((g) => {
    const now = new Date().toISOString();
    const newG: Grievance = {
      ...g,
      id: genId(),
      status: "Open",
      createdAt: now,
      updates: [{ ts: now, note: "Grievance received. Our team will respond within 24 hours." }],
    };
    setGrievances((prev) => {
      const next = [newG, ...prev];
      try { localStorage.setItem(GRIEV_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    return newG;
  }, []);

  const findGrievance = useCallback((id: string) => grievances.find((g) => g.id.toUpperCase() === id.toUpperCase()), [grievances]);

  const value = useMemo<Ctx>(() => ({ profile, modalOpen, openModal, closeModal, saveProfile, clearProfile, grievances, addGrievance, findGrievance }), [profile, modalOpen, openModal, closeModal, saveProfile, clearProfile, grievances, addGrievance, findGrievance]);

  return <LeadProfileContext.Provider value={value}>{children}</LeadProfileContext.Provider>;
}

export function useLeadProfile() {
  const ctx = useContext(LeadProfileContext);
  if (!ctx) throw new Error("useLeadProfile must be used within LeadProfileProvider");
  return ctx;
}
