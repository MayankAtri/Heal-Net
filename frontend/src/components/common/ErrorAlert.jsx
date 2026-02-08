import React from 'react';

const ErrorAlert = ({
  message,
  onDismiss,
  className = ''
}) => {
  if (!message) return null;

  return (
    <div className={`bg-red-50/80 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30 p-4 rounded-xl ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              onClick={onDismiss}
              className="inline-flex text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-300 focus:outline-none"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
