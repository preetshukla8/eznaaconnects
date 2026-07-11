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
const AUTO_OPEN_KEY = "eznaa_modal_auto_opened";
const GRIEV_KEY = "eznaa_grievances";
const CONSULTANCY_PATHS = ["/consultancy", "/services", "/about", "/contact", "/profile"];

type GrievanceInput = Omit<Grievance, "id" | "status" | "createdAt" | "updates"> & {
  id?: string;
  status?: Grievance["status"];
  createdAt?: string;
  updates?: Grievance["updates"];
};

type Ctx = {
  profile: LeadProfile | null;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  saveProfile: (data: Omit<LeadProfile, "createdAt" | "updatedAt">) => void;
  clearProfile: () => void;
  grievances: Grievance[];
  addGrievance: (g: GrievanceInput) => Grievance;
  upsertGrievance: (g: GrievanceInput) => Grievance;
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

    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    const isConsultancyPath = CONSULTANCY_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    const alreadyAutoOpened = sessionStorage.getItem(AUTO_OPEN_KEY);

    if (!isConsultancyPath) return;
    if (profile) return;
    if (dismissed || alreadyAutoOpened) return;

    const t = setTimeout(() => {
      setModalOpen(true);
      sessionStorage.setItem(AUTO_OPEN_KEY, "1");
    }, 800);
    return () => clearTimeout(t);
  }, [hydrated, profile]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
      sessionStorage.setItem(AUTO_OPEN_KEY, "1");
    } catch {}
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

  const upsertGrievance = useCallback<Ctx["upsertGrievance"]>((g) => {
    const now = new Date().toISOString();
    const exec = EXECUTIVE_POOL[Math.floor(Math.random() * EXECUTIVE_POOL.length)];
    const firstRemark = "Grievance received. Assigned to a senior executive for review.";
    const normalizedId = (g.id ?? "").trim() || genId();

    setGrievances((prev) => {
      const existing = prev.find((item) => item.id.toUpperCase() === normalizedId.toUpperCase());
      const nextItem: Grievance = {
        subject: g.subject ?? existing?.subject ?? "",
        category: g.category ?? existing?.category ?? "Other",
        description: g.description ?? existing?.description ?? "",
        contactPhone: g.contactPhone ?? existing?.contactPhone,
        id: normalizedId,
        status: g.status ?? existing?.status ?? "Open",
        createdAt: g.createdAt ?? existing?.createdAt ?? now,
        updates: g.updates ?? existing?.updates ?? [{ ts: now, note: firstRemark }],
        assignedExecutive: g.assignedExecutive ?? existing?.assignedExecutive ?? exec,
        eta: g.eta ?? existing?.eta ?? "Within 24 business hours",
        latestRemark: g.latestRemark ?? existing?.latestRemark ?? firstRemark,
      };

      const next = prev.filter((item) => item.id.toUpperCase() !== normalizedId.toUpperCase());
      next.unshift(nextItem);
      try { localStorage.setItem(GRIEV_KEY, JSON.stringify(next)); } catch {}
      return next;
    });

    return {
      subject: g.subject ?? "",
      category: g.category ?? "Other",
      description: g.description ?? "",
      contactPhone: g.contactPhone,
      id: normalizedId,
      status: g.status ?? "Open",
      createdAt: g.createdAt ?? now,
      updates: g.updates ?? [{ ts: now, note: firstRemark }],
      assignedExecutive: g.assignedExecutive ?? exec,
      eta: g.eta ?? "Within 24 business hours",
      latestRemark: g.latestRemark ?? firstRemark,
    } as Grievance;
  }, []);

  const addGrievance = useCallback<Ctx["addGrievance"]>((g) => upsertGrievance(g), [upsertGrievance]);

  const findGrievance = useCallback((id: string) => grievances.find((g) => g.id.toUpperCase() === id.toUpperCase()), [grievances]);

  const value = useMemo<Ctx>(() => ({ profile, modalOpen, openModal, closeModal, saveProfile, clearProfile, grievances, addGrievance, upsertGrievance, findGrievance }), [profile, modalOpen, openModal, closeModal, saveProfile, clearProfile, grievances, addGrievance, upsertGrievance, findGrievance]);

  return <LeadProfileContext.Provider value={value}>{children}</LeadProfileContext.Provider>;
}

export function useLeadProfile() {
  const ctx = useContext(LeadProfileContext);
  if (!ctx) throw new Error("useLeadProfile must be used within LeadProfileProvider");
  return ctx;
}
