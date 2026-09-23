"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Bot, User, RefreshCw } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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
      size === "lg" ? "w-12 h-12 sm:w-16 sm:h-16" : "w-8 h-8"
    }`}
  >
    {size === "lg" && (
      <>
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] opacity-60 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />
        <span className="absolute inset-0 rounded-full border border-[var(--accent-primary)]/50 animate-ping opacity-30" />
      </>
    )}

    <div
      className={`relative rounded-full bg-[var(--bg-surface)] border border-[var(--card-border)] flex items-center justify-center shadow-md transition-all ${
        size === "lg" ? "w-12 h-12 sm:w-16 sm:h-16 group-hover:scale-105" : "w-8 h-8"
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
              size === "lg" ? "w-5 h-5 sm:w-7 sm:h-7" : "w-4 h-4"
            } text-[var(--accent-primary)]`}
          />
        </motion.div>
      ) : (
        <div className="flex items-center justify-center gap-1 sm:gap-1.5">
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
              size === "lg" ? "w-2 sm:w-2.5 h-3.5 sm:h-5" : "w-1.5 h-3"
            } rounded-full bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)]`}
          />
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
              size === "lg" ? "w-2 sm:w-2.5 h-3.5 sm:h-5" : "w-1.5 h-3"
            } rounded-full bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)]`}
          />
        </div>
      )}

      {size === "lg" && !isOpen && (
        <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-[var(--bg-surface)]" />
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
  const { theme } = useTheme();

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

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[calc(100vw-32px)] sm:w-[380px] md:w-[400px] h-[480px] sm:h-[540px] mb-4 rounded-3xl bg-[var(--bg-surface)] backdrop-blur-2xl border border-[var(--card-border)] shadow-2xl flex flex-col overflow-hidden text-[var(--text-primary)] transition-colors duration-300"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[var(--card-bg)] border-b border-[var(--card-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <BlinkingEye size="sm" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--bg-surface)] z-10" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
                      Bharath AI Assistant
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)] animate-pulse" />
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] font-medium">
                    Powered by Google Gemini
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent-secondary)]/20 border border-[var(--accent-secondary)]/40 flex items-center justify-center text-[var(--accent-secondary)] flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-medium shadow-md rounded-tr-none"
                        : "bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-tl-none font-light"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/40 flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 justify-start items-center"
                >
                  <div className="w-7 h-7 rounded-lg bg-[var(--accent-secondary)]/20 border border-[var(--accent-secondary)]/40 flex items-center justify-center text-[var(--accent-secondary)] flex-shrink-0">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <span className="text-xs text-[var(--text-secondary)] font-mono animate-pulse">
                      AI is typing
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-tertiary)] animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 pt-2 pb-1 bg-[var(--card-bg)] border-t border-[var(--card-border)] flex gap-1.5 overflow-x-auto no-scrollbar">
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
                  className="px-2.5 py-1 rounded-full bg-[var(--card-border)] hover:bg-[var(--card-hover-border)] text-[11px] text-[var(--text-secondary)] whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
                >
                  ✨ {suggestion}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[var(--bg-surface)] border-t border-[var(--card-border)] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Bharath's AI anything..."
                disabled={isLoading}
                className="flex-1 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white disabled:opacity-40 hover:opacity-90 transition-opacity flex-shrink-0 shadow-md cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CHAT BUBBLE BUTTON */}
      <div className="relative group flex items-center">
        <span className="absolute right-full mr-3 px-3.5 py-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--card-border)] text-xs font-mono font-bold text-[var(--text-primary)] whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          {isOpen ? "Close AI Assistant" : "Ask Bharath's AI ✨"}
        </span>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="rounded-full cursor-pointer focus:outline-none"
          aria-label="Toggle AI Assistant Chatbot"
        >
          <BlinkingEye size="lg" isOpen={isOpen} />
        </motion.button>
      </div>
    </div>
  );
}
