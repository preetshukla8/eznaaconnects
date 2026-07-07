import { useEffect, type ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
};

/**
 * Reusable premium success popup with soft fade + scale-in animation.
 * Used for consultation and grievance confirmations.
 */
export function SuccessDialog({ open, onClose, title, description, children, primaryLabel = "Done", onPrimary }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-2xl animate-scale-in">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-secondary/80 text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-6 pt-8 pb-6 text-center sm:px-8">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/10 ring-4 ring-gold/20 animate-scale-in">
            <CheckCircle2 className="h-9 w-9 text-gold" />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-primary">{title}</h3>
          {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
          {children && <div className="mt-4">{children}</div>}

          <button
            type="button"
            onClick={() => { onPrimary?.(); onClose(); }}
            className="btn-gold mt-6 w-full transition-transform hover:scale-[1.01]"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
