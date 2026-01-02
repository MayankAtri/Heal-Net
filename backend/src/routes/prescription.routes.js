const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const validateFile = require('../middleware/validateFile');
const { optionalAuth } = require('../middleware/auth');
const {
  uploadAndAnalyze,
  getPrescription,
  listPrescriptions
} = require('../controllers/prescription.controller');

/**
 * @route   POST /api/prescriptions/analyze
 * @desc    Upload and analyze prescription image
 * @access  Public (optionally authenticated)
 */
router.post(
  '/analyze',
  optionalAuth,                  // Optional auth - attaches user if logged in
  upload.single('prescription'), // Multer middleware for file upload
  validateFile,                  // Validate file exists
  uploadAndAnalyze              // Controller handler
);

/**
 * @route   GET /api/prescriptions/:id
 * @desc    Get prescription by ID
 * @access  Public
 */
router.get('/:id', getPrescription);

/**
 * @route   GET /api/prescriptions
 * @desc    Get all prescriptions with pagination
 * @access  Public
 */
router.get('/', listPrescriptions);

module.exports = router;
