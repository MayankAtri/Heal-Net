import React, { memo } from 'react';

// Optimized animated background using CSS animations instead of Framer Motion
// This reduces JavaScript overhead and improves performance
const AnimatedBackground = memo(({ variant = 'default' }) => {
  const gradients = {
    default: 'from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-teal-950',
    emerald: 'from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950',
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]}`}></div>

      {/* Animated gradient blobs using CSS animations - much more performant */}
      <div className="animate-blob-slow absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full blur-2xl"></div>
      <div className="animate-blob-slower absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-600/10 dark:to-teal-600/10 rounded-full blur-2xl animation-delay-2000"></div>
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
