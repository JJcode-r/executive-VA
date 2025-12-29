"use client";

import React from "react";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUp, 
  ExternalLink,
  LucideIcon,
  Sparkles
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  Icon: LucideIcon;
  href: string;
  label: string;
}

const NAV_LINKS: FooterLink[] = [
  { label: "Home", href: "#" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Services", href: "#pillars" },
  { label: "Portfolio", href: "#portfolio" },
];

const SOCIAL_LINKS: SocialLink[] = [
  { Icon: Mail, href: "mailto:ebinabochamberlain@gmail.com", label: "Email" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#06030a] overflow-hidden text-white pt-10 pb-12 px-6 lg:px-16 block shrink-0 border-t border-white/5">
      
      {/* --- TOP BORDER INTERACTION AREA --- */}
      <div className="container mx-auto relative mb-20">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />
        
        <div className="relative flex justify-between items-center px-2">
          <div className="bg-[#06030a] pr-8 py-2">
            <h2 className="text-xl font-black tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d946ef]">
              EXEC<span className="text-white">VA</span>
            </h2>
          </div>

          <button 
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-4 bg-[#06030a] pl-8 py-2 text-white/20 hover:text-[#a855f7] transition-all duration-500"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] hidden sm:inline">Back to Top</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#a855f7] group-hover:bg-[#a855f7]/5 transition-all duration-500">
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            </div>
          </button>
        </div>
      </div>

      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* BRAND TEXT */}
          <div className="space-y-6">
            <p className="text-white/40 text-xs font-medium leading-relaxed max-w-xs">
              Architecting high-performance digital ecosystems for executives who value time as their primary currency.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/5 hover:border-[#a855f7]/50 hover:bg-[#a855f7]/10 transition-all duration-500 group"
                >
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-[#a855f7] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="space-y-6">
            <h3 className="text-[#a855f7] font-black text-[10px] tracking-[0.4em] uppercase">Navigation</h3>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs font-bold text-white/30 hover:text-white transition-all uppercase tracking-widest">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* PROMINENT CTA COLUMN */}
          <div className="lg:col-span-1">
            <div className="relative group p-6 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#a855f7]/30">
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#a855f7]/10 blur-2xl group-hover:bg-[#a855f7]/20 transition-all" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#a855f7]" />
                  <h3 className="text-white text-[10px] font-black uppercase tracking-widest">Growth Phase</h3>
                </div>
                <p className="text-white/40 text-[11px] leading-relaxed">
                  Ready to offload the operational weight? Secure your priority slot today.
                </p>
                <a 
                  href="#inquiry"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-[#a855f7] transition-colors"
                >
                  Start Briefing <ArrowUp className="w-3 h-3 rotate-45" />
                </a>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-6">
            <h3 className="text-[#a855f7] font-black text-[10px] tracking-[0.4em] uppercase">Connect</h3>
            <div className="space-y-4">
              <a href="mailto:ebinabochamberlain@gmail.com" className="block text-sm font-bold text-white hover:text-[#a855f7] transition-colors truncate">
                ebinabochamberlain@gmail.com
              </a>
              <div className="flex items-center gap-2 text-[#10b981] text-[10px] font-black uppercase tracking-[0.2em] pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                Accepting New Clients
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER BOTTOM --- */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
            &copy; {currentYear} EXEC VA. All rights reserved.
          </p>
          
          <a 
            href="https://globethedev.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 hover:text-[#a855f7] transition-all duration-500"
          >
            <span>Made by</span>
            <span className="text-white group-hover:text-white transition-colors underline underline-offset-4 decoration-white/5 group-hover:decoration-[#a855f7]/30">Globe the Dev</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
          </a>
        </div>
      </div>

      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#a855f7]/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}