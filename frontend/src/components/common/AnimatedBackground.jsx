import React, { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Optimized animated background using CSS keyframes for better performance
// This reduces main thread blocking caused by JS-driven animations
const AnimatedBackground = memo(({ variant = 'default' }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep Base Layer */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#0B1120] transition-colors duration-500" />

      {/* Grid Pattern with greatly reduced opacity for performance */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />

      {/* CSS-animated orbs (smoother & less CPU intensive) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob-slow" />

      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob-slower animation-delay-2000" />

      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob-slow animation-delay-4000" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
