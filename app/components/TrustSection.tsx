"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

/* ------------------ Types ------------------ */

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  impact: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Time is my most valuable currency. Fortune didn't just manage my schedule; she re-architected my entire workflow. I’ve reclaimed 15 hours a week.",
    author: "James V.",
    role: "Tech Founder & CEO",
    impact: "15hrs Reclaimed/Week",
  },
  {
    id: 2,
    content: "Absolute discretion is hard to find. Fortune operates with the precision of a Chief of Staff. She handles our high-stakes launches with zero friction.",
    author: "Sarah L.",
    role: "Venture Partner",
    impact: "Zero-Friction Operations",
  },
  {
    id: 3,
    content: "I no longer check my inbox with anxiety. I know that if it reached my desk, it's because Fortune has already filtered and briefed the solution.",
    author: "Marcus T.",
    role: "Private Equity Executive",
    impact: "100% Decision Clarity",
  },
];

const lgEntrance: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TrustSection() {
  const [index, setIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => setIsMounted(true), []);

  const next = useCallback(() => {
    setIndex((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  // AUTO-PLAY LOGIC
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  if (!isMounted) return <div className="bg-[#0d0617] h-[500px]" />;

  return (
    <section
      id="trust"
      className="relative bg-[#0d0617] py-20 lg:py-32 px-6 lg:px-16 overflow-hidden border-t border-white/10"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_0%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute -left-[10%] top-1/2 -translate-y-1/2 w-[50%] h-[70%] bg-purple-600/15 blur-[140px] rounded-full opacity-50" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT — HEADING */}
          <div className="lg:col-span-4">
            <motion.div
              variants={lgEntrance}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="text-purple-400 font-black tracking-[0.4em] uppercase text-[9px] block mb-4">
                The Gold Standard
              </span>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Validated by <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-fuchsia-300 to-white">
                  Impact Leaders.
                </span>
              </h2>
              <p className="text-white/40 text-xs leading-relaxed max-w-xs font-medium">
                Verifiable operational ROI delivered to high-performance founders and executive teams.
              </p>
            </motion.div>

            {/* Desktop Nav Arrows */}
            <div className="hidden lg:flex items-center gap-4 mt-12">
              <button
                onClick={() => { prev(); setIsAutoPlaying(false); }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-500"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => { next(); setIsAutoPlaying(false); }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-500"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT — CARD */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 lg:p-14 overflow-hidden backdrop-blur-sm"
              >
                <Quote className="text-purple-400 w-10 h-10 mb-8 opacity-30" />

                <p className="text-xl lg:text-3xl font-medium text-white leading-snug tracking-tight mb-12 italic antialiased">
                  &quot;{testimonials[index].content}&quot;
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-black text-xs">
                      {testimonials[index].author[0]}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base tracking-tight">
                        {testimonials[index].author}
                      </h4>
                      <p className="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">
                        {testimonials[index].role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <span className="text-purple-400 font-black text-[8px] uppercase tracking-[0.3em] mb-1">
                      Impact Delivered
                    </span>
                    <span className="text-white font-bold text-sm tracking-tight italic">
                      {testimonials[index].impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* MOBILE NAVIGATION: Pagination Dots + Simple Arrows */}
            <div className="flex lg:hidden items-center justify-between mt-8 px-2">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIndex(i); setIsAutoPlaying(false); }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? "w-8 bg-purple-500" : "w-2 bg-white/10"}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                   onClick={() => { prev(); setIsAutoPlaying(false); }}
                   className="p-3 rounded-full border border-white/5 bg-white/5 text-white active:bg-purple-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                   onClick={() => { next(); setIsAutoPlaying(false); }}
                   className="p-3 rounded-full border border-white/5 bg-white/5 text-white active:bg-purple-600 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}