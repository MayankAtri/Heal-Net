import { useState } from 'react';
import { analyzeReport } from '../api/medicalReportApi';

/**
 * Hook for medical report analysis with depth selection
 * @returns {Object} Report upload state and methods
 */
export const useMedicalReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const analyze = async (file, depth = 'simple') => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeReport(file, depth);
      // API client interceptor extracts response.data
      // Backend returns {success: true, data: {...}}, so extract the data property
      const data = response.data || response;
      setResult(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Analysis failed. Please try again.';
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
    analyze,
    loading,
    error,
    result,
    reset
  };
};
