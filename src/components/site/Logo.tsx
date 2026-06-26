import logoAsset from "@/assets/eznaa-logo.png.asset.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoAsset.url}
        alt="Eznaa Connects"
        className="h-10 w-auto md:h-11"
      />
      {/* wordmark */}
      <div className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-bold text-primary md:text-[1.05rem]">Eznaa</span>
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:text-[0.72rem]">Connect</span>
      </div>
    </div>
  );
}
