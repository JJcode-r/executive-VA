"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

/* ------------------ Counter Component ------------------ */

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

/* ------------------ About Section ------------------ */

export default function AboutSection() {
  const pillars = [
    { title: "Absolute Discretion", desc: "Handling high-stakes information with the silence and security of a Chief of Staff." },
    { title: "Anticipatory Action", desc: "Solving bottlenecks before they reach your desk. I don't just react; I architect." },
    { title: "Precision Execution", desc: "Zero-margin-for-error delivery on complex projects and executive operations." },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isLg, setIsLg] = useState<boolean>(false);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  useEffect(() => {
    setIsLg(window.innerWidth >= 1024);
    const handleResize = () => setIsLg(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const sectionAnimation: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  };

  useEffect(() => {
    if (isLg && sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHasEntered(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(sectionRef.current);
    } else {
      setHasEntered(true); 
    }
  }, [isLg]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative bg-[#0d0617] pb-24 lg:pb-40 pt-12 lg:pt-20 px-6 lg:px-16 overflow-hidden -mt-px"
      initial="hidden"
      animate={hasEntered ? "show" : "hidden"}
      variants={isLg ? sectionAnimation : {}}
    >
      {/* ------------------ BACKGROUND AMBIENCE ------------------ */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* IMAGE COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl rounded-2xl">
              <Image
                src="https://pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev/Hero2.png"
                alt="Fortune Chamberlain"
                fill
                className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[1500ms] ease-in-out scale-105 group-hover:scale-100"
                priority
              />
              <div className="absolute inset-0 bg-purple-900/10 mix-blend-color pointer-events-none group-hover:opacity-0 transition-opacity duration-[1500ms]" />
              <div className="absolute top-6 left-6 z-20">
                 <div className="h-8 w-[1px] bg-purple-400 mb-2" />
                 <p className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-bold [writing-mode:vertical-lr]">Principal</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0617]/90 via-transparent to-transparent" />
            </div>

            {/* ENHANCED DATA BADGES (Glassmorphism) */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 flex flex-col gap-4 lg:gap-6 z-30">
              <motion.div variants={fadeInUp} initial="hidden" whileInView="show" 
                className="bg-purple-600/90 backdrop-blur-md p-6 lg:p-8 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-xl">
                <p className="text-white font-black text-3xl lg:text-4xl leading-none italic">
                  <Counter value={2} />+
                </p>
                <p className="text-white/80 text-[9px] lg:text-[10px] uppercase tracking-widest mt-2 font-bold">Years of Ops</p>
              </motion.div>

              <motion.div variants={fadeInUp} initial="hidden" whileInView="show" 
                className="bg-white/90 backdrop-blur-md p-5 lg:p-6 border border-white/20 shadow-2xl rounded-xl">
                <p className="text-black font-black text-xl lg:text-2xl leading-none italic">
                  <Counter value={50} />
                  <span className="text-sm">00+</span>
                </p>
                <p className="text-black/60 text-[9px] lg:text-[10px] uppercase tracking-widest mt-1 font-bold">Hours Saved</p>
              </motion.div>
            </div>
          </motion.div>

          {/* TEXT COLUMN */}
          <motion.div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.1 }}>
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
                <span className="text-purple-400 font-black tracking-[0.4em] uppercase text-[10px] block">Meet Your Virtual Assistant</span>
                <div className="h-[1px] flex-grow bg-white/10" />
              </motion.div>

              <motion.h2 variants={fadeInUp} className="text-4xl lg:text-7xl font-extrabold text-white mb-8 tracking-tighter leading-none">
                Fortune <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-fuchsia-300 to-purple-200">
                  Chamberlain.
                </span>
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-white/60 text-base lg:text-xl leading-relaxed mb-10 lg:mb-12 max-w-2xl font-medium">
                I don’t just manage calendars, I protect your focus. For founders and executives at full capacity, I act as an extension of your leadership, ensuring every operational detail is executed with clinical precision.
              </motion.p>

              {/* PILLARS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
                {pillars.map((pillar, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="group relative">
                    <div className="absolute -left-4 top-0 h-full w-[1px] bg-purple-500/20 group-hover:bg-purple-400 transition-all duration-500" />
                    <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-3 group-hover:text-purple-400 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-white/40 text-[13px] leading-relaxed group-hover:text-white/70 transition-colors">
                      {pillar.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}