import React from 'react';
import { STATUS_COLORS, STATUS_LABELS } from '../../utils/constants';

const Badge = ({
  status,
  label,
  variant,
  children,
  className = ''
}) => {
  const displayText = children || label || STATUS_LABELS[status] || status;
  const colorClass = STATUS_COLORS[status] || 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${colorClass} ${className}`}>
      {displayText}
    </span>
  );
};

export default Badge;
