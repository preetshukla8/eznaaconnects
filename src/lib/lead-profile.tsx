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

const STORAGE_KEY = "eznaa_profile";
const DISMISS_KEY = "eznaa_modal_dismissed";

type Ctx = {
  profile: LeadProfile | null;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  saveProfile: (data: Omit<LeadProfile, "createdAt" | "updatedAt">) => void;
  clearProfile: () => void;
};

const LeadProfileContext = createContext<Ctx | null>(null);

export function LeadProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<LeadProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // Auto-open after a small delay if no profile + not dismissed this session
  useEffect(() => {
    if (!hydrated) return;
    if (profile) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setModalOpen(true), 1200);
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
      const next: LeadProfile = {
        ...data,
        createdAt: prev?.createdAt ?? now,
        updatedAt: now,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        // Also append to leads log
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

  const value = useMemo<Ctx>(() => ({ profile, modalOpen, openModal, closeModal, saveProfile, clearProfile }), [profile, modalOpen, openModal, closeModal, saveProfile, clearProfile]);

  return <LeadProfileContext.Provider value={value}>{children}</LeadProfileContext.Provider>;
}

export function useLeadProfile() {
  const ctx = useContext(LeadProfileContext);
  if (!ctx) throw new Error("useLeadProfile must be used within LeadProfileProvider");
  return ctx;
}
