import { MessageCircle, Phone } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
      <a
        href="https://wa.me/971500000000"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-gold text-gold-foreground shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href="tel:+97140000000"
        aria-label="Call us"
        className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
