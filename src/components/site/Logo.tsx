export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* EC badge */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary md:h-11 md:w-11">
        <span className="font-display text-lg font-bold text-gold md:text-xl tracking-tight">EC</span>
        {/* gold accent corner */}
        <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gold" />
      </div>
      {/* wordmark */}
      <div className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-bold text-primary md:text-[1.05rem]">Eznaa</span>
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:text-[0.72rem]">Connects</span>
      </div>
    </div>
  );
}
