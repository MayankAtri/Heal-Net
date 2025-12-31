import apiClient from './client';

/**
 * Upload and analyze medical report image/PDF
 * @param {File} file - Medical report file (JPG/PNG/PDF)
 * @param {string} depth - Analysis depth: 'simple', 'detailed', or 'educational'
 * @returns {Promise} Analysis result
 */
export const analyzeReport = async (file, depth = 'simple') => {
  const formData = new FormData();
  formData.append('report', file);

  return apiClient.post(`/reports/analyze?analysisDepth=${depth}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

/**
 * Get medical report analysis by ID
 * @param {string} id - Report ID
 * @returns {Promise} Report data
 */
export const getReport = (id) => {
  return apiClient.get(`/reports/${id}`);
};

/**
 * List all medical reports with pagination and filters
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {Object} filters - Optional filters (reportType, analysisDepth, processingStatus)
 * @returns {Promise} Paginated reports
 */
export const listReports = (page = 1, limit = 10, filters = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });

  return apiClient.get(`/reports?${params.toString()}`);
};

/**
 * Get medical reports statistics
 * @returns {Promise} Statistics data
 */
export const getReportStats = () => {
  return apiClient.get('/reports/stats/overview');
};
