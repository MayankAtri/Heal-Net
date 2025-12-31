const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const validateFile = require('../middleware/validateFile');
const {
  uploadAndAnalyze,
  getReport,
  listReports,
  getStatistics
} = require('../controllers/medicalReport.controller');

/**
 * Medical Report Routes
 * Base path: /api/reports
 */

// POST /api/reports/analyze?analysisDepth=simple
// Upload and analyze medical report
router.post(
  '/analyze',
  upload.single('report'),  // Field name must be 'report'
  validateFile,              // Validate file type and size
  uploadAndAnalyze           // Process and analyze
);

// GET /api/reports/stats/overview
// Get statistics (must be before /:id to avoid route conflicts)
router.get('/stats/overview', getStatistics);

// GET /api/reports/:id
// Get single medical report by ID
router.get('/:id', getReport);

// GET /api/reports
// Get all medical reports with pagination and filters
router.get('/', listReports);

module.exports = router;
