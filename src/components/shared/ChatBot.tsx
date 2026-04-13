// src/components/shared/ChatBot.tsx
// Floating chatbot widget. Calls /api/chat internally (no API key in browser).
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

let msgId = 0;

export const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! I'm Lazzat's virtual assistant. Ask me about our menu, locations, hours, or anything else you'd like to know!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: ++msgId, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      let reply = "Sorry, I'm having trouble connecting right now. Please try again.";
      if (res.ok) {
        const data = (await res.json()) as { reply?: string; error?: string };
        if (data.reply) reply = data.reply;
        else if (data.error) reply = `Error: ${data.error}`;
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        reply = data.error ?? `Service unavailable (${res.status}). Please try again.`;
      }

      setMessages((prev) => [...prev, { id: ++msgId, role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: ++msgId, role: "assistant", text: "Network error. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        className={cn(
          "fixed bottom-40 right-4 md:bottom-24 md:right-8 z-50",
          "w-14 h-14 rounded-full flex items-center justify-center shadow-xl",
          "bg-primary text-primary-foreground border border-primary/40",
          "transition-all duration-300 hover:scale-105 active:scale-95",
          open && "rotate-0"
        )}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className={cn(
            "fixed bottom-60 right-4 md:bottom-40 md:right-8 z-50",
            "w-[min(90vw,380px)] h-[480px] flex flex-col",
            "bg-background border border-primary/30 rounded-2xl shadow-2xl overflow-hidden",
            "animate-in slide-in-from-bottom-4 fade-in duration-200"
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/20 bg-black/40">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Bot size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Lazzat Assistant</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-2 text-sm",
                  msg.role === "user" && "flex-row-reverse"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                  msg.role === "assistant" ? "bg-primary/20 border border-primary/30" : "bg-white/10"
                )}>
                  {msg.role === "assistant" ? <Bot size={12} className="text-primary" /> : <User size={12} />}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3 py-2 leading-relaxed",
                    msg.role === "assistant"
                      ? "bg-black/40 border border-primary/10 text-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Bot size={12} className="text-primary" />
                </div>
                <div className="bg-black/40 border border-primary/10 rounded-2xl px-3 py-2">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-primary/20 p-3 flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something…"
              rows={1}
              className={cn(
                "flex-1 resize-none rounded-xl bg-black/40 border border-primary/20",
                "px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:border-primary transition-colors"
              )}
              disabled={loading}
            />
            <Button
              size="icon"
              className="shrink-0 rounded-xl h-9 w-9"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <Send size={15} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
