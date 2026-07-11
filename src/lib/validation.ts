// Lightweight client-side validators used across lead-capture forms.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Expected national number length (digits, excluding country code) for common markets.
// Fallback for unknown codes: 6–15 digits (E.164).
const COUNTRY_LENGTHS: Record<string, number[]> = {
  "+971": [9],       // UAE (mobile 9 digits after country code, incl. leading 5)
  "+91": [10],       // India
  "+966": [9],       // Saudi Arabia
  "+968": [8],       // Oman
  "+974": [8],       // Qatar
  "+973": [8],       // Bahrain
  "+965": [8],       // Kuwait
  "+1": [10],        // US / Canada
  "+44": [10, 11],   // UK
};

export function validateEmail(email: string): string | null {
  const v = email.trim();
  if (!v) return "Email is required.";
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
  return null;
}

/**
 * `combined` is the value produced by <PhoneInput /> — e.g. "+971 552365373".
 */
export function validatePhone(combined: string): string | null {
  const v = combined.trim();
  if (!v) return "Phone number is required.";
  const spaceIdx = v.indexOf(" ");
  if (spaceIdx === -1) return "Enter your phone number.";
  const code = v.slice(0, spaceIdx);
  const digits = v.slice(spaceIdx + 1).replace(/\D/g, "");
  if (!digits) return "Enter your phone number.";
  const expected = COUNTRY_LENGTHS[code];
  if (expected && !expected.includes(digits.length)) {
    return `Enter a valid ${code} number (${expected.join(" or ")} digits).`;
  }
  if (!expected && (digits.length < 6 || digits.length > 15)) {
    return "Enter a valid phone number (6–15 digits).";
  }
  return null;
}

export function requireField(value: string, label: string): string | null {
  return value.trim() ? null : `${label} is required.`;
}

// --- Duplicate detection ---------------------------------------------------

type StoredLead = { email?: string; phone?: string };

function normEmail(v: string) { return v.trim().toLowerCase(); }
function normPhone(v: string) { return v.replace(/\D/g, ""); }

function readLeads(): StoredLead[] {
  try {
    const raw = localStorage.getItem("eznaa_leads");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Returns a message if the email/phone is already registered on this device. */
export function checkDuplicate(email: string, phone: string, ignoreSelf?: { email?: string; phone?: string }): string | null {
  const leads = readLeads();
  const e = normEmail(email);
  const p = normPhone(phone);
  const selfEmail = ignoreSelf?.email ? normEmail(ignoreSelf.email) : "";
  const selfPhone = ignoreSelf?.phone ? normPhone(ignoreSelf.phone) : "";

  for (const l of leads) {
    const le = normEmail(String(l.email || ""));
    const lp = normPhone(String(l.phone || ""));
    if (e && le && le === e && le !== selfEmail) return "This email is already registered with us.";
    if (p && lp && lp === p && lp !== selfPhone) return "This phone number is already registered with us.";
  }
  return null;
}
