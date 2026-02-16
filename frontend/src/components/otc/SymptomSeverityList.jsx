import React from 'react';
import { motion } from 'framer-motion';
import { SYMPTOM_TYPES } from '../../utils/constants';

const SymptomSeverityList = ({ selectedSymptoms, severities, onSeverityChange, disabled }) => {
  const getSymptomLabel = (symptomValue) => {
    const symptom = SYMPTOM_TYPES.find(s => s.value === symptomValue);
    return symptom ? symptom.label : symptomValue;
  };

  const getSymptomIcon = (symptomValue) => {
    const symptom = SYMPTOM_TYPES.find(s => s.value === symptomValue);
    return symptom ? symptom.icon : '';
  };

  const severityLevels = [
    { value: 1, label: 'Mild' },
    { value: 2, label: 'Minor' },
    { value: 3, label: 'Moderate' },
    { value: 4, label: 'Severe' },
    { value: 5, label: 'Extreme' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-4 uppercase tracking-wider">
        Rate the severity of each symptom (1-5)
      </label>
      <div className="space-y-4">
        {selectedSymptoms.filter(s => s !== 'custom').map((symptomValue, index) => (
          <motion.div
            key={symptomValue}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm border border-stone-200/60 dark:border-stone-800/60 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className="text-3xl"
              >
                {getSymptomIcon(symptomValue)}
              </motion.span>
              <span className="text-base font-bold text-stone-900 dark:text-white">{getSymptomLabel(symptomValue)}</span>
            </div>
            <div className="flex items-center gap-2">
              {severityLevels.map((level, levelIndex) => {
                const isSelected = severities[symptomValue] === level.value;
                return (
                  <motion.button
                    key={level.value}
                    type="button"
                    onClick={() => onSeverityChange(symptomValue, level.value)}
                    disabled={disabled}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + levelIndex * 0.05 }}
                    whileHover={!disabled ? { scale: 1.1, y: -2 } : {}}
                    whileTap={!disabled ? { scale: 0.95 } : {}}
                    className={`flex-1 py-2.5 px-2 rounded-xl border text-center transition-all duration-300 ${
                      isSelected
                        ? 'border-emerald-500/50 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-md'
                        : 'border-stone-200/60 dark:border-stone-800/60 bg-white/50 dark:bg-dark-surface/50 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-sm'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className={`text-lg font-bold ${
                      isSelected
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-stone-900 dark:text-white'
                    }`}>
                      {level.value}
                    </div>
                    <div className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">{level.label}</div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SymptomSeverityList;
