import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  animated = true,
  padding = 'lg',
  onClick,
  spotlight = true
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const baseClasses = cn(
    'relative overflow-hidden bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 group',
    paddingClasses[padding],
    hover && 'hover:shadow-2xl hover:-translate-y-1',
    onClick && 'cursor-pointer',
    className
  );

  const Content = (
    <>
      {spotlight && (
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(14, 165, 233, 0.15),
                transparent 80%
              )
            `,
          }}
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        />
      )}
      <div className="relative z-10">{children}</div>
    </>
  );

  if (animated) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={baseClasses}
        onClick={onClick}
        onMouseMove={handleMouseMove}
      >
        {Content}
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={baseClasses}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      {Content}
    </div>
  );
}
