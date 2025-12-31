import { useState } from 'react';

/**
 * Custom hook for file upload with loading, error, and result states
 * @param {Function} uploadFn - API upload function
 * @returns {Object} Upload state and methods
 */
export const useFileUpload = (uploadFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const upload = async (...args) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await uploadFn(...args);
      // API client interceptor extracts response.data
      // Backend returns {success: true, data: {...}}, so extract the data property
      const data = response.data || response;
      setResult(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Upload failed. Please try again.';
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
    upload,
    loading,
    error,
    result,
    reset
  };
};
