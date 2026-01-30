import { useState } from 'react';
import { consultOTC } from '../api/otcApi';

/**
 * Hook for OTC consultation
 * @returns {Object} OTC consultation state and methods
 */
export const useOTC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const consult = async (symptomType, customSymptoms = '', ageGroup = 'adult', ageLabel = 'Adult (18-59 years)') => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await consultOTC(symptomType, customSymptoms, ageGroup, ageLabel);
      // API client interceptor extracts response.data
      // Backend returns {success: true, data: {...}}, so extract the data property
      const data = response.data || response;
      setResult(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Consultation failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return {
    consult,
    loading,
    error,
    result,
    reset
  };
};
