const { analyzePrescriptionImage } = require('./gemini.service');
const Prescription = require('../models/Prescription.model');
const { cleanupFile } = require('../utils/cleanupFiles');
const path = require('path');

/**
 * Process uploaded prescription image through the complete pipeline:
 * Upload → Gemini Vision AI (OCR + Analysis) → Database → Cleanup
 * @param {Object} file - Multer file object
 * @param {String} userId - User ID (optional, null for guest users)
 * @returns {Promise<Object>} Processed prescription data
 */
const processUploadedPrescription = async (file, userId = null) => {
  let prescription = null;
  const filePath = file.path;

  try {
    console.log(`Processing prescription: ${file.originalname}`);

    // Step 1: Create prescription record with 'processing' status
    prescription = await Prescription.create({
      userId, // Attach user ID if logged in, null for guests
      originalText: '',
      simplifiedAnalysis: {
        medicines: [],
        warnings: [],
        instructions: '',
        contraindications: []
      },
      imageUrl: `/uploads/${file.filename}`,
      originalFilename: file.originalname,
      processingStatus: 'processing'
    });

    // Step 2: Analyze prescription image with Gemini Vision (does OCR + extraction in one step)
    console.log('Step 1/2: Analyzing prescription image with Gemini AI Vision...');
    const analysisData = await analyzePrescriptionImage(filePath);

    // Step 3: Update prescription in database
    console.log('Step 2/2: Saving to database...');
    prescription.originalText = 'Analyzed directly from image with Gemini Vision';
    prescription.simplifiedAnalysis = analysisData;
    prescription.processingStatus = 'completed';
    await prescription.save();

    // Step 5: Cleanup uploaded file
    await cleanupFile(filePath);

    console.log(`Prescription processed successfully: ${prescription._id}`);

    return {
      id: prescription._id,
      originalText: prescription.originalText,
      simplifiedAnalysis: prescription.simplifiedAnalysis,
      originalFilename: prescription.originalFilename,
      createdAt: prescription.createdAt
    };

  } catch (error) {
    console.error('Error processing prescription:', error.message);

    // Update prescription status to failed if it was created
    if (prescription) {
      prescription.processingStatus = 'failed';
      prescription.errorMessage = error.message;
      await prescription.save();
    }

    // Cleanup file even on error
    try {
      await cleanupFile(filePath);
    } catch (cleanupError) {
      console.error('Error cleaning up file:', cleanupError.message);
    }

    throw error;
  }
};

/**
 * Get prescription by ID
 * @param {string} prescriptionId - Prescription ID
 * @returns {Promise<Object>} Prescription data
 */
const getPrescriptionById = async (prescriptionId) => {
  const prescription = await Prescription.findById(prescriptionId);

  if (!prescription) {
    throw new Error('Prescription not found');
  }

  return prescription;
};

/**
 * Get all prescriptions with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<Object>} Paginated prescriptions
 */
const getAllPrescriptions = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [prescriptions, total] = await Promise.all([
    Prescription.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v'),
    Prescription.countDocuments()
  ]);

  return {
    prescriptions,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  processUploadedPrescription,
  getPrescriptionById,
  getAllPrescriptions
};
