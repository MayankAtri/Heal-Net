import React from 'react';

const SeveritySelector = ({ severity, onSeveritySelect, disabled }) => {
  const severityLevels = [
    { value: 1, label: 'Mild', color: 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200', description: 'Barely noticeable' },
    { value: 2, label: 'Minor', color: 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200', description: 'Noticeable but manageable' },
    { value: 3, label: 'Moderate', color: 'bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200', description: 'Uncomfortable' },
    { value: 4, label: 'Severe', color: 'bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200', description: 'Very uncomfortable' },
    { value: 5, label: 'Extreme', color: 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200', description: 'Unbearable' }
  ];

  return (
    <div>
      <label className="block text-sm font-bold text-gray-900 mb-3">
        How severe is your symptom? (1-5)
      </label>
      <div className="grid grid-cols-5 gap-3">
        {severityLevels.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => onSeveritySelect(level.value)}
            disabled={disabled}
            className={`p-4 rounded-lg border-2 text-center transition-all ${
              severity === level.value
                ? 'border-primary-500 bg-primary-50 shadow-md ring-2 ring-primary-300'
                : level.color
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="text-3xl font-bold mb-1">{level.value}</div>
            <div className="text-xs font-bold uppercase">{level.label}</div>
            <div className="text-xs mt-1 opacity-80">{level.description}</div>
          </button>
        ))}
      </div>

      {/* Visual Scale Bar */}
      <div className="mt-4 relative">
        <div className="h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-400 rounded-full"></div>
        {severity && (
          <div
            className="absolute top-0 w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow-lg transform -translate-y-1 -translate-x-2 transition-all"
            style={{ left: `${((severity - 1) / 4) * 100}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default SeveritySelector;
