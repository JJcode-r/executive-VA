"use client";

import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

/* ------------------ Variants ------------------ */

const lgEntrance: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ServicePillars() {
  const [isMounted, setIsMounted] = useState(false);

  const ctaMouseX = useMotionValue(0);
  const ctaMouseY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCTAMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    ctaMouseX.set(e.clientX - left);
    ctaMouseY.set(e.clientY - top);
  };

  // Enhanced spotlight with a softer amethyst tint
  const ctaSpotlight = useTransform(
    [ctaMouseX, ctaMouseY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(168,85,247,0.12), transparent 80%)`
  );

  const services = [
    {
      number: "01",
      title: "Executive Operations",
      focus: "Precision Management",
      desc: "I don’t just check your email; I curate your digital landscape to ensure your focus remains on high-leverage moves.",
      items: ["Inbox & Calendar Strategy", "Stakeholder Relations", "Gatekeeping & Priority Filtering"],
    },
    {
      number: "02",
      title: "Systems Architecture",
      focus: "Scalable Structure",
      desc: "Transforming manual friction into automated success by building the operational 'nervous system' your business needs.",
      items: ["CRM & Pipeline Optimization", "SOP Development", "Workflow Automation"],
    },
    {
      number: "03",
      title: "Strategic Support",
      focus: "Decision Intelligence",
      desc: "Providing the high-level data and project coordination required to turn a vision into a measurable finish line.",
      items: ["Reporting & Dashboards", "Project Orchestration", "Executive Research"],
    },
  ];

  if (!isMounted) return <div className="bg-[#0d0617] py-24" />;

  return (
    <section className="relative bg-[#0d0617] pb-12 lg:pb-20 pt-0 px-6 lg:px-16 overflow-hidden border-t border-white/10">
      
      {/* ------------------ AMBIENT ATMOSPHERE ------------------ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-600/10 blur-[160px] opacity-40" />
      </div>

      <div className="container mx-auto relative z-10">

        {/* SECTION HEADING */}
        <motion.div
          variants={lgEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 lg:mb-24 pt-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,1)]" />
            <span className="text-purple-400 font-black tracking-[0.4em] uppercase text-[10px]">
              Service Capabilities
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            The Executive Suite:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-200">
              Built for Mastery.
            </span>
          </h2>
        </motion.div>

        {/* ------------------ THE GRID ------------------ */}
        {/* Increased border opacity slightly for better scannability */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 relative z-10 mb-12 lg:mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={lgEntrance}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0d0617] p-10 lg:p-12 hover:bg-white/[0.03] transition-colors duration-700 group/card relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-purple-500 font-black tracking-tighter text-4xl opacity-30 group-hover/card:opacity-100 group-hover/card:text-purple-400 transition-all duration-500">
                  {service.number}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 pt-3 group-hover/card:text-purple-300 transition-colors">
                  {service.focus}
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 tracking-tight group-hover/card:text-white transition-colors duration-500">
                {service.title}
              </h3>

              <p className="text-white/40 text-sm lg:text-base leading-relaxed mb-10 min-h-[80px] group-hover/card:text-white/70 transition-colors">
                {service.desc}
              </p>

              <ul className="space-y-4">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 group-hover/card:bg-purple-500 group-hover/card:shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ------------------ CTA ------------------ */}
        <motion.div
          onMouseMove={handleCTAMouseMove}
          variants={lgEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group/cta flex flex-col lg:flex-row items-center justify-between gap-8 p-10 lg:p-20 border border-white/10 bg-white/[0.02] rounded-[2.5rem] relative transition-all duration-700 hover:border-purple-500/40 overflow-hidden backdrop-blur-sm"
        >
          {/* Mouse Spotlight effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover/cta:opacity-100 hidden lg:block"
            style={{ background: ctaSpotlight }}
          />

          <div className="max-w-xl text-center lg:text-left relative z-10">
            <h4 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to Delegate?
            </h4>
            <p className="text-white/50 text-base lg:text-lg leading-relaxed font-medium">
              Stop managing the minutiae. Let&apos;s architect a workflow that actually works for you.
            </p>
          </div>

          <a href="#contact" className="relative z-10 block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 bg-white text-[#0d0617] text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 hover:bg-purple-500 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer flex items-center gap-3"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)" }}
            >
              Secure Consultation
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}