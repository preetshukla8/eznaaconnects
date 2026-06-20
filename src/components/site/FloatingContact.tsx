import { MessageCircle, Phone } from "lucide-react";

const NUMBER = "+971552365373";
const WA = "971552365373";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      <a
        href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Eznaa Connects, I'd like to know more about your services.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden pr-1 sm:inline">WhatsApp {NUMBER}</span>
      </a>
      <a
        href={`tel:${NUMBER}`}
        aria-label={`Call ${NUMBER}`}
        className="group flex items-center gap-2 rounded-full bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-105"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden pr-1 sm:inline">Call {NUMBER}</span>
      </a>
    </div>
  );
}
