export function MobileAdBanner() {
  return (
    <div className="flex flex-col items-center gap-1 py-4 lg:hidden">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
        Advertisement
      </span>
      <div className="w-[320px] h-[100px] rounded-lg border border-border bg-muted/40 flex items-center justify-center">
        <span className="text-xs text-muted-foreground">320 × 100</span>
      </div>
    </div>
  );
}
