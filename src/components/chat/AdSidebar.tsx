export function AdSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[300px] shrink-0 border-l border-border bg-background overflow-y-auto gap-6 p-4">
      {/* 300x250 Medium Rectangle */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Advertisement</span>
        <div className="w-[300px] h-[250px] rounded-lg border border-border bg-muted/40 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">300 × 250</span>
        </div>
      </div>

      {/* 300x600 Half Page */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Advertisement</span>
        <div className="w-[300px] h-[600px] rounded-lg border border-border bg-muted/40 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">300 × 600</span>
        </div>
      </div>
    </aside>
  );
}
