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
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
        Describe Your Symptoms
      </label>
      <textarea
        value={text}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Please describe your symptoms in detail. For example: 'I have a headache with sensitivity to light, nausea, and it started 2 hours ago...'"
        className={`w-full px-4 py-3 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 transition-all duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 ${
          disabled ? 'bg-stone-100 dark:bg-dark-surface cursor-not-allowed' : 'bg-stone-50/50 dark:bg-dark-surface/50 backdrop-blur-sm'
        }`}
        rows={5}
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          Be as specific as possible for better recommendations
        </p>
        <p className={`text-xs font-medium ${
          text.length >= maxLength ? 'text-red-500' : 'text-stone-400 dark:text-stone-500'
        }`}>
          {text.length}/{maxLength}
        </p>
      </div>
    </motion.div>
  );
};

export default CustomSymptomForm;
