"use client";

import React, { useState, useEffect, useCallback } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

const SECTIONS: readonly string[] = [
  "value",
  "about",
  "pillars",
  "portfolio",
  "testimonials",
  "tech",
  "trusts",
  "contact",
];

const SCROLL_OFFSET = 160;
const SCROLL_TRIGGER = 20;

// CHANGED: From JSX.Element to React.ReactNode (or you can remove it entirely)
export default function Navbar(): React.ReactNode {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = useCallback((): void => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > SCROLL_TRIGGER);

    if (scrollY < 100) {
      setActiveSection("");
      return;
    }

    let currentActive = "";
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= SCROLL_OFFSET && rect.bottom >= SCROLL_OFFSET) {
        currentActive = `#${id}`;
        break;
      }
    }
    setActiveSection(currentActive);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks: readonly NavLink[] = [
    { name: "Value", href: "#value" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#pillars" },
    { name: "Impact", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Tech", href: "#tech" },
    { name: "Security", href: "#trusts" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[100] px-6 lg:px-16 pointer-events-none"
      >
        <div className="container mx-auto py-6">
          <div
            className={`flex items-center justify-between pointer-events-auto transition-all duration-500 ease-in-out px-6 lg:px-8 w-full
              ${
                scrolled
                  ? "bg-[#090411]/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl py-2"
                  : "bg-transparent border border-transparent rounded-none py-4"
              }`}
          >
            {/* LOGO */}
            <div
              className="flex items-center gap-3 group cursor-pointer relative z-[110]"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("");
              }}
            >
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:bg-purple-500 transition-colors">
                <span className="text-white font-black text-[10px]">EA</span>
              </div>
              <span className="text-white font-bold tracking-[0.3em] uppercase text-[10px] hidden md:block">
                Executive <span className="font-light text-white/40">Aero</span>
              </span>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ name, href }) => (
                <a
                  key={href}
                  href={href}
                  className={`text-[9px] font-black tracking-[0.25em] uppercase transition-all duration-300 relative group
                    ${activeSection === href ? "text-purple-400" : "text-white/50 hover:text-white"}`}
                >
                  {name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] bg-purple-500 transition-all duration-500
                      ${activeSection === href ? "w-full" : "w-0 group-hover:w-full"}`}
                    style={{ width: activeSection === href ? '100%' : '' }}
                  />
                </a>
              ))}
            </div>

            {/* ACTION */}
            <div className="flex items-center gap-6 relative z-[110]">
              <a href="#contact" className="hidden lg:block">
                <button
                  className={`px-6 py-2.5 text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-500
                    ${activeSection === "#contact"
                        ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                        : "bg-white text-[#090411] hover:bg-purple-600 hover:text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                    }`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)" }}
                >
                  Secure Consultation
                </button>
              </a>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex flex-col gap-1.5 w-6 group pointer-events-auto"
                aria-label="Open menu"
              >
                <span className="h-0.5 w-full bg-white group-hover:bg-purple-400 transition-all" />
                <span className="h-0.5 w-full bg-white group-hover:bg-purple-400 transition-all" />
                <span className="h-0.5 w-full bg-white group-hover:bg-purple-400 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#090411]/95 backdrop-blur-xl z-[120]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-[#090411] border-l border-white/10 z-[130] flex flex-col"
            >
              {/* FIXED HEADER INSIDE DRAWER */}
              <div className="p-8 flex items-center justify-between border-b border-white/5 shrink-0">
                 <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-black text-[8px]">EA</span>
                    </div>
                    <span className="text-white font-bold tracking-[0.2em] uppercase text-[10px]">Menu</span>
                 </div>
                 <button 
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-full bg-white/5 text-white/40 hover:text-white"
                 >
                    <X size={20} />
                 </button>
              </div>

              {/* SCROLLABLE CONTENT AREA */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <nav className="flex flex-col py-12 px-12 gap-8">
                  {navLinks.map(({ name, href }, i) => (
                      <motion.a
                          key={href}
                          href={href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (i * 0.05) }}
                          onClick={() => setMobileOpen(false)}
                          className={`text-xl font-black uppercase tracking-[0.4em] flex items-center justify-between group
                              ${activeSection === href ? "text-purple-400" : "text-white/40 hover:text-white"}`}
                      >
                          <span>{name}</span>
                          <ArrowRight size={16} className={`transition-transform duration-300 ${activeSection === href ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </motion.a>
                  ))}
                </nav>

                <div className="px-8 pb-20 mt-8"> 
                  <a 
                      href="#contact" 
                      onClick={() => setMobileOpen(false)}
                      className="w-full block"
                  >
                      <button className="w-full py-5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(147,51,234,0.3)] active:scale-[0.98] transition-transform">
                          Secure Consultation
                      </button>
                  </a>
                  <div className="mt-8 flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">System Ready for Deployment</span>
                  </div>
                  
                  <div className="h-12 w-full" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}