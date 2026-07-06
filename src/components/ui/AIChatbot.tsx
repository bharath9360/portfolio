"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw } from "lucide-react";

// ============================================================================
// BHARATH K'S PORTFOLIO ASSISTANT — FRONTEND CHAT COMPONENT
// ============================================================================
// This component connects directly to the App Router API route at `/api/chat`.
// It maintains conversation state, handles auto-scrolling, and displays
// a clean minimalist dark-mode chat interface.
// ============================================================================

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "Hi there! 👋 I'm **Bharath K's personal AI Assistant**.\n\nAsk me anything about his flagship projects (like *Alumni Connect* or *AuraVision*), full-stack skills, or experience!",
};

const BlinkingEye = ({
  size = "lg",
  isOpen = false,
}: {
  size?: "sm" | "lg";
  isOpen?: boolean;
}) => (
  <div
    className={`relative flex items-center justify-center ${
      size === "lg" ? "w-14 h-14 sm:w-16 sm:h-16" : "w-9 h-9"
    }`}
  >
    {/* Outer radar glow rings */}
    {size === "lg" && (
      <>
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00f2fe] via-[#7f52ff] to-[#2575fc] opacity-60 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />
        <span className="absolute inset-0 rounded-full border border-[#00f2fe]/50 animate-ping opacity-30" />
      </>
    )}

    {/* Dark Cyber Core Circle */}
    <div
      className={`relative rounded-full bg-[#060814] border border-white/20 flex items-center justify-center shadow-[inset_0_0_15px_rgba(0,242,254,0.6)] transition-all ${
        size === "lg" ? "w-14 h-14 sm:w-16 sm:h-16 group-hover:scale-105" : "w-9 h-9"
      }`}
    >
      {isOpen ? (
        <motion.div
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <X
            className={`${
              size === "lg" ? "w-6 h-6 sm:w-7 sm:h-7" : "w-4 h-4"
            } text-[#00f2fe]`}
          />
        </motion.div>
      ) : (
        <div className="flex items-center justify-center gap-1 sm:gap-1.5">
          {/* Left Eye Slit */}
          <motion.div
            animate={{
              scaleY: [1, 1, 0.05, 1, 1],
              opacity: [0.9, 1, 0.7, 1, 0.9],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              times: [0, 0.88, 0.92, 0.96, 1],
              ease: "easeInOut",
            }}
            className={`${
              size === "lg" ? "w-2 sm:w-2.5 h-4 sm:h-5" : "w-1.5 h-3"
            } rounded-full bg-gradient-to-b from-[#00f2fe] via-[#00f2fe] to-[#7f52ff] shadow-[0_0_10px_#00f2fe]`}
          />
          {/* Right Eye Slit */}
          <motion.div
            animate={{
              scaleY: [1, 1, 0.05, 1, 1],
              opacity: [0.9, 1, 0.7, 1, 0.9],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              times: [0, 0.88, 0.92, 0.96, 1],
              ease: "easeInOut",
            }}
            className={`${
              size === "lg" ? "w-2 sm:w-2.5 h-4 sm:h-5" : "w-1.5 h-3"
            } rounded-full bg-gradient-to-b from-[#00f2fe] via-[#00f2fe] to-[#7f52ff] shadow-[0_0_10px_#00f2fe]`}
          />
        </div>
      )}

      {/* Online Status Dot */}
      {size === "lg" && !isOpen && (
        <span className="absolute bottom-1 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-[#060814]" />
        </span>
      )}
    </div>
  </div>
);

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ref for auto-scrolling to the bottom of message list
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageText = input.trim();
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessageText,
    };

    // Update messages state with user input
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Send conversation history to our Next.js backend API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const assistantReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.reply ||
          "I'm sorry, I couldn't generate a response. Please try again!",
      };

      setMessages((prev) => [...prev, assistantReply]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "⚠️ Network connection error. Please check your internet connection or reach out to Bharath directly at bharathkkbharath3@gmail.com.",
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* ── CHAT WINDOW ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[340px] sm:w-[380px] md:w-[400px] h-[500px] sm:h-[540px] mb-4 rounded-3xl bg-[#0a0c16]/95 backdrop-blur-2xl border border-white/15 shadow-[0_0_50px_-15px_rgba(0,242,254,0.3)] flex flex-col overflow-hidden text-slate-200"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#101424] to-[#161b30] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <BlinkingEye size="sm" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0c16] z-10" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Bharath AI Assistant
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-[#00f2fe] animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Powered by Google Gemini
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-[#7f52ff]/20 border border-[#7f52ff]/40 flex items-center justify-center text-[#7f52ff] flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#00f2fe] to-[#2575fc] text-white font-medium shadow-md shadow-[#2575fc]/20 rounded-tr-none"
                        : "bg-white/[0.04] border border-white/10 text-slate-200 rounded-tl-none font-light"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-[#00f2fe]/20 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe] flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading State: AI is typing... */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 justify-start items-center"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#7f52ff]/20 border border-[#7f52ff]/40 flex items-center justify-center text-[#7f52ff] flex-shrink-0">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono animate-pulse">
                      AI is typing
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7f52ff] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2575fc] animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions / Footer Bar */}
            <div className="px-4 pt-2 pb-1 bg-[#04050a]/60 border-t border-white/[0.06] flex gap-1.5 overflow-x-auto no-scrollbar">
              {[
                "Tell me about your projects",
                "What are your top skills?",
                "How can I hire you?",
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/10 text-[11px] text-slate-300 whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
                >
                  ✨ {suggestion}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#04050a]/80 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Bharath's AI anything..."
                disabled={isLoading}
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f2fe]/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00f2fe] to-[#7f52ff] flex items-center justify-center text-white disabled:opacity-40 hover:opacity-90 transition-opacity flex-shrink-0 shadow-lg shadow-[#7f52ff]/20 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING CHAT BUBBLE BUTTON (ROUND CIRCLE WITH BLINKING EYE) ── */}
      <div className="relative group flex items-center">
        {/* Tooltip / Label badge on hover */}
        <span className="absolute right-full mr-3 px-3.5 py-1.5 rounded-2xl bg-[#0a0c16]/95 border border-white/15 text-xs font-mono font-bold text-white whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          {isOpen ? "Close AI Assistant" : "Ask Bharath's AI ✨"}
        </span>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="rounded-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#00f2fe]/30"
          aria-label="Toggle AI Assistant Chatbot"
        >
          <BlinkingEye size="lg" isOpen={isOpen} />
        </motion.button>
      </div>
    </div>
  );
}
