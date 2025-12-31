const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const validateFile = require('../middleware/validateFile');
const {
  uploadAndAnalyze,
  getPrescription,
  listPrescriptions
} = require('../controllers/prescription.controller');

/**
 * @route   POST /api/prescriptions/analyze
 * @desc    Upload and analyze prescription image
 */
router.post(
  '/analyze',
  upload.single('prescription'), // Multer middleware for file upload
  validateFile,                  // Validate file exists
  uploadAndAnalyze              // Controller handler
);

/**
 * @route   GET /api/prescriptions/:id
 * @desc    Get prescription by ID
 */
router.get('/:id', getPrescription);

/**
 * @route   GET /api/prescriptions
 * @desc    Get all prescriptions with pagination
 */
router.get('/', listPrescriptions);

module.exports = router;
