import React from 'react';
import { motion } from 'framer-motion';

const HeroVisual = () => {
    return (
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            {/* Central Hub */}
            <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                <span className="text-6xl md:text-7xl">🩺</span>

                {/* Orbiting Elements */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-3xl border border-primary-500/30 dark:border-primary-400/30"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1 + i * 0.1, 1],
                        }}
                        transition={{
                            duration: 10 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2,
                        }}
                    />
                ))}
            </div>

            {/* Floating Cards */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 z-20"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        📊
                    </div>
                    <div>
                        <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                        <div className="h-2 w-12 bg-slate-100 dark:bg-slate-800 rounded" />
                    </div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 z-20"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                        ✅
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Analysis Complete</div>
                        <div className="text-[10px] text-slate-500">99.9% Accuracy</div>
                    </div>
                </div>
            </motion.div>

            {/* Connecting Lines (Svg) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
        </div>
    );
};

export default HeroVisual;
