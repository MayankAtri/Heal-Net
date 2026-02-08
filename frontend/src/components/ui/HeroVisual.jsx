import React from 'react';
import { motion } from 'framer-motion';

const HeroVisual = () => {
  return (
    <div className="relative w-full aspect-square max-w-[520px] flex items-center justify-center">
      {/* Outer breathing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-500/10 dark:border-emerald-400/10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute inset-[8%] rounded-full border border-emerald-500/15 dark:border-emerald-400/15"
        animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute inset-[16%] rounded-full border border-stone-300/30 dark:border-stone-600/30"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Central orb */}
      <motion.div
        className="relative z-10 w-36 h-36 md:w-44 md:h-44"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow behind orb */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 dark:from-emerald-400/20 dark:to-emerald-600/20 rounded-3xl blur-2xl" />

        {/* Orb body */}
        <div className="relative w-full h-full bg-white dark:bg-dark-card rounded-3xl shadow-2xl shadow-emerald-500/10 border border-stone-200/50 dark:border-stone-700/50 flex items-center justify-center overflow-hidden">
          {/* Gradient sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-stone-50 dark:from-emerald-900/20 dark:via-transparent dark:to-stone-900/20" />

          {/* Cross / Plus icon — medical symbol */}
          <svg className="relative w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
            <motion.path
              d="M40 12 L40 68 M12 40 L68 40"
              stroke="url(#crossGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            />
            <defs>
              <linearGradient id="crossGrad" x1="12" y1="12" x2="68" y2="68">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Floating metric card — top right */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[8%] right-[5%] bg-white/95 dark:bg-dark-card/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl shadow-stone-900/5 dark:shadow-black/20 border border-stone-100 dark:border-stone-800 z-20"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-stone-900 dark:text-stone-100 tracking-wide">Report Analyzed</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">3 key findings</div>
          </div>
        </div>
      </motion.div>

      {/* Floating metric card — bottom left */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute bottom-[12%] left-[2%] bg-white/95 dark:bg-dark-card/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl shadow-stone-900/5 dark:shadow-black/20 border border-stone-100 dark:border-stone-800 z-20"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-stone-900 dark:text-stone-100 tracking-wide">Prescription</div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">4 medicines found</div>
          </div>
        </div>
      </motion.div>

      {/* Decorative dots */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 42;
        const cx = 50 + Math.cos(angle) * radius;
        const cy = 50 + Math.sin(angle) * radius;
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/30 dark:bg-emerald-400/20"
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
            }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
};

export default HeroVisual;
