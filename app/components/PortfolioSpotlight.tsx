"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Users,
  Clock,
  Rocket,
  ChevronRight,
  ChevronDown,
  Activity,
  Zap,
  Target
} from "lucide-react";

/* ------------------ Types ------------------ */

interface Scenario {
  id: string;
  label: string;
  category: string; // NEW
  title: string;
  challenge: string;
  intervention: string[];
  metric: string;
  unit: string;
  subtext: string;
  secondary: string;
  icon: React.ReactNode;
  bgGradient: string;
  accentColor: string; // NEW
}

const scenarios: Scenario[] = [
  {
    id: "leadership",
    label: "Case Study 01",
    category: "System Architecture",
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
    accentColor: "bg-purple-500",
  },
  {
    id: "operations",
    label: "Case Study 02",
    category: "Operational Scaling",
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
    accentColor: "bg-fuchsia-400",
  },
  {
    id: "strategic",
    label: "Case Study 03",
    category: "Strategic Execution",
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
    bgGradient: "from-indigo-400/25 to-transparent",
    accentColor: "bg-indigo-400",
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
          <div className="lg:col-span-5 flex flex-col gap-5">
            {scenarios.map((item) => {
              const isActive = active.id === item.id;
              const isExpandedOnMobile = mobileExpandedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border transition-all duration-700 overflow-hidden ${
                    isActive
                      ? "bg-white/[0.07] border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                      : "bg-transparent border-white/5 opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* ACTIVE INDICATOR BAR */}
                  <motion.div 
                    className={`absolute left-0 top-0 bottom-0 w-1 ${item.accentColor} z-30`}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                  />

                  <button
                    onClick={() => handleInteraction(item)}
                    className="w-full text-left p-6 lg:p-8 relative z-10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        {/* ICON UPGRADE */}
                        <div className={`relative p-3.5 rounded-2xl transition-all duration-500 ${
                          isActive 
                            ? `${item.accentColor} text-white scale-110 rotate-3 shadow-[0_0_20px_rgba(168,85,247,0.4)]` 
                            : "bg-white/5 text-white/30 group-hover:bg-white/10"
                        }`}>
                          {item.icon}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isActive ? "text-purple-300" : "text-white/30"}`}>
                              {item.label}
                            </span>
                            <span className={`h-1 w-1 rounded-full ${isActive ? "bg-purple-500" : "bg-white/10"}`} />
                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                                {item.category}
                            </span>
                          </div>
                          <h3 className={`text-lg lg:text-xl font-bold tracking-tight transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <div className="lg:hidden">
                        {isExpandedOnMobile ? <ChevronDown className="w-5 h-5 text-purple-400" /> : <ChevronRight className="w-5 h-5 text-white/10" />}
                      </div>
                    </div>
                  </button>

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
                            <div className="px-3 py-1 rounded-full border border-white/10 text-white/60 text-[9px] font-black uppercase bg-white/5">
                                {item.secondary}
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {item.intervention.map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-xs text-white/70">
                                    <Zap className="w-3 h-3 text-purple-500 mt-0.5 shrink-0" />
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
                      className={`absolute bottom-0 left-0 h-[2px] ${item.accentColor} z-20 shadow-[0_0_10px_rgba(168,85,247,0.5)]`}
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
            <div className="relative h-[620px] w-full bg-[#0d0617] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
              {/* Background Ambient Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(88,28,135,0.15),transparent_70%)]" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 p-16 flex flex-col z-10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${active.bgGradient} opacity-20 blur-[100px] -z-10`} />
                  
                  <div className="flex justify-between items-start mb-16">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-3 h-3 text-purple-500" />
                        <h4 className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em]">Impact Analysis</h4>
                      </div>
                      <div className="text-9xl font-black text-white tracking-tighter flex items-end">
                        {active.metric}<span className="text-purple-500 text-5xl ml-2 mb-4">{active.unit}</span>
                      </div>
                      <p className="text-white/50 text-base mt-6 max-w-[320px] leading-relaxed font-light italic">
                        &ldquo;{active.subtext}&rdquo;
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        <div className="px-5 py-2 rounded-full border border-purple-500/40 text-purple-300 text-[10px] font-black uppercase bg-purple-500/10 backdrop-blur-md">
                        {active.secondary}
                        </div>
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d0617] bg-white/10" />
                            ))}
                        </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <Target className="w-4 h-4 text-purple-500" />
                        <h4 className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Strategic Implementation</h4>
                    </div>
                    <ul className="grid grid-cols-1 gap-4">
                      {active.intervention.map((point, i) => (
                        <motion.li 
                            key={i} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-sm text-white/80 group hover:border-purple-500/30 hover:bg-white/[0.05] transition-all"
                        >
                          <div className="w-2 h-2 rounded-full bg-purple-600 group-hover:scale-150 transition-transform" />
                          {point}
                        </motion.li>
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