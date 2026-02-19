import { Copy, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { Message } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

function renderMarkdown(content: string) {
  // Simple markdown renderer for prototype
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = "";

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${i}`} className="my-3 rounded-lg overflow-hidden bg-[hsl(0,0%,8%)] border border-border">
            <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground bg-[hsl(0,0%,12%)]">
              <span>{codeLang || "code"}</span>
              <button className="hover:text-foreground transition-colors flex items-center gap-1">
                <Copy size={12} /> Copy
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-green-400">{codeLines.join("\n")}</code>
            </pre>
          </div>
        );
        codeLines = [];
        codeLang = "";
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="text-xl font-bold mt-4 mb-2">{formatInline(line.slice(2))}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-lg font-semibold mt-3 mb-1">{formatInline(line.slice(3))}</h2>);
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-muted-foreground/30 pl-4 my-2 italic text-muted-foreground">
          {formatInline(line.slice(2))}
        </blockquote>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-4 list-disc text-sm leading-7">{formatInline(line.slice(2))}</li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "");
      elements.push(
        <li key={i} className="ml-4 list-decimal text-sm leading-7">{formatInline(text)}</li>
      );
    } else if (line.startsWith("|")) {
      // Simple table row rendering
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.some((c) => /^[-:]+$/.test(c))) return; // skip separator rows
      elements.push(
        <div key={i} className="flex gap-4 text-sm py-1">
          {cells.map((cell, ci) => (
            <span key={ci} className="flex-1">{formatInline(cell)}</span>
          ))}
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-sm leading-7">{formatInline(line)}</p>);
    }
  });

  return elements;
}

function formatInline(text: string): React.ReactNode {
  // Bold, inline code, and basic formatting
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-accent text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function ChatMessage({ message, isTyping }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === "user") {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[70%] px-5 py-3 rounded-3xl bg-[hsl(var(--chat-user-bg))] text-foreground">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 mb-6 group">
      <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center shrink-0 mt-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-background">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" fill="currentColor"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className={cn(isTyping && "typing-cursor")}>
          {renderMarkdown(message.content)}
        </div>
        {!isTyping && (
          <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              title="Copy"
            >
              <Copy size={14} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" title="Good response">
              <ThumbsUp size={14} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" title="Bad response">
              <ThumbsDown size={14} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" title="Regenerate">
              <RefreshCw size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
