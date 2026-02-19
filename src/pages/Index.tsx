import { useState, useRef, useEffect, useCallback } from "react";
import { conversations as mockConversations, getRandomMockResponse, Message, Conversation } from "@/data/mockData";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { WelcomeScreen } from "@/components/chat/WelcomeScreen";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { PanelLeft } from "lucide-react";
import { AdSidebar } from "@/components/chat/AdSidebar";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      // Create new conversation
      const newConv: Conversation = {
        id: Date.now().toString(),
        title: text.slice(0, 40) + (text.length > 40 ? "..." : ""),
        group: "today",
        messages: [userMessage],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);

      // Simulate response
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
      // Add to existing conversation
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
              {activeConversation.messages.map((msg, idx) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isTyping={
                    isTyping &&
                    idx === activeConversation.messages.length - 1 &&
                    msg.role === "assistant"
                  }
                />
              ))}
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

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>

      {/* Right Ad Sidebar */}
      <AdSidebar />
    </div>
  );
};

export default Index;
