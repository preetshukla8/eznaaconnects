import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, Send, X, Bot } from "lucide-react";

const WHATSAPP_NUMBER = "971552365373";
const CALL_NUMBER = "+971552365373";

type Msg = { id: string; role: "bot" | "user"; text: string; options?: { label: string; next: string }[] };

const FLOW: Record<string, Msg> = {
  start: {
    id: "start",
    role: "bot",
    text: "Hi! I'm Eznaa's assistant. What can I help you with today?",
    options: [
      { label: "Company setup (Mainland / Freezone / Offshore)", next: "setup" },
      { label: "Visa services", next: "visa" },
      { label: "VAT & Corporate Tax", next: "tax" },
      { label: "Accounting, audit & compliance", next: "accounting" },
    ],
  },
  setup: {
    id: "setup",
    role: "bot",
    text: "We set up Mainland, Freezone (50+ zones) and Offshore companies — typically in 3–7 working days with a fixed written quote. Want to continue on WhatsApp or get a callback?",
    options: [
      { label: "Tell me about pricing", next: "pricing" },
      { label: "Documents required", next: "docs" },
    ],
  },
  visa: {
    id: "visa",
    role: "bot",
    text: "We handle Investor, Employee, Family and Golden visas end-to-end — including medical, Emirates ID and stamping.",
    options: [
      { label: "How long does it take?", next: "visaTime" },
      { label: "Documents required", next: "docs" },
    ],
  },
  tax: {
    id: "tax",
    role: "bot",
    text: "We assist with VAT registration & returns and Corporate Tax registration & filing — including impact assessment and bookkeeping.",
    options: [
      { label: "Do I need to register?", next: "taxNeed" },
      { label: "Pricing", next: "pricing" },
    ],
  },
  accounting: {
    id: "accounting",
    role: "bot",
    text: "Monthly bookkeeping, year-end accounts, audit support and AML/UBO compliance — all under one engagement.",
    options: [{ label: "Pricing", next: "pricing" }],
  },
  pricing: {
    id: "pricing",
    role: "bot",
    text: "Pricing depends on your activity, jurisdiction and visa count. We share a line-item quote — no hidden government fees. Chat with an advisor for an exact figure.",
  },
  docs: {
    id: "docs",
    role: "bot",
    text: "Usually: passport copies of shareholders, business activity, and a preferred trade name. We'll share a tailored checklist on WhatsApp.",
  },
  visaTime: {
    id: "visaTime",
    role: "bot",
    text: "Typically 5–10 working days once the establishment card is ready. Golden visa can take 2–4 weeks.",
  },
  taxNeed: {
    id: "taxNeed",
    role: "bot",
    text: "VAT: mandatory if taxable turnover > AED 375,000. CT: applies from 9% on profits above AED 375,000. We assess your case for free.",
  },
};

export function ConsultationChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([FLOW.start]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("eznaa:open-chat", handler);
    return () => window.removeEventListener("eznaa:open-chat", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function pick(next: string, label: string) {
    const reply = FLOW[next];
    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: "user", text: label },
      ...(reply ? [{ ...reply, id: `${reply.id}-${Date.now()}` }] : []),
      {
        id: `cta-${Date.now()}`,
        role: "bot",
        text: "Want to continue with a human advisor?",
        options: [
          { label: "Ask another question", next: "start" },
        ],
      },
    ]);
  }

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Eznaa Connects, I'd like to know more about your services.")}`;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:bg-transparent md:backdrop-blur-0" onClick={() => setOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gold text-gold-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Eznaa Advisor</div>
                  <div className="text-xs opacity-80">Typically replies instantly</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-secondary/40 px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground"
                        : "max-w-[85%] space-y-2"
                    }
                  >
                    <div
                      className={
                        m.role === "user"
                          ? ""
                          : "rounded-2xl rounded-bl-sm bg-background px-3.5 py-2 text-sm text-foreground shadow-sm"
                      }
                    >
                      {m.text}
                    </div>
                    {m.options && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.options.map((o) => (
                          <button
                            key={o.label}
                            onClick={() => pick(o.next, o.label)}
                            className="rounded-full border border-gold/40 bg-background px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-gold/10"
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact actions */}
            <div className="border-t border-border bg-background p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Continue with a human advisor</div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${CALL_NUMBER}`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <Phone className="h-4 w-4" /> Call {CALL_NUMBER}
                </a>
              </div>
              <div className="mt-2 text-center text-[11px] text-muted-foreground">
                <Send className="mr-1 inline h-3 w-3" /> Chats are answered by our UAE team, 9am–7pm GST
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export function openConsultationChat() {
  window.dispatchEvent(new Event("eznaa:open-chat"));
}
