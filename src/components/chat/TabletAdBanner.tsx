export function TabletAdBanner() {
  return (
    <div className="hidden md:flex lg:hidden flex-col items-center gap-1 py-2 border-t border-border bg-background">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
        Advertisement
      </span>
      <div className="w-[728px] max-w-full h-[90px] rounded-lg border border-border bg-muted/40 flex items-center justify-center">
        <span className="text-xs text-muted-foreground">728 × 90</span>
      </div>
    </div>
  );
}
