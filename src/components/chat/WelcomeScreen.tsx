import { Lightbulb, Code, Pen, GraduationCap } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  { icon: Lightbulb, text: "Explain quantum computing in simple terms", color: "text-yellow-400" },
  { icon: Code, text: "Help me write a Python web scraper", color: "text-green-400" },
  { icon: Pen, text: "Write a poem about the ocean", color: "text-blue-400" },
  { icon: GraduationCap, text: "Teach me about the French Revolution", color: "text-purple-400" },
];

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-10 text-foreground">What can I help with?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl w-full">
        {suggestions.map((s) => (
          <button
            key={s.text}
            onClick={() => onSuggestionClick(s.text)}
            className="flex items-start gap-3 p-4 rounded-xl border border-border hover:bg-accent/50 transition-colors text-left group"
          >
            <s.icon size={18} className={`${s.color} mt-0.5 shrink-0`} />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors leading-snug">
              {s.text}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile ad: 320x250 */}
      <div className="flex flex-col items-center gap-1 mt-8 md:hidden">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Advertisement</span>
        <div className="w-[320px] h-[250px] rounded-lg border border-border bg-muted/40 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">320 × 250</span>
        </div>
      </div>

      {/* Tablet ad: 468x60 */}
      <div className="hidden md:flex lg:hidden flex-col items-center gap-1 mt-8">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Advertisement</span>
        <div className="w-[468px] h-[60px] rounded-lg border border-border bg-muted/40 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">468 × 60</span>
        </div>
      </div>
    </div>
  );
}
