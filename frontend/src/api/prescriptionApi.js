import apiClient from './client';

/**
 * Upload and analyze prescription image
 * @param {File} file - Prescription image file (JPG/PNG)
 * @returns {Promise} Analysis result
 */
export const analyzePrescription = async (file) => {
  const formData = new FormData();
  formData.append('prescription', file);

  return apiClient.post('/prescriptions/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

/**
 * Get prescription analysis by ID
 * @param {string} id - Prescription ID
 * @returns {Promise} Prescription data
 */
export const getPrescription = (id) => {
  return apiClient.get(`/prescriptions/${id}`);
};

/**
 * List all prescriptions with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise} Paginated prescriptions
 */
export const listPrescriptions = (page = 1, limit = 10) => {
  return apiClient.get(`/prescriptions?page=${page}&limit=${limit}`);
};
