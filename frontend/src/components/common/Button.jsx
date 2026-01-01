import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  className = ''
}) => {
  const baseStyles = 'font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500',
    secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-white hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500 focus:ring-gray-400',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500',
    medical: 'bg-gradient-to-r from-medical to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-medical',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
      )}
      {loading ? 'Processing...' : children}
    </button>
  );
};

export default Button;
