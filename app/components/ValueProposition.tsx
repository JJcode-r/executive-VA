"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

/* ------------------ Types ------------------ */

type ValueType = "The Problem" | "The Solution" | "The Result";

interface ValueDataItem {
  type: ValueType;
  title: string;
  desc: string;
  glow: string;
}

interface IconProps {
  type: ValueType;
}

/* ------------------ Icon Component ------------------ */

const IconSystem: React.FC<IconProps> = ({ type }) => {
  const commonProps = {
    className: "w-8 h-8 mb-8 transition-transform duration-700 group-hover:scale-110",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "The Problem")
    return (
      <svg {...commonProps} className={`${commonProps.className} text-red-500/40`}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4m0 4h.01" />
      </svg>
    );

  if (type === "The Solution")
    return (
      <svg {...commonProps} className={`${commonProps.className} text-purple-400`}>
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );

  return (
    <svg {...commonProps} className={`${commonProps.className} text-fuchsia-400`}>
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
};

/* ------------------ Main Component ------------------ */

export default function ValueProposition() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const spotlightBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(650px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.1), transparent 80%)`
  );

  const data: ValueDataItem[] = [
    {
      type: "The Problem",
      title: "The Bottleneck",
      desc: "Managing the minutiae instead of the vision creates a ceiling on your own growth and impact.",
      glow: "rgba(239, 68, 68, 0.08)",
    },
    {
      type: "The Solution",
      title: "The Right Hand",
      desc: "A dedicated partner who handles execution, manages communication, and builds systems while you move.",
      glow: "rgba(147, 51, 234, 0.15)",
    },
    {
      type: "The Result",
      title: "Strategic Freedom",
      desc: "Clearer headspace, streamlined operations, and measurable hours returned to your week.",
      glow: "rgba(192, 38, 211, 0.12)",
    },
  ];

  if (!isMounted) return <div className="bg-[#0d0617] py-24" />;

  return (
    <section
      id="value"
      onMouseMove={handleMouseMove}
      className="group relative bg-[#0d0617] pb-12 lg:pb-20 pt-0 px-6 lg:px-16 overflow-hidden border-b border-white/5 -mt-px"
    >
      {/* ------------------ ATMOSPHERIC ELEMENTS ------------------ */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"
      />
      
      {/* Dynamic Cursor Spotlight (Desktop Only) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100 lg:block hidden"
        style={{ background: spotlightBackground }}
      />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 group border-t border-white/10">
          {data.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1.2,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative border-b lg:border-b-0 lg:border-r border-white/5 lg:last:border-r-0"
            >
              <div className="relative h-full px-8 lg:px-16 py-16 lg:py-24 overflow-hidden group/card">
                
                {/* Individual Card Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${item.glow} 0%, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <IconSystem type={item.type} />

                  <div className="flex items-center gap-4 mb-6">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: "20px" }}
                      transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                      className="h-[1px] bg-purple-500"
                    />
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-hover/card:text-purple-400 transition-colors duration-500">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight leading-[1.1] transition-transform duration-700 group-hover/card:-translate-y-1">
                    {item.title}
                  </h3>

                  <p className="text-white/40 text-base lg:text-lg leading-relaxed transition-colors duration-700 group-hover/card:text-white/70 max-w-xs">
                    {item.desc}
                  </p>

                  {item.type === "The Solution" && (
                    <span className="mt-8 block text-[11px] font-medium tracking-wide text-purple-400/70 italic border-l border-purple-500/30 pl-4">
                      &quot;You focus on direction. I handle the day-to-day.&quot;
                    </span>
                  )}
                </div>

                {/* Animated Bottom Border Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2.5, delay: 0.3 + idx * 0.1, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}