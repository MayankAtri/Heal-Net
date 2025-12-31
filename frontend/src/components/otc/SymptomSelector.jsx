import React from 'react';
import { SYMPTOM_TYPES } from '../../utils/constants';

const SymptomSelector = ({ selectedSymptoms, onSymptomToggle, disabled }) => {
  const isSelected = (symptomValue) => selectedSymptoms.includes(symptomValue);

  return (
    <div>
      <label className="block text-sm font-bold text-gray-900 mb-4">
        Select Your Symptoms (you can select multiple)
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {SYMPTOM_TYPES.map((symptom) => {
          const selected = isSelected(symptom.value);
          return (
            <button
              key={symptom.value}
              type="button"
              onClick={() => onSymptomToggle(symptom.value)}
              disabled={disabled}
              className={`relative p-4 rounded-lg border-2 text-center transition-all ${
                selected
                  ? 'border-primary-500 bg-primary-50 shadow-md ring-2 ring-primary-300'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {selected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
              <div className="text-3xl mb-2">{symptom.icon}</div>
              <div className="text-sm font-semibold text-gray-900">{symptom.label}</div>
            </button>
          );
        })}
      </div>
      {selectedSymptoms.length > 0 && (
        <p className="text-sm text-gray-600 mt-3">
          Selected: {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default SymptomSelector;
