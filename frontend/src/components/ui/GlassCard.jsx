import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassCard - Apple-style glassmorphism card component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Enable hover effect (default: true)
 * @param {boolean} props.animated - Enable entrance animation (default: true)
 * @param {string} props.padding - Padding size: 'sm', 'md', 'lg', 'xl' (default: 'lg')
 * @param {function} props.onClick - Click handler
 */
export default function GlassCard({
  children,
  className = '',
  hover = true,
  animated = true,
  padding = 'lg',
  onClick
}) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const baseClasses = `
    bg-white/70 dark:bg-gray-800/70
    backdrop-blur-xl
    rounded-2xl
    shadow-2xl
    border border-white/20 dark:border-gray-700/20
    transition-all duration-300
    ${paddingClasses[padding]}
    ${hover ? 'hover:shadow-3xl hover:scale-[1.01] hover:bg-white/80 dark:hover:bg-gray-800/80' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] // Apple's ease curve
      }
    }
  };

  if (animated) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={baseClasses}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
}
