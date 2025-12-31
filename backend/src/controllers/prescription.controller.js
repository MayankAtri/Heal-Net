const asyncHandler = require('../middleware/asyncHandler');
const {
  processUploadedPrescription,
  getPrescriptionById,
  getAllPrescriptions
} = require('../services/prescription.service');

/**
 * @route   POST /api/prescriptions/analyze
 * @desc    Upload and analyze prescription image
 * @access  Public
 */
const uploadAndAnalyze = asyncHandler(async (req, res) => {
  const result = await processUploadedPrescription(req.file);

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * @route   GET /api/prescriptions/:id
 * @desc    Get prescription by ID
 * @access  Public
 */
const getPrescription = asyncHandler(async (req, res) => {
  const prescription = await getPrescriptionById(req.params.id);

  res.status(200).json({
    success: true,
    data: prescription
  });
});

/**
 * @route   GET /api/prescriptions
 * @desc    Get all prescriptions with pagination
 * @access  Public
 */
const listPrescriptions = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await getAllPrescriptions(page, limit);

  res.status(200).json({
    success: true,
    data: result.prescriptions,
    pagination: result.pagination
  });
});

module.exports = {
  uploadAndAnalyze,
  getPrescription,
  listPrescriptions
};
