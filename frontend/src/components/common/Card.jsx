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
    <div className={`bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-md border border-stone-200/60 dark:border-stone-800/60 transition-all duration-200 ${paddingStyles[padding]} ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{subtitle}</p>
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
