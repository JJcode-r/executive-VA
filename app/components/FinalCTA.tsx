"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageSquare, Send, CheckCircle2, AlertCircle, ShieldCheck, Zap, UserCheck } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from '@formspree/react';

export default function FinalCTA() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"book" | "inquiry">("book");
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handlePageLoad = () => setShouldLoadIframe(true);

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  const validateAndSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    if (!formData.get("name")) newErrors.name = "Identification required.";
    const email = formData.get("email") as string;
    if (!email) {
      newErrors.email = "Contact channel required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email architecture.";
    }
    if (!formData.get("message")) newErrors.message = "Brief details required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    await handleSubmit(e);
  };

  const handleTabClick = (tab: "book" | "inquiry") => {
    setActiveTab(tab);
  };

  if (!isMounted) return null;

  if (state.succeeded) {
    return (
      <section className="bg-[#0d0617] py-40 px-6 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/10 to-transparent opacity-30" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10">
          <CheckCircle2 className="w-16 h-16 text-[#a855f7] mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">Inquiry Received.</h2>
          <p className="text-white/40 font-medium">Expect an executive brief within 24 hours.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section 
      id="inquiry" 
      className="relative py-12 lg:py-32 px-6 lg:px-16 border-t border-white/5 overflow-hidden bg-[#06030a]"
    >
      {/* --- CREATIVE FLUID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Core Ambient Fill */}
        <div className="absolute inset-0 bg-[#0d0617]" />

        {/* Floating Nebula 01 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-purple-600/20 blur-[120px] rounded-full"
        />

        {/* Floating Nebula 02 */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[#9333ea]/15 blur-[140px] rounded-full"
        />

        {/* Diagonal Light Beam (Glass Streak) */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(115deg,transparent_40%,rgba(168,85,247,0.15)_45%,rgba(217,70,239,0.1)_50%,transparent_55%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* --- LEFT: CONTENT (Original Words Kept) --- */}
          <div className="flex-1 space-y-10 lg:sticky lg:top-32 mt-8 lg:mt-0">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#a855f7] animate-ping" />
                <span className="text-[#a855f7] font-black tracking-[0.4em] uppercase text-[10px]">Take the Lead</span>
              </motion.div>

              <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Ready to Elevate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#d946ef] to-[#93c5fd] italic">Your Workflow?</span>
              </h2>

              <p className="text-white/40 text-sm lg:text-base max-w-lg leading-relaxed font-medium">
                I provide bespoke support tailored to the unique demands of your role. Let’s discuss how I can help you scale your impact.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex p-1 bg-white/5 rounded-xl w-fit border border-white/10 backdrop-blur-md">
                <button 
                  onClick={() => handleTabClick("book")} 
                  className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "book" ? "bg-[#9333ea] text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]" : "text-white/40 hover:text-white"}`}
                >
                  Direct Booking
                </button>
                <button 
                  onClick={() => handleTabClick("inquiry")} 
                  className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "inquiry" ? "bg-[#9333ea] text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]" : "text-white/40 hover:text-white"}`}
                >
                  Custom Inquiry
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                {[
                  { icon: <Zap className="w-4 h-4" />, text: "15-Minute Strategy Alignment" },
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Encrypted Data Handling" },
                  { icon: <UserCheck className="w-4 h-4" />, text: "Direct Executive Response" }
                ].map((prop, i) => (
                  <div key={i} className="flex flex-col gap-2 group">
                    <div className="text-[#a855f7] opacity-50 group-hover:opacity-100 transition-opacity">{prop.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-tight">
                      {prop.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT: INTERACTIVE CONTAINER --- */}
          <div className="flex-[1.2] w-full relative">
            {/* Subtle glow behind the card */}
            <div className="absolute -inset-4 bg-[#9333ea]/10 blur-3xl rounded-[3rem] opacity-30" />
            
            <div className="relative min-h-[600px] w-full">
              {/* BOOKING VIEW: Calendly iframe loads after page load */}
              <div className={`absolute inset-0 transition-all duration-500 z-10 ${activeTab === "book" ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-[0.98]"}`}>
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden h-full shadow-2xl">
                  {shouldLoadIframe && (
                    <iframe 
                      src="https://calendly.com/YOUR_LINK" 
                      width="100%" 
                      height="600" 
                      frameBorder="0" 
                      title="Booking Calendar" 
                      className="invert-[0.05] contrast-[1.1]"
                    />
                  )}
                </div>
              </div>

              {/* INQUIRY VIEW */}
              <div className={`absolute inset-0 transition-all duration-500 z-10 ${activeTab === "inquiry" ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-[0.98]"}`}>
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl h-full">
                  <form onSubmit={validateAndSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#a855f7]">Full Name</label>
                        <input name="name" type="text" placeholder="Full Name" className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white outline-none focus:border-[#a855f7] transition-all`} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#a855f7]">Company Email</label>
                        <input name="email" type="email" placeholder="email@company.com" className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white outline-none focus:border-[#a855f7] transition-all`} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#a855f7]">Message</label>
                      <textarea name="message" rows={4} placeholder="How can I assist you?" className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white outline-none focus:border-[#a855f7] transition-all resize-none`} />
                    </div>
                    <button 
                      type="submit" 
                      disabled={state.submitting} 
                      className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#a855f7] hover:text-white transition-all disabled:opacity-50" 
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 5% 100%)" }}
                    >
                      {state.submitting ? "Processing..." : "Submit Inquiry"} <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}