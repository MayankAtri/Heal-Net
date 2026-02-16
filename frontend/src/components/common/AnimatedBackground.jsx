import React, { memo } from 'react';

const AnimatedBackground = memo(({ variant = 'default' }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#f8faf8] dark:bg-[#0a0a0f] transition-colors duration-500" />

      {/* Warm grain texture */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Emerald ambient glow - top right (stronger in light) */}
      <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-emerald-400/[0.12] dark:bg-emerald-500/[0.04] rounded-full blur-[120px] animate-blob-slow" />

      {/* Warm amber glow - bottom left (visible in light) */}
      <div className="absolute -bottom-[15%] -left-[10%] w-[600px] h-[600px] bg-amber-300/[0.10] dark:bg-amber-500/[0.03] rounded-full blur-[120px] animate-blob-slower animation-delay-2000" />

      {/* Emerald center wash (new - light mode presence) */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] bg-emerald-300/[0.06] dark:bg-emerald-500/[0.015] rounded-full blur-[150px] animate-breathe" />

      {/* Subtle teal accent - mid left */}
      <div className="absolute top-[60%] -left-[5%] w-[400px] h-[400px] bg-teal-300/[0.08] dark:bg-teal-500/[0.02] rounded-full blur-[100px] animate-blob-slow animation-delay-4000" />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
