const asyncHandler = require('../middleware/asyncHandler');
const {
  processConsultation,
  getConsultationById,
  getAllConsultations,
  getConsultationStats
} = require('../services/otcConsultation.service');

/**
 * @route   POST /api/otc/consult
 * @desc    Get OTC medicine suggestions for symptoms
 * @access  Public
 * @body    { symptomType: 'headache'|'fever'|...|'custom', customSymptoms?: 'description' }
 */
const getOTCSuggestions = asyncHandler(async (req, res) => {
  const { symptomType, customSymptoms, ageGroup = 'adult', ageLabel = 'Adult (18-59 years)' } = req.body;

  // Validate symptomType
  const validSymptomTypes = [
    'headache',
    'fever',
    'cold_flu',
    'cough',
    'sore_throat',
    'body_ache',
    'stomach_ache',
    'nausea',
    'diarrhea',
    'allergies',
    'skin_rash',
    'acne',
    'indigestion',
    'constipation',
    'custom'
  ];

  if (!symptomType) {
    return res.status(400).json({
      success: false,
      error: 'symptomType is required'
    });
  }

  if (!validSymptomTypes.includes(symptomType)) {
    return res.status(400).json({
      success: false,
      error: `Invalid symptomType. Must be one of: ${validSymptomTypes.join(', ')}`
    });
  }

  // If symptomType is 'custom', customSymptoms is required
  if (symptomType === 'custom' && (!customSymptoms || customSymptoms.trim() === '')) {
    return res.status(400).json({
      success: false,
      error: 'customSymptoms is required when symptomType is "custom"'
    });
  }

  // Get userId from optionalAuth middleware
  const userId = req.userId || null;

  // Validate ageGroup
  const validAgeGroups = ['infant', 'child', 'teen', 'adult', 'senior'];
  const validatedAgeGroup = validAgeGroups.includes(ageGroup) ? ageGroup : 'adult';

  // Process consultation
  const result = await processConsultation(symptomType, customSymptoms || '', userId, validatedAgeGroup, ageLabel);

  res.status(201).json({
    success: true,
    message: 'OTC medicine suggestions generated successfully',
    data: result
  });
});

/**
 * @route   GET /api/otc/:id
 * @desc    Get OTC consultation by ID
 * @access  Public
 */
const getConsultation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid consultation ID format'
    });
  }

  const consultation = await getConsultationById(id);

  res.status(200).json({
    success: true,
    data: consultation
  });
});

/**
 * @route   GET /api/otc
 * @desc    Get all OTC consultations with pagination
 * @access  Public
 * @query   page - Page number (default: 1)
 * @query   limit - Items per page (default: 10, max: 100)
 * @query   symptomType - Filter by symptom type
 * @query   processingStatus - Filter by status (processing, completed, failed)
 */
const listConsultations = asyncHandler(async (req, res) => {
  // Parse pagination parameters
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;

  // Validate pagination
  if (page < 1) {
    return res.status(400).json({
      success: false,
      error: 'Page number must be greater than 0'
    });
  }

  if (limit < 1 || limit > 100) {
    limit = 10; // Reset to default if invalid
  }

  // Build filters
  const filters = {};

  if (req.query.symptomType) {
    filters.symptomType = req.query.symptomType;
  }

  if (req.query.processingStatus) {
    const validStatuses = ['processing', 'completed', 'failed'];
    if (validStatuses.includes(req.query.processingStatus)) {
      filters.processingStatus = req.query.processingStatus;
    }
  }

  const result = await getAllConsultations(page, limit, filters);

  res.status(200).json({
    success: true,
    data: result.consultations,
    pagination: result.pagination,
    filters: result.filters
  });
});

/**
 * @route   GET /api/otc/stats/overview
 * @desc    Get OTC consultation statistics
 * @access  Public
 */
const getStatistics = asyncHandler(async (req, res) => {
  const stats = await getConsultationStats();

  res.status(200).json({
    success: true,
    data: stats
  });
});

module.exports = {
  getOTCSuggestions,
  getConsultation,
  listConsultations,
  getStatistics
};
