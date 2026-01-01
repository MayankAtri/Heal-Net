import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  actions,
  className = '',
  padding = 'default'
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${paddingStyles[padding]} ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
