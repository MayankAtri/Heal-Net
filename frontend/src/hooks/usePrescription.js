import { useFileUpload } from './useFileUpload';
import { analyzePrescription } from '../api/prescriptionApi';

/**
 * Hook for prescription analysis
 * @returns {Object} Prescription upload state and methods
 */
export const usePrescription = () => {
  return useFileUpload(analyzePrescription);
};
