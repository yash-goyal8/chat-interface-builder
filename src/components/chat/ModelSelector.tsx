import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const models = ["GPT-4o", "GPT-4o mini", "GPT-4", "GPT-3.5"];

export function ModelSelector() {
  const [selected, setSelected] = useState("GPT-4o");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground"
      >
        {selected}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 w-44 rounded-xl border border-border bg-popover shadow-lg py-1">
            {models.map((model) => (
              <button
                key={model}
                onClick={() => {
                  setSelected(model);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors",
                  selected === model && "font-medium text-foreground",
                  selected !== model && "text-muted-foreground"
                )}
              >
                {model}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
