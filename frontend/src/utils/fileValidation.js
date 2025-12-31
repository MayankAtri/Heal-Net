const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validate prescription file
 * @param {File} file - File to validate
 * @returns {Object} {valid: boolean, error: string}
 */
export const validatePrescriptionFile = (file) => {
  if (!file) {
    return { valid: false, error: 'Please select a file to upload' };
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPG and PNG images are allowed.'
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`
    };
  }

  return { valid: true };
};

/**
 * Validate medical report file (includes PDF)
 * @param {File} file - File to validate
 * @returns {Object} {valid: boolean, error: string}
 */
export const validateReportFile = (file) => {
  if (!file) {
    return { valid: false, error: 'Please select a file to upload' };
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPG, PNG images and PDF files are allowed.'
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`
    };
  }

  return { valid: true };
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size
 */
export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
