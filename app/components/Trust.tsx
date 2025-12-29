"use client";

import { motion } from "framer-motion";
import { Shield, Lock, EyeOff, CheckCircle, FileText } from "lucide-react";

const securityFeatures = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "End-to-End Encryption",
    description: "All communications and data are handled using AES-256 protocols to prevent unauthorized access.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "MFA-Secured Access",
    description: "Sensitive platforms are secured with multi-factor authentication and encrypted vault management.",
  },
  {
    icon: <EyeOff className="w-6 h-6" />,
    title: "Zero-Trace Operations",
    description: "Strict NDA compliance with no data retention beyond project completion. Your secrets stay yours.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Compliance Ready",
    description: "Adhering to enterprise standards for global and sensitive data handling including GDPR guidelines.",
  }
];

export default function TrustSecurity() {
  return (
    <section className="bg-[#0d0617] py-24 lg:py-40 px-6 lg:px-16 border-t border-white/5 relative overflow-hidden">
      
      {/* ------------------ BACKGROUND AMBIENCE (Synced) ------------------ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Amethyst Glow */}
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full" />
        {/* Subtle Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#581c87_1px,transparent_1px)] [background-size:70px_70px] opacity-[0.08]" />
      </div>

      <div className="container mx-auto relative z-10">
        
        {/* --- LEFT-ALIGNED HEADER --- */}
        <div className="flex flex-col items-start text-left mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Shield className="w-4 h-4 text-[#a855f7]" />
            <span className="text-[#a855f7] font-black tracking-[0.4em] uppercase text-[10px]">
              Trust & Security
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-10"
          >
            Absolute Confidentiality. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#d946ef] to-[#f0abfc]">
              Enterprise-Grade Security.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-sm lg:text-base max-w-xl leading-relaxed font-medium"
          >
            Your data is your most valuable asset. I utilize secure, encrypted, and password-protected platforms to ensure your business intelligence remains private.
          </motion.p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {securityFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="relative group bg-white/[0.02] border border-white/5 rounded-2xl p-8 lg:p-10 hover:border-[#a855f7]/30 transition-all duration-500 hover:bg-white/[0.04]"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#9333ea]/10 rounded-full flex items-center justify-center text-[#a855f7] group-hover:scale-110 group-hover:bg-[#9333ea]/20 transition-all duration-500">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-white/40 text-sm lg:text-base leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[#a855f7]/60 font-bold text-[10px] uppercase tracking-[0.2em]">
                    <CheckCircle className="w-3 h-3" /> Protocol Verified
                  </div>
                </div>
              </div>
              
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9333ea]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM BADGE --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-full">
            <Lock className="w-4 h-4 text-[#a855f7]" />
            <span className="text-white/70 font-bold text-[10px] uppercase tracking-widest">
              NDA Protected • Secured Workflow
            </span>
          </div>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
            Privacy First Architecture
          </p>
        </motion.div>
      </div>
    </section>
  );
}