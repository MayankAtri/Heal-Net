import React, { useState } from 'react';

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
    <div>
      <label className="block text-sm font-bold text-gray-900 mb-3">
        Describe Your Symptoms
      </label>
      <textarea
        value={text}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Please describe your symptoms in detail. For example: 'I have a headache with sensitivity to light, nausea, and it started 2 hours ago...'"
        className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 resize-none ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
        rows={6}
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">
          Be as specific as possible for better recommendations
        </p>
        <p className={`text-xs font-medium ${
          text.length >= maxLength ? 'text-red-600' : 'text-gray-500'
        }`}>
          {text.length}/{maxLength}
        </p>
      </div>
    </div>
  );
};

export default CustomSymptomForm;
