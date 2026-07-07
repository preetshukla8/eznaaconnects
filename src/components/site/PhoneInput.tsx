import { useState } from "react";

// Add more countries here — the component is intentionally data-driven so
// future dial codes can be dropped in without touching consumers.
export const COUNTRY_CODES = [
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
] as const;

type Props = {
  name: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  defaultDial?: string;
};

function parseDefault(v: string | undefined) {
  if (!v) return { dial: "+971", num: "" };
  const trimmed = v.trim();
  const match = COUNTRY_CODES.find((c) => trimmed.startsWith(c.code));
  if (match) return { dial: match.code, num: trimmed.slice(match.code.length).trim() };
  return { dial: "+971", num: trimmed.replace(/^\+/, "") };
}

/**
 * Phone number input with a country dial-code selector.
 * Submits a single `name` field combining "<dial> <number>" via a hidden input,
 * so existing FormData consumers keep working unchanged.
 */
export function PhoneInput({ name, required, placeholder, defaultValue, defaultDial }: Props) {
  const parsed = parseDefault(defaultValue);
  const [dial, setDial] = useState(defaultDial ?? parsed.dial);
  const [num, setNum] = useState(parsed.num);
  const combined = num.trim() ? `${dial} ${num.trim()}` : "";

  return (
    <div className="flex gap-2">
      <select
        aria-label="Country dial code"
        value={dial}
        onChange={(e) => setDial(e.target.value)}
        className="h-11 shrink-0 rounded-md border border-input bg-card px-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
      >
        {COUNTRY_CODES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>
      <input
        type="tel"
        inputMode="tel"
        value={num}
        onChange={(e) => setNum(e.target.value)}
        required={required}
        placeholder={placeholder ?? "55 236 5373"}
        className="h-11 flex-1 rounded-md border border-input bg-card px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
      <input type="hidden" name={name} value={combined} />
    </div>
  );
}
