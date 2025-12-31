import React from 'react';
import { STATUS_COLORS, STATUS_LABELS } from '../../utils/constants';

const Badge = ({
  status,
  label,
  className = ''
}) => {
  const displayText = label || STATUS_LABELS[status] || status;
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass} ${className}`}>
      {displayText}
    </span>
  );
};

export default Badge;
