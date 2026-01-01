import React from 'react';
import { SYMPTOM_TYPES } from '../../utils/constants';

const SymptomSeverityList = ({ selectedSymptoms, severities, onSeverityChange, disabled }) => {
  const getSymptomLabel = (symptomValue) => {
    const symptom = SYMPTOM_TYPES.find(s => s.value === symptomValue);
    return symptom ? symptom.label : symptomValue;
  };

  const getSymptomIcon = (symptomValue) => {
    const symptom = SYMPTOM_TYPES.find(s => s.value === symptomValue);
    return symptom ? symptom.icon : '🏥';
  };

  const severityLevels = [
    { value: 1, label: 'Mild', color: 'bg-green-500' },
    { value: 2, label: 'Minor', color: 'bg-blue-500' },
    { value: 3, label: 'Moderate', color: 'bg-yellow-500' },
    { value: 4, label: 'Severe', color: 'bg-orange-500' },
    { value: 5, label: 'Extreme', color: 'bg-red-500' }
  ];

  return (
    <div>
      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4">
        Rate the severity of each symptom (1-5)
      </label>
      <div className="space-y-4">
        {selectedSymptoms.filter(s => s !== 'custom').map((symptomValue) => (
          <div key={symptomValue} className="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{getSymptomIcon(symptomValue)}</span>
              <span className="text-base font-bold text-gray-900 dark:text-white">{getSymptomLabel(symptomValue)}</span>
            </div>
            <div className="flex items-center space-x-2">
              {severityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => onSeverityChange(symptomValue, level.value)}
                  disabled={disabled}
                  className={`flex-1 py-2 px-3 rounded-lg border-2 text-center transition-all ${
                    severities[symptomValue] === level.value
                      ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-500/20 shadow-md ring-2 ring-primary-200 dark:ring-primary-500/50'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-600'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{level.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">{level.label}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomSeverityList;
