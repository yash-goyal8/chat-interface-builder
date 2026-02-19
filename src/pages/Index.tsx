import { useState, useRef, useEffect, useCallback } from "react";
import { conversations as mockConversations, getRandomMockResponse, Message, Conversation } from "@/data/mockData";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { WelcomeScreen } from "@/components/chat/WelcomeScreen";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { MobileAdBanner } from "@/components/chat/MobileAdBanner";
import { TabletAdBanner } from "@/components/chat/TabletAdBanner";
import { PanelLeft } from "lucide-react";
import { AdSidebar } from "@/components/chat/AdSidebar";
import { useIsDesktop } from "@/hooks/use-mobile";

const Index = () => {
  const isDesktop = useIsDesktop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Set sidebar default based on screen size (only on mount)
  useEffect(() => {
    if (!initializedRef.current && isDesktop !== undefined) {
      setSidebarOpen(isDesktop);
      initializedRef.current = true;
    }
  }, [isDesktop]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, scrollToBottom]);

  const handleSend = (text: string) => {
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };

    if (!activeConversation) {
      const newConv: Conversation = {
        id: Date.now().toString(),
        title: text.slice(0, 40) + (text.length > 40 ? "..." : ""),
        group: "today",
        messages: [userMessage],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);

      setIsTyping(true);
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getRandomMockResponse(),
        };
        setConversations((prev) =>
          prev.map((c) => (c.id === newConv.id ? { ...c, messages: [...c.messages, assistantMessage] } : c))
        );
        setIsTyping(false);
      }, 1500);
    } else {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId ? { ...c, messages: [...c.messages, userMessage] } : c
        )
      );

      setIsTyping(true);
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getRandomMockResponse(),
        };
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversationId ? { ...c, messages: [...c.messages, assistantMessage] } : c
          )
        );
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
  };

  const handleSuggestionClick = (text: string) => {
    handleSend(text);
  };

  // Build messages with inline ads every 3 messages (mobile/tablet only)
  const renderMessagesWithAds = () => {
    if (!activeConversation) return null;
    const elements: React.ReactNode[] = [];

    activeConversation.messages.forEach((msg, idx) => {
      elements.push(
        <ChatMessage
          key={msg.id}
          message={msg}
          isTyping={
            isTyping &&
            idx === activeConversation.messages.length - 1 &&
            msg.role === "assistant"
          }
        />
      );

      // Insert ad after every 3rd message
      if ((idx + 1) % 3 === 0 && idx < activeConversation.messages.length - 1) {
        elements.push(<MobileAdBanner key={`ad-${idx}`} />);
      }
    });

    return elements;
  };

  return (
    <div className="flex h-screen bg-background text-foreground dark">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-2 px-4 py-2 shrink-0">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Open sidebar"
            >
              <PanelLeft size={18} />
            </button>
          )}
          <ModelSelector />
        </header>

        {/* Messages / Welcome */}
        {activeConversation ? (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 py-6">
              {renderMessagesWithAds()}
              {isTyping && activeConversation.messages[activeConversation.messages.length - 1]?.role === "user" && (
                <div className="flex gap-4 mb-6">
                  <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center shrink-0 mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-background">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 pt-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
        )}

        {/* Tablet sticky leaderboard banner */}
        <TabletAdBanner />

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>

      {/* Right Ad Sidebar */}
      <AdSidebar />
    </div>
  );
};

export default Index;
