import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYMPTOM_TYPES } from '../../utils/constants';

const SymptomSelector = ({ selectedSymptoms, onSymptomToggle, disabled }) => {
  const isSelected = (symptomValue) => selectedSymptoms.includes(symptomValue);

  return (
    <div>
      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4">
        Select Your Symptoms (you can select multiple)
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {SYMPTOM_TYPES.map((symptom, index) => {
          const selected = isSelected(symptom.value);
          return (
            <motion.button
              key={symptom.value}
              type="button"
              onClick={() => onSymptomToggle(symptom.value)}
              disabled={disabled}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={!disabled ? { scale: 1.05, y: -4 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                selected
                  ? 'border-blue-500 dark:border-emerald-400 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 shadow-xl'
                  : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:border-blue-300 dark:hover:border-emerald-600 hover:shadow-lg'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                animate={selected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4 }}
                className="text-3xl mb-2"
              >
                {symptom.icon}
              </motion.div>
              <div className={`text-sm font-semibold ${
                selected
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {symptom.label}
              </div>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {selectedSymptoms.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-gray-600 dark:text-gray-300 mt-4 font-medium"
          >
            Selected: {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SymptomSelector;
