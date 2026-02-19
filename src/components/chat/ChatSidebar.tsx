import { Plus, MessageSquare, Ellipsis } from "lucide-react";
import { Conversation } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const groupLabels: Record<string, string> = {
  today: "Today",
  yesterday: "Yesterday",
  previous7: "Previous 7 Days",
  previous30: "Previous 30 Days",
};

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  isOpen,
  onToggle,
}: ChatSidebarProps) {
  const grouped = conversations.reduce<Record<string, Conversation[]>>((acc, conv) => {
    if (!acc[conv.group]) acc[conv.group] = [];
    acc[conv.group].push(conv);
    return acc;
  }, {});

  const groupOrder = ["today", "yesterday", "previous7", "previous30"];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-hidden",
        isOpen ? "w-64" : "w-0"
      )}
    >
      <div className="flex items-center justify-between p-3 min-w-[256px]">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          aria-label="Close sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>
        <button
          onClick={onNewChat}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          aria-label="New chat"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {groupOrder.map((group) =>
          grouped[group] ? (
            <div key={group} className="mb-4">
              <p className="px-3 py-1 text-xs font-medium text-muted-foreground">
                {groupLabels[group]}
              </p>
              {grouped[group].map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm truncate flex items-center gap-2 group transition-colors",
                    activeConversationId === conv.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                  )}
                >
                  <span className="truncate flex-1">{conv.title}</span>
                  <Ellipsis
                    size={16}
                    className="opacity-0 group-hover:opacity-100 shrink-0 text-muted-foreground"
                  />
                </button>
              ))}
            </div>
          ) : null
        )}
      </div>

      <div className="p-3 border-t border-sidebar-border min-w-[256px]">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
          <span className="text-sm font-medium">User</span>
        </button>
      </div>
    </div>
  );
}
