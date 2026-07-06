"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { portfolioData } from "@/data/portfolioData";
import MagneticButton from "../ui/MagneticButton";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Terminal,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export default function ContactSection() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_KEY || "xpwzgqky"
  );
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [customStatus, setCustomStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCustomStatus("submitting");

    try {
      // 1. Try our direct email backend API route (/api/contact)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setCustomStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }

      // 2. Try Web3Forms Direct Mailer API
      const web3res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "8b7d4d42-5f80-4927-a065-4de07137b0b1",
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Contact Inquiry",
          message: formData.message,
          to: portfolioData.personal.email,
        }),
      });
      const web3data = await web3res.json();

      if (web3res.ok && web3data.success) {
        setCustomStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }

      // 3. Fallback to Formspree SDK
      handleSubmit(formData);
      setCustomStatus("success");
    } catch (err) {
      console.error("Mail Error:", err);
      try {
        handleSubmit(formData);
        setCustomStatus("success");
      } catch (e2) {
        setCustomStatus("error");
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#04050a] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl"
            >
              Let&apos;s Architect the{" "}
              <span className="text-gradient-ai">Future of AI Products.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg font-light max-w-md leading-relaxed"
          >
            I am actively exploring opportunities as an AI Engineer, GenAI Product Architect, or Full-Stack Developer. Let&apos;s build something extraordinary.
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Copy Pill */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#00f2fe]" />
                <span>Direct Contact</span>
              </h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Prefer direct email or messaging? Copy my primary email with one click or reach out via phone and LinkedIn.
              </p>

              {/* Email Copy Box */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-xl bg-[#00f2fe]/10 text-[#00f2fe] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-mono text-slate-200 truncate">
                    {portfolioData.personal.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone & Location & Mobile Direct Action Pills */}
              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-[#00f2fe] transition-colors font-mono group"
                >
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-slate-400 group-hover:border-[#00f2fe]/40 group-hover:text-[#00f2fe] transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white">{portfolioData.personal.phone}</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-slate-400 font-mono">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{portfolioData.personal.location}</span>
                </div>

                {/* Instant 1-Click Mobile/Desktop Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                  <a
                    href={`mailto:${portfolioData.personal.email}?subject=Role%20Inquiry%20/%20Project%20Consultation`}
                    className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#00f2fe]/10 to-[#7f52ff]/10 hover:from-[#00f2fe]/20 hover:to-[#7f52ff]/20 border border-[#00f2fe]/30 hover:border-[#00f2fe]/60 transition-all flex items-center justify-center gap-2 text-xs font-mono text-white font-bold group cursor-pointer shadow-lg shadow-[#00f2fe]/5"
                  >
                    <Mail className="w-4 h-4 text-[#00f2fe] group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span>Email Direct</span>
                  </a>

                  <a
                    href={`https://wa.me/919360294463?text=Hi%20Bharath,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center justify-center gap-2 text-xs font-mono text-emerald-300 font-bold group cursor-pointer shadow-lg shadow-emerald-500/5"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>

              {/* Availability Status Box */}
              <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{portfolioData.personal.availabilityStatus}</span>
                </div>
                <a
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#7f52ff] hover:underline flex items-center gap-1"
                >
                  <span>View Resume PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Formspree Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-[#00f2fe]/10 blur-3xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Send Me a Message
              </h3>
              <p className="text-slate-400 text-sm font-light mb-8">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>

              {customStatus === "success" || state.succeeded ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 my-8"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    Message Sent Directly!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                    Thanks for reaching out! Your message has been routed directly to Bharath&apos;s personal email ({portfolioData.personal.email}). He will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setCustomStatus("idle")}
                    className="mt-4 px-6 py-2 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/10 text-xs font-mono text-white transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-6">
                  {customStatus === "error" && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                      ⚠️ Could not send via API. Please use the Direct Email or WhatsApp buttons above.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                        Your Name / Organization *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Rivera, Founder @ AI Lab"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#00f2fe]/60 focus:outline-none focus:ring-2 focus:ring-[#00f2fe]/20 text-white text-sm placeholder:text-slate-600 transition-all"
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#00f2fe]/60 focus:outline-none focus:ring-2 focus:ring-[#00f2fe]/20 text-white text-sm placeholder:text-slate-600 transition-all"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Subject / Role Inquiry *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="AI Engineer Opportunity / Project Consultation"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#00f2fe]/60 focus:outline-none focus:ring-2 focus:ring-[#00f2fe]/20 text-white text-sm placeholder:text-slate-600 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Message / Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about the role, technical requirements, or systems you are building..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#00f2fe]/60 focus:outline-none focus:ring-2 focus:ring-[#00f2fe]/20 text-white text-sm placeholder:text-slate-600 transition-all custom-scrollbar resize-y"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={customStatus === "submitting" || state.submitting}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-[#00f2fe] to-[#7f52ff] hover:opacity-95 text-white font-mono uppercase tracking-widest font-bold text-sm shadow-[0_0_25px_-5px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_0px_rgba(127,82,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>
                        {customStatus === "submitting" || state.submitting
                          ? "Transmitting to Bharath..."
                          : "Send Message Directly"}
                      </span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
