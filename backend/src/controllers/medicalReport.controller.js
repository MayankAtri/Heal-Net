const asyncHandler = require('../middleware/asyncHandler');
const {
  processUploadedReport,
  getReportById,
  getAllReports,
  getReportStats
} = require('../services/medicalReport.service');

/**
 * @route   POST /api/reports/analyze?analysisDepth=simple
 * @desc    Upload and analyze medical report
 * @access  Public
 */
const uploadAndAnalyze = asyncHandler(async (req, res) => {
  // Validate file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No report image file provided. Please upload an image.'
    });
  }

  // Get analysis depth from query params (default: simple)
  const analysisDepth = req.query.analysisDepth || 'simple';

  // Validate analysis depth
  const validDepths = ['simple', 'detailed', 'educational'];
  if (!validDepths.includes(analysisDepth)) {
    return res.status(400).json({
      success: false,
      error: `Invalid analysis depth. Must be one of: ${validDepths.join(', ')}`
    });
  }

  // Process the report
  const result = await processUploadedReport(req.file, analysisDepth);

  res.status(201).json({
    success: true,
    message: 'Medical report analyzed successfully',
    data: result
  });
});

/**
 * @route   GET /api/reports/:id
 * @desc    Get medical report by ID
 * @access  Public
 */
const getReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid report ID format'
    });
  }

  const report = await getReportById(id);

  res.status(200).json({
    success: true,
    data: report
  });
});

/**
 * @route   GET /api/reports
 * @desc    Get all medical reports with pagination and filtering
 * @access  Public
 * @query   page - Page number (default: 1)
 * @query   limit - Items per page (default: 10, max: 100)
 * @query   reportType - Filter by report type (blood_test, radiology, pathology, other)
 * @query   analysisDepth - Filter by analysis depth (simple, detailed, educational)
 * @query   processingStatus - Filter by status (processing, completed, failed)
 */
const listReports = asyncHandler(async (req, res) => {
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

  if (req.query.reportType) {
    const validTypes = ['blood_test', 'radiology', 'pathology', 'other'];
    if (validTypes.includes(req.query.reportType)) {
      filters.reportType = req.query.reportType;
    }
  }

  if (req.query.analysisDepth) {
    const validDepths = ['simple', 'detailed', 'educational'];
    if (validDepths.includes(req.query.analysisDepth)) {
      filters.analysisDepth = req.query.analysisDepth;
    }
  }

  if (req.query.processingStatus) {
    const validStatuses = ['processing', 'completed', 'failed'];
    if (validStatuses.includes(req.query.processingStatus)) {
      filters.processingStatus = req.query.processingStatus;
    }
  }

  const result = await getAllReports(page, limit, filters);

  res.status(200).json({
    success: true,
    data: result.reports,
    pagination: result.pagination,
    filters: result.filters
  });
});

/**
 * @route   GET /api/reports/stats/overview
 * @desc    Get statistics about medical reports
 * @access  Public
 */
const getStatistics = asyncHandler(async (req, res) => {
  const stats = await getReportStats();

  res.status(200).json({
    success: true,
    data: stats
  });
});

module.exports = {
  uploadAndAnalyze,
  getReport,
  listReports,
  getStatistics
};
