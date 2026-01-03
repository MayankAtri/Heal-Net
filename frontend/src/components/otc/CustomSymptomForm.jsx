import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CustomSymptomForm = ({ onSymptomChange, disabled }) => {
  const [text, setText] = useState('');
  const maxLength = 500;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setText(value);
      onSymptomChange(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.label
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="block text-sm font-bold text-gray-900 dark:text-white mb-3"
      >
        Describe Your Symptoms
      </motion.label>
      <motion.textarea
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        value={text}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Please describe your symptoms in detail. For example: 'I have a headache with sensitivity to light, nausea, and it started 2 hours ago...'"
        className={`w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-emerald-900/50 resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
          disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm'
        }`}
        rows={6}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex items-center justify-between mt-3"
      >
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <svg className="w-4 h-4 text-blue-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Be as specific as possible for better recommendations
        </p>
        <motion.p
          animate={text.length >= maxLength ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={`text-xs font-bold ${
            text.length >= maxLength ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {text.length}/{maxLength}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default CustomSymptomForm;
