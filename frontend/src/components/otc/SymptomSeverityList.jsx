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
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4">
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
            className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl p-5 shadow-md"
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
              <span className="text-base font-bold text-gray-900 dark:text-white">{getSymptomLabel(symptomValue)}</span>
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
                    className={`flex-1 py-2.5 px-2 rounded-xl border-2 text-center transition-all duration-300 ${
                      isSelected
                        ? 'border-blue-500 dark:border-emerald-400 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 shadow-lg'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-emerald-600 hover:shadow-md'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className={`text-lg font-bold ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {level.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{level.label}</div>
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
