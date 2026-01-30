import apiClient from './client';

/**
 * Get OTC medicine suggestions for symptoms
 * @param {string} symptomType - Symptom type (predefined or 'custom')
 * @param {string} customSymptoms - Custom symptom description (required if symptomType is 'custom')
 * @param {string} ageGroup - Age group (infant, child, teen, adult, senior)
 * @param {string} ageLabel - Human readable age label
 * @returns {Promise} OTC suggestions
 */
export const consultOTC = async (symptomType, customSymptoms = '', ageGroup = 'adult', ageLabel = 'Adult (18-59 years)') => {
  return apiClient.post('/otc/consult', {
    symptomType,
    customSymptoms,
    ageGroup,
    ageLabel
  });
};

/**
 * Get OTC consultation by ID
 * @param {string} id - Consultation ID
 * @returns {Promise} Consultation data
 */
export const getConsultation = (id) => {
  return apiClient.get(`/otc/${id}`);
};

/**
 * List all OTC consultations with pagination
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {Object} filters - Optional filters (symptomType, processingStatus)
 * @returns {Promise} Paginated consultations
 */
export const listConsultations = (page = 1, limit = 10, filters = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });

  return apiClient.get(`/otc?${params.toString()}`);
};

/**
 * Get OTC consultation statistics
 * @returns {Promise} Statistics data
 */
export const getOTCStats = () => {
  return apiClient.get('/otc/stats/overview');
};
