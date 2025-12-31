import React from 'react';

const ConditionCard = ({ condition }) => {
  const getLikelihoodColor = (likelihood) => {
    const lower = likelihood?.toLowerCase() || '';
    if (lower.includes('high') || lower.includes('likely')) {
      return 'bg-red-100 border-red-300 text-red-800';
    } else if (lower.includes('moderate') || lower.includes('possible')) {
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    } else if (lower.includes('low') || lower.includes('unlikely')) {
      return 'bg-green-100 border-green-300 text-green-800';
    }
    return 'bg-gray-100 border-gray-300 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Condition Name & Likelihood */}
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-bold text-gray-900 flex-1">{condition.conditionName}</h4>
          {condition.likelihood && (
            <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold border ${getLikelihoodColor(condition.likelihood)}`}>
              {condition.likelihood}
            </span>
          )}
        </div>

        {/* Reasoning */}
        {condition.reasoning && (
          <div>
            <p className="text-xs font-bold text-gray-700 uppercase mb-1">Reasoning:</p>
            <p className="text-sm text-gray-700">{condition.reasoning}</p>
          </div>
        )}

        {/* Next Steps */}
        {condition.nextSteps && (
          <div>
            <p className="text-xs font-bold text-gray-700 uppercase mb-1">Next Steps:</p>
            <p className="text-sm text-gray-700">{condition.nextSteps}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConditionCard;
