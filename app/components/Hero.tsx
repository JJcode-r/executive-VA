"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  Variants,
} from "framer-motion";
import { useEffect, useState } from "react";

/* ------------------ Variants ------------------ */
const emergenceContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

/* ------------------ Component ------------------ */
export default function Hero() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const allowMotion = !shouldReduceMotion && !isMobile;

  const yTwist = useTransform(scrollY, [0, 600], [0, allowMotion ? -80 : 0]);
  const bgShift = useTransform(scrollY, [0, 1000], [0, allowMotion ? 120 : 0]);

  return (
    <section className="relative min-h-[95dvh] flex items-center bg-[#0d0617] px-6 lg:px-16 pt-32 pb-20 overflow-hidden">
      
      {/* ------------------ BACKGROUND AMBIENCE ------------------ */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Enhanced Purple Glow */}
        <motion.div
          animate={allowMotion ? { 
            scale: [1, 1.12, 1],
            opacity: [0.1, 0.25, 0.1] 
          } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: bgShift }}
          className="absolute top-[-25%] left-[-15%] w-[120vw] h-[120vw] bg-purple-600/25 blur-[180px] rounded-full"
        />

        {/* Noise & Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(#581c87_1px,transparent_1px)] [background-size:70px_70px] opacity-[0.15]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* ------------------ TEXT COLUMN ------------------ */}
          <motion.div
            className="lg:col-span-7"
            variants={emergenceContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Tagline */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="text-purple-400 font-black tracking-[0.5em] uppercase text-[10px] flex items-center gap-3">
                <span className="h-[1px] w-8 bg-purple-500/50" />
                Executive Precision
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tighter mb-6">
              {"Strategic Support".split(" ").map((word, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                variants={fadeInUp}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-200"
              >
                that buys back your time.
              </motion.span>
            </motion.h1>

            {/* Subheading / Microcopy */}
            <motion.p
              variants={fadeInUp}
              className="text-purple-100/70 text-lg md:text-xl max-w-lg leading-relaxed mb-10 font-light"
            >
              I handle the operational complexities so you can focus on vision and growth. 
              Trusted by executives to deliver precision-led, confidential, high-impact support.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6">
              <a href="#contact">
                <button className="relative px-10 py-5 bg-purple-600 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_35px_rgba(147,51,234,0.35)] transition-all duration-500 hover:bg-white hover:text-[#0d0617] active:scale-95">
                  Secure Consultation
                  <span className="block text-[9px] text-purple-200 font-light mt-1">Limited executive slots available</span>
                </button>
              </a>

              <a href="#portfolio">
                <button className="group text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-colors hover:text-purple-400">
                  <span className="w-10 h-[1px] bg-purple-900 group-hover:w-16 group-hover:bg-purple-400 transition-all duration-500" />
                  My Impact
                </button>
              </a>
            </motion.div>
          </motion.div>

          {/* ------------------ IMAGE COLUMN ------------------ */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="relative group">
              {/* Main Image Frame */}
              <div className="relative h-[450px] lg:h-[580px] w-full overflow-hidden border border-white/5 shadow-2xl z-20 rounded-2xl">
                <Image
                  src="https://pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev/Hero1.png"
                  alt="Fortune Chamberlain"
                  fill
                  priority
                  className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                />

                {/* Floating Label Overlay */}
                <div className="absolute bottom-8 right-8 text-right z-30 drop-shadow-lg">
                  <p className="text-white text-[12px] font-black tracking-widest uppercase mb-1">Fortune Chamberlain</p>
                  <div className="h-[1px] w-8 bg-purple-500 ml-auto mb-2" />
                  <p className="text-purple-400 text-[9px] font-black tracking-[0.3em] uppercase">Executive Assistant</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0617]/80 via-transparent to-transparent" />
              </div>

              {/* FLOATING PRECISION DETAIL */}
              <motion.div
                style={{ y: yTwist }}
                className="hidden lg:block absolute -bottom-10 -left-10 w-44 h-44 border-[12px] border-[#0d0617] bg-[#0d0617] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-40 overflow-hidden rounded-xl"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="https://pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev/Hero2.png"
                    alt="Detail"
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-purple-600/10 mix-blend-overlay" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
