"use client";

import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import { Cpu, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

/* ------------------ Types ------------------ */

interface StackItem {
  category: string;
  tools: string;
  description: string;
  image: string;
  metric: string;
  color: string;
}

/* ------------------ Data ------------------ */

const stack: StackItem[] = [
  {
    category: "CRM & Sales",
    tools: "HubSpot",
    description: "Architecting clean pipelines and automated lead tracking.",
    image: "https://pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev/hobspot.webp",
    metric: "< 2 Days Setup",
    color: "from-purple-600/30 to-transparent",
  },
  {
    category: "Operations",
    tools: "Trello",
    description: "Centralizing SOPs and project orchestration hubs.",
    image: "https://pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev/trello.png",
    metric: "100% SOP Compliance",
    color: "from-fuchsia-600/30 to-transparent",
  },
  {
    category: "Strategy",
    tools: "Sheets",
    description: "Turning raw data into decision-ready executive reporting.",
    image: "https://pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev/sheets.jpg",
    metric: "5x Faster Reporting",
    color: "from-purple-500/30 to-transparent",
  },
];

/* ------------------ Variants ------------------ */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------ Component ------------------ */

export default function TechStack() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const ctaMouseX = useMotionValue<number>(0);
  const ctaMouseY = useMotionValue<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCTAMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    ctaMouseX.set(e.clientX - left);
    ctaMouseY.set(e.clientY - top);
  };

  const ctaSpotlight = useTransform(
    [ctaMouseX, ctaMouseY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.2), transparent 80%)`
  );

  if (!isMounted) return <div className="bg-[#0d0617] h-screen" />;

  return (
    <section id="tech" className="bg-[#0d0617] pb-12 lg:pb-20 pt-0 px-6 lg:px-16 border-t border-white/10 relative overflow-hidden">
      
      {/* ------------------ BRIGHTER PURPLE ATMOSPHERE ------------------ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_15%_50%,rgba(147,51,234,0.12)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_85%_20%,rgba(192,38,211,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      <div className="container mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start text-left mb-16 lg:mb-24 pt-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-black tracking-[0.4em] uppercase text-[10px]">
              The Digital Ecosystem
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-10"
          >
            Plug-and-Play{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-200">
              Integration.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-white/50 text-sm lg:text-base max-w-xl leading-relaxed font-medium"
          >
            I operate within your existing stack to eliminate learning curves. 
            I specialize in architecting high-performance environments that scale with your executive demands.
          </motion.p>
        </div>

        {/* STACK GRID */}
        <div className="grid grid-cols-1 gap-20 lg:gap-32 mb-12 lg:mb-20">
          {stack.map((item, idx) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col lg:items-center ${
                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 lg:gap-24`}
            >
              <div className="flex-1 space-y-8 text-left">
                <div className="space-y-4">
                  <span className="text-purple-400 font-bold text-xs uppercase tracking-[0.3em]">
                    {item.category}
                  </span>
                  <h3 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                    {item.tools}
                  </h3>
                </div>

                <p className="text-white/40 text-sm lg:text-base leading-relaxed max-w-md font-medium">
                  {item.description}
                </p>

                <div className="flex flex-row items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span className="text-2xl lg:text-3xl text-white font-black tracking-tighter">
                      {item.metric}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-[1.5] w-full group relative">
                <div
                  className={`absolute -inset-10 bg-gradient-to-br ${item.color} blur-[120px] opacity-30 group-hover:opacity-60 transition-opacity duration-700`}
                />
                <motion.div
                  className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-purple-400/50"
                  whileHover={{ y: -8 }}
                >
                  <div className="h-10 bg-white/10 border-b border-white/10 flex items-center px-6 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>

                  <div className="aspect-[16/10] bg-[#0A0A0A] relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.tools}
                      fill
                      className="object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA CARD */}
        <motion.div
          onMouseMove={handleCTAMouseMove}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group/cta flex flex-col lg:flex-row items-center justify-between gap-8 p-10 lg:p-20 border border-white/20 bg-white/[0.02] rounded-[2.5rem] relative transition-all duration-700 hover:border-purple-400/40 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover/cta:opacity-100 hidden lg:block"
            style={{ background: ctaSpotlight }}
          />

          <div className="max-w-xl text-center lg:text-left relative z-10">
            <h4 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              Don’t see your stack?
            </h4>
            <p className="text-white/50 text-base lg:text-lg leading-relaxed">
              I am platform-agnostic. If your tool has an API or a login, I can master the workflow in days.
            </p>
          </div>

          <a href="#contact" className="relative z-10 block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-[#0d0617] text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 hover:bg-purple-600 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center gap-3"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 5% 100%)" }}
            >
              Check Compatibility
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}