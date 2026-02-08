import React from 'react';

const LoadingSpinner = ({
  size = 'md',
  message = 'Loading...',
  fullScreen = false
}) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizes[size]} border-2 border-stone-200 dark:border-stone-700 border-t-emerald-500 rounded-full animate-spin`} />
      {message && (
        <p className="mt-4 text-sm text-stone-500 dark:text-stone-400 text-center max-w-md">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
