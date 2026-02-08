import React, { memo } from 'react';

const AnimatedBackground = memo(({ variant = 'default' }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep Base */}
      <div className="absolute inset-0 bg-stone-50 dark:bg-[#0a0a0f] transition-colors duration-500" />

      {/* Subtle warm grain texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm ambient glow - top right */}
      <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-emerald-400/[0.07] dark:bg-emerald-500/[0.04] rounded-full blur-[120px] animate-blob-slow" />

      {/* Soft accent glow - bottom left */}
      <div className="absolute -bottom-[15%] -left-[10%] w-[600px] h-[600px] bg-amber-300/[0.06] dark:bg-amber-500/[0.03] rounded-full blur-[120px] animate-blob-slower animation-delay-2000" />

      {/* Very subtle center glow */}
      <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-stone-300/[0.08] dark:bg-stone-500/[0.02] rounded-full blur-[100px] animate-breathe" />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
