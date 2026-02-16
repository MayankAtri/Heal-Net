import React from 'react';

const SeveritySelector = ({ severity, onSeveritySelect, disabled }) => {
  const severityLevels = [
    { value: 1, label: 'Mild', description: 'Barely noticeable' },
    { value: 2, label: 'Minor', description: 'Noticeable but manageable' },
    { value: 3, label: 'Moderate', description: 'Uncomfortable' },
    { value: 4, label: 'Severe', description: 'Very uncomfortable' },
    { value: 5, label: 'Extreme', description: 'Unbearable' }
  ];

  return (
    <div>
      <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-wider">
        Severity (1-5)
      </label>
      <div className="grid grid-cols-5 gap-2">
        {severityLevels.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => onSeveritySelect(level.value)}
            disabled={disabled}
            className={`p-3 rounded-xl border text-center transition-all duration-200 ${
              severity === level.value
                ? 'border-emerald-500/50 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10'
                : 'border-stone-200/60 dark:border-stone-800/60 bg-white/50 dark:bg-dark-card/50 hover:border-stone-300 dark:hover:border-stone-700'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className={`text-xl font-bold mb-0.5 ${
              severity === level.value ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-900 dark:text-white'
            }`}>{level.value}</div>
            <div className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">{level.label}</div>
            <div className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">{level.description}</div>
          </button>
        ))}
      </div>

      <div className="mt-3 relative">
        <div className="h-1.5 bg-gradient-to-r from-emerald-300 via-amber-300 to-red-400 rounded-full opacity-60"></div>
        {severity && (
          <div
            className="absolute top-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-dark-card shadow-sm transform -translate-y-1 -translate-x-1.5 transition-all duration-200"
            style={{ left: `${((severity - 1) / 4) * 100}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default SeveritySelector;
