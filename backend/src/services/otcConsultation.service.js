const { getOTCSuggestions } = require('./otcSuggestion.service');
const OTCConsultation = require('../models/OTCConsultation.model');

/**
 * Process OTC consultation request
 * @param {string} symptomType - Predefined symptom type or 'custom'
 * @param {string} customSymptoms - Custom symptom description (if symptomType is 'custom')
 * @param {String} userId - User ID (optional, null for guest users)
 * @param {string} ageGroup - Age group (infant, child, teen, adult, senior)
 * @param {string} ageLabel - Human readable age label
 * @returns {Promise<Object>} Processed consultation data
 */
const processConsultation = async (symptomType, customSymptoms = '', userId = null, ageGroup = 'adult', ageLabel = 'Adult (18-59 years)') => {
  let consultation = null;

  try {
    console.log(`Processing OTC consultation for: ${symptomType}`);

    // Step 1: Create consultation record with 'processing' status
    consultation = await OTCConsultation.create({
      userId, // Attach user ID if logged in, null for guests
      symptomType: symptomType,
      customSymptoms: customSymptoms,
      ageGroup: ageGroup,
      ageLabel: ageLabel,
      suggestions: {
        summary: '',
        medicines: [],
        homeRemedies: [],
        whenToSeeDoctor: [],
        generalAdvice: [],
        medicalDisclaimer: ''
      },
      processingStatus: 'processing'
    });

    // Step 2: Get OTC suggestions from Gemini AI
    console.log('Step 1/2: Getting OTC medicine suggestions from Gemini AI...');
    const suggestions = await getOTCSuggestions(symptomType, customSymptoms, ageGroup, ageLabel);

    // Step 3: Update consultation with suggestions
    console.log('Step 2/2: Saving suggestions to database...');
    consultation.suggestions = suggestions;
    consultation.processingStatus = 'completed';
    await consultation.save();

    console.log(`OTC consultation completed successfully: ${consultation._id}`);

    return {
      id: consultation._id,
      symptomType: consultation.symptomType,
      customSymptoms: consultation.customSymptoms,
      ageGroup: consultation.ageGroup,
      ageLabel: consultation.ageLabel,
      suggestions: consultation.suggestions,
      createdAt: consultation.createdAt
    };

  } catch (error) {
    console.error('Error processing OTC consultation:', error.message);

    // Update consultation status to failed if it was created
    if (consultation) {
      consultation.processingStatus = 'failed';
      consultation.errorMessage = error.message;
      await consultation.save();
    }

    throw error;
  }
};

/**
 * Get OTC consultation by ID
 * @param {string} consultationId - Consultation ID
 * @returns {Promise<Object>} Consultation data
 */
const getConsultationById = async (consultationId) => {
  const consultation = await OTCConsultation.findById(consultationId);

  if (!consultation) {
    throw new Error('OTC consultation not found');
  }

  return consultation;
};

/**
 * Get all OTC consultations with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @param {Object} filters - Optional filters (symptomType, processingStatus)
 * @returns {Promise<Object>} Paginated consultations
 */
const getAllConsultations = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;

  // Build query based on filters
  const query = {};

  if (filters.symptomType) {
    query.symptomType = filters.symptomType;
  }

  if (filters.processingStatus) {
    query.processingStatus = filters.processingStatus;
  }

  const [consultations, total] = await Promise.all([
    OTCConsultation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v'),
    OTCConsultation.countDocuments(query)
  ]);

  return {
    consultations,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    },
    filters: filters
  };
};

/**
 * Get consultation statistics
 * @returns {Promise<Object>} Statistics about consultations
 */
const getConsultationStats = async () => {
  const [totalConsultations, bySymptom, byStatus] = await Promise.all([
    OTCConsultation.countDocuments(),
    OTCConsultation.aggregate([
      { $group: { _id: '$symptomType', count: { $sum: 1 } } }
    ]),
    OTCConsultation.aggregate([
      { $group: { _id: '$processingStatus', count: { $sum: 1 } } }
    ])
  ]);

  return {
    total: totalConsultations,
    bySymptom: bySymptom.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {}),
    byStatus: byStatus.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {})
  };
};

module.exports = {
  processConsultation,
  getConsultationById,
  getAllConsultations,
  getConsultationStats
};
