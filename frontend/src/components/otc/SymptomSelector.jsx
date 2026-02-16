import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYMPTOM_TYPES } from '../../utils/constants';

const SymptomSelector = ({ selectedSymptoms, onSymptomToggle, disabled }) => {
  const isSelected = (symptomValue) => selectedSymptoms.includes(symptomValue);

  return (
    <div>
      <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-wider">
        Select Your Symptoms (you can select multiple)
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {SYMPTOM_TYPES.map((symptom, index) => {
          const selected = isSelected(symptom.value);
          return (
            <motion.button
              key={symptom.value}
              type="button"
              onClick={() => onSymptomToggle(symptom.value)}
              disabled={disabled}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className={`relative p-3.5 rounded-xl border text-center transition-all duration-200 ${
                selected
                  ? 'border-emerald-500/50 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10'
                  : 'border-stone-200/60 dark:border-stone-800/60 bg-white/50 dark:bg-dark-card/50 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50/50 dark:hover:bg-dark-surface/50'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="text-2xl mb-1.5">{symptom.icon}</div>
              <div className={`text-xs font-medium ${
                selected ? 'text-emerald-700 dark:text-emerald-300' : 'text-stone-700 dark:text-stone-300'
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-xs text-stone-500 dark:text-stone-400 mt-3 font-medium"
          >
            Selected: {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SymptomSelector;
