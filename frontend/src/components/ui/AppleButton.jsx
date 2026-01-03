import React from 'react';
import { motion } from 'framer-motion';

/**
 * AppleButton - Apple-style button component with glassmorphism
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'glass' (default: 'primary')
 * @param {string} props.size - Button size: 'sm', 'md', 'lg' (default: 'md')
 * @param {boolean} props.fullWidth - Full width button (default: false)
 * @param {boolean} props.disabled - Disabled state (default: false)
 * @param {boolean} props.loading - Loading state (default: false)
 * @param {function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Button type (default: 'button')
 */
export default function AppleButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button'
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: `
      bg-[#007AFF] hover:bg-[#0051D5]
      text-white
      shadow-lg shadow-blue-500/30
      hover:shadow-xl hover:shadow-blue-500/40
    `,
    secondary: `
      bg-white/70 dark:bg-gray-800/70
      backdrop-blur-xl
      text-gray-900 dark:text-white
      border border-gray-200/50 dark:border-gray-700/50
      hover:bg-white/90 dark:hover:bg-gray-800/90
      shadow-lg
      hover:shadow-xl
    `,
    glass: `
      bg-white/50 dark:bg-gray-800/50
      backdrop-blur-xl
      text-[#007AFF] dark:text-blue-400
      border border-white/20 dark:border-gray-700/20
      hover:bg-white/70 dark:hover:bg-gray-800/70
      shadow-lg
      hover:shadow-xl
    `
  };

  const baseClasses = `
    relative
    rounded-full
    font-medium
    transition-all duration-300
    transform
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.02 }
  };

  return (
    <motion.button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      variants={buttonVariants}
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}
