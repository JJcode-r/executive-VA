"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Users,
  Clock,
  Rocket,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

/* ------------------ Types ------------------ */

interface Scenario {
  id: string;
  label: string;
  title: string;
  challenge: string;
  intervention: string[];
  metric: string;
  unit: string;
  subtext: string;
  secondary: string;
  icon: React.ReactNode;
  bgGradient: string;
}

const scenarios: Scenario[] = [
  {
    id: "leadership",
    label: "Case Study 01",
    title: "Workflow Overhaul for Leadership",
    challenge: "Disorganized admin causing missed opportunities.",
    intervention: [
      "Unified digital ecosystem (Calendly + HubSpot)",
      "Automated lead filtering & pipeline entry",
      "Custom tracking in Google Sheets for reporting",
    ],
    metric: "12",
    unit: "hrs",
    subtext: "Strategic time returned to the executive weekly.",
    secondary: "0% Manual Friction",
    icon: <Clock className="w-5 h-5" />,
    bgGradient: "from-purple-600/30 to-transparent",
  },
  {
    id: "operations",
    label: "Case Study 02",
    title: "Operations for Scaling Teams",
    challenge: "Rapid hiring bottlenecks communications and SOPs.",
    intervention: [
      "Centralized Knowledge Base in Notion",
      "Automated Team Onboarding Workflows",
      "Internal Communication structural audit",
    ],
    metric: "40",
    unit: "%",
    subtext: "Increase in project velocity across departments.",
    secondary: "100% SOP Compliance",
    icon: <Users className="w-5 h-5" />,
    bgGradient: "from-fuchsia-500/25 to-transparent",
  },
  {
    id: "strategic",
    label: "Case Study 03",
    title: "Support for High-Stakes Launch",
    challenge: "No centralized tracking or stakeholder management.",
    intervention: [
      "End-to-End Project Mapping & Scheduling",
      "Stakeholder Liaison & Daily Briefings",
      "Risk Mitigation & Contingency Planning",
    ],
    metric: "Zero",
    unit: "Miss",
    subtext: "Deadlines met consistently over 6 months.",
    secondary: "2.5x ROI on Op-Spend",
    icon: <Rocket className="w-5 h-5" />,
    bgGradient: "from-purple-400/25 to-transparent",
  },
];

const lgEntrance: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PortfolioSpotlight() {
  const [active, setActive] = useState<Scenario>(scenarios[0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  // NEW: State specifically for mobile expansion to prevent auto-bounce
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

  const rotate = useCallback(() => {
    setActive((prev) => {
      const currentIndex = scenarios.findIndex((s) => s.id === prev.id);
      return scenarios[(currentIndex + 1) % scenarios.length];
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(rotate, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, rotate]);

  useEffect(() => {
    setProgress(0);
    if (!isAutoPlaying) {
      setProgress(100);
      return;
    }
    const step = (50 / 6000) * 100;
    const timer = setInterval(() => {
      setProgress((old) => Math.min(old + step, 100));
    }, 50);
    return () => clearInterval(timer);
  }, [active, isAutoPlaying]);

  const handleInteraction = (item: Scenario) => {
    setActive(item);
    setIsAutoPlaying(false);
    // On click, toggle the mobile expansion for THIS specific card
    setMobileExpandedId(mobileExpandedId === item.id ? null : item.id);
  };

  return (
    <section
      id="portfolio"
      className="relative bg-[#0d0617] py-24 lg:py-40 px-6 lg:px-16 border-t border-white/10 overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          variants={lgEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div>
            <span className="text-purple-400 font-black tracking-[0.4em] uppercase text-[10px] block mb-4">
              The System in Action
            </span>
            <h2 className="text-3xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              From Operational Friction <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-fuchsia-300 to-purple-200">
                to Seamless Flow.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 w-fit backdrop-blur-md">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-purple-500 animate-pulse" : "bg-purple-300"}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
              {isAutoPlaying ? "Auto-Cycling Framework" : "Manual Selection Active"}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* LEFT SELECTOR */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {scenarios.map((item) => {
              const isActive = active.id === item.id;
              const isExpandedOnMobile = mobileExpandedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "bg-white/[0.05] border-purple-500/50"
                      : "bg-transparent border-white/5 opacity-60"
                  }`}
                >
                  <button
                    onClick={() => handleInteraction(item)}
                    className="w-full text-left p-6 lg:p-8 relative z-10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className={`p-3 rounded-xl ${isActive ? "bg-purple-600 text-white" : "bg-white/5 text-white/20"}`}>
                          {item.icon}
                        </div>
                        <div>
                          <span className={`text-[9px] font-black uppercase tracking-[0.3em] block mb-1 ${isActive ? "text-purple-300" : "text-white/30"}`}>
                            {item.label}
                          </span>
                          <h3 className={`text-lg lg:text-xl font-bold ${isActive ? "text-white" : "text-white/60"}`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <div className="lg:hidden">
                        {isExpandedOnMobile ? <ChevronDown className="w-5 h-5 text-purple-400" /> : <ChevronRight className="w-5 h-5 text-white/10" />}
                      </div>
                    </div>
                  </button>

                  {/* MOBILE-ONLY DETAIL: Strictly controlled by mobileExpandedId */}
                  <AnimatePresence>
                    {isExpandedOnMobile && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="lg:hidden px-6 pb-8 space-y-6 relative z-10 border-t border-white/5 pt-6 bg-white/[0.02]"
                      >
                        <div className="flex justify-between items-center">
                            <div className="text-4xl font-black text-white">
                                {item.metric}<span className="text-purple-400 text-lg ml-1">{item.unit}</span>
                            </div>
                            <div className="px-3 py-1 rounded-full border border-purple-500/40 text-purple-300 text-[9px] font-black uppercase">
                                {item.secondary}
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {item.intervention.map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-xs text-white/70">
                                    <div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress Bar */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-purple-600 z-20"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* DESKTOP DETAIL */}
          <div className="hidden lg:block lg:col-span-7 sticky top-40">
            <div className="relative h-[600px] w-full bg-white/[0.03] border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 p-16 flex flex-col"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${active.bgGradient} opacity-30 blur-3xl -z-10`} />
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <h4 className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Metric Impact</h4>
                      <div className="text-8xl font-black text-white tracking-tighter">
                        {active.metric}<span className="text-purple-400 text-4xl ml-2">{active.unit}</span>
                      </div>
                      <p className="text-white/40 text-sm mt-4 max-w-[240px] leading-relaxed">{active.subtext}</p>
                    </div>
                    <div className="px-5 py-2 rounded-full border border-purple-500/40 text-purple-300 text-[10px] font-black uppercase">
                      {active.secondary}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h4 className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Execution Strategy</h4>
                    <ul className="grid grid-cols-1 gap-4">
                      {active.intervention.map((point, i) => (
                        <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}