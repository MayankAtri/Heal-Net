import React from 'react';

const ConditionCard = ({ condition }) => {
  const getLikelihoodColor = (likelihood) => {
    const lower = likelihood?.toLowerCase() || '';
    if (lower.includes('high') || lower.includes('likely')) {
      return 'bg-red-50 dark:bg-red-900/20 border-red-200/50 dark:border-red-800/30 text-red-700 dark:text-red-300';
    } else if (lower.includes('moderate') || lower.includes('possible')) {
      return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200/50 dark:border-amber-800/30 text-amber-700 dark:text-amber-300';
    } else if (lower.includes('low') || lower.includes('unlikely')) {
      return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-300';
    }
    return 'bg-stone-50 dark:bg-stone-800/50 border-stone-200/50 dark:border-stone-700/50 text-stone-600 dark:text-stone-300';
  };

  return (
    <div className="bg-white/60 dark:bg-dark-surface/60 border border-stone-200/60 dark:border-stone-800/60 rounded-xl p-5 hover:shadow-md hover:border-emerald-300/50 dark:hover:border-emerald-700/50 transition-all duration-200">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="text-base font-semibold text-stone-900 dark:text-white flex-1">{condition.conditionName}</h4>
          {condition.likelihood && (
            <span className={`ml-3 px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getLikelihoodColor(condition.likelihood)}`}>
              {condition.likelihood}
            </span>
          )}
        </div>

        {condition.reasoning && (
          <div>
            <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Reasoning</p>
            <p className="text-sm text-stone-600 dark:text-stone-300">{condition.reasoning}</p>
          </div>
        )}

        {condition.nextSteps && (
          <div>
            <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Next Steps</p>
            <p className="text-sm text-stone-600 dark:text-stone-300">{condition.nextSteps}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConditionCard;
