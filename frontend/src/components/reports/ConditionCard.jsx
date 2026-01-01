import React from 'react';

const ConditionCard = ({ condition }) => {
  const getLikelihoodColor = (likelihood) => {
    const lower = likelihood?.toLowerCase() || '';
    if (lower.includes('high') || lower.includes('likely')) {
      return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200';
    } else if (lower.includes('moderate') || lower.includes('possible')) {
      return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200';
    } else if (lower.includes('low') || lower.includes('unlikely')) {
      return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200';
    }
    return 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Condition Name & Likelihood */}
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white flex-1">{condition.conditionName}</h4>
          {condition.likelihood && (
            <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold border ${getLikelihoodColor(condition.likelihood)}`}>
              {condition.likelihood}
            </span>
          )}
        </div>

        {/* Reasoning */}
        {condition.reasoning && (
          <div>
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Reasoning:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{condition.reasoning}</p>
          </div>
        )}

        {/* Next Steps */}
        {condition.nextSteps && (
          <div>
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Next Steps:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{condition.nextSteps}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConditionCard;
