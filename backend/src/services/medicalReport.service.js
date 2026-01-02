const { detectReportType, analyzeReport } = require('./reportAnalysis.service');
const MedicalReport = require('../models/MedicalReport.model');
const { cleanupFile } = require('../utils/cleanupFiles');
const path = require('path');

/**
 * Process uploaded medical report image through the complete pipeline:
 * Upload → Type Detection → Gemini Vision Analysis → Database → Cleanup
 * @param {Object} file - Multer file object
 * @param {string} analysisDepth - Depth of analysis (simple, detailed, educational)
 * @param {String} userId - User ID (optional, null for guest users)
 * @returns {Promise<Object>} Processed medical report data
 */
const processUploadedReport = async (file, analysisDepth = 'simple', userId = null) => {
  let report = null;
  const filePath = file.path;

  try {
    console.log(`Processing medical report: ${file.originalname}`);

    // Step 1: Create report record with 'processing' status
    report = await MedicalReport.create({
      userId, // Attach user ID if logged in, null for guests
      reportType: 'other',  // Will be updated after detection
      analysisDepth: analysisDepth,
      analysis: {
        summary: '',
        generalRecommendations: [],
        warningFlags: [],
        educationalNotes: []
      },
      imageUrl: `/uploads/${file.filename}`,
      originalFilename: file.originalname,
      processingStatus: 'processing'
    });

    // Step 2: Auto-detect report type
    console.log('Step 1/3: Detecting report type with Gemini AI Vision...');
    const detection = await detectReportType(filePath);

    console.log(`Detected report type: ${detection.reportType} (${detection.reportSubtype})`);

    // Update report type and subtype
    report.reportType = detection.reportType;
    report.reportSubtype = detection.reportSubtype;
    await report.save();

    // Step 3: Analyze report with appropriate depth
    console.log(`Step 2/3: Analyzing ${detection.reportType} report with ${analysisDepth} depth...`);
    const analysisData = await analyzeReport(filePath, detection.reportType, analysisDepth);

    // Step 4: Update report in database
    console.log('Step 3/3: Saving analysis to database...');
    report.analysis = analysisData;
    report.processingStatus = 'completed';
    await report.save();

    // Step 5: Cleanup uploaded file
    await cleanupFile(filePath);

    console.log(`Medical report processed successfully: ${report._id}`);

    return {
      id: report._id,
      reportType: report.reportType,
      reportSubtype: report.reportSubtype,
      analysisDepth: report.analysisDepth,
      analysis: report.analysis,
      originalFilename: report.originalFilename,
      createdAt: report.createdAt
    };

  } catch (error) {
    console.error('Error processing medical report:', error.message);

    // Update report status to failed if it was created
    if (report) {
      report.processingStatus = 'failed';
      report.errorMessage = error.message;
      await report.save();
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
 * Get medical report by ID
 * @param {string} reportId - Medical report ID
 * @returns {Promise<Object>} Medical report data
 */
const getReportById = async (reportId) => {
  const report = await MedicalReport.findById(reportId);

  if (!report) {
    throw new Error('Medical report not found');
  }

  return report;
};

/**
 * Get all medical reports with pagination and optional filtering
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @param {Object} filters - Optional filters (reportType, analysisDepth, processingStatus)
 * @returns {Promise<Object>} Paginated medical reports
 */
const getAllReports = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;

  // Build query based on filters
  const query = {};

  if (filters.reportType) {
    query.reportType = filters.reportType;
  }

  if (filters.analysisDepth) {
    query.analysisDepth = filters.analysisDepth;
  }

  if (filters.processingStatus) {
    query.processingStatus = filters.processingStatus;
  }

  const [reports, total] = await Promise.all([
    MedicalReport.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v'),
    MedicalReport.countDocuments(query)
  ]);

  return {
    reports,
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
 * Get reports statistics
 * @returns {Promise<Object>} Statistics about reports
 */
const getReportStats = async () => {
  const [totalReports, byType, byDepth, byStatus] = await Promise.all([
    MedicalReport.countDocuments(),
    MedicalReport.aggregate([
      { $group: { _id: '$reportType', count: { $sum: 1 } } }
    ]),
    MedicalReport.aggregate([
      { $group: { _id: '$analysisDepth', count: { $sum: 1 } } }
    ]),
    MedicalReport.aggregate([
      { $group: { _id: '$processingStatus', count: { $sum: 1 } } }
    ])
  ]);

  return {
    total: totalReports,
    byType: byType.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {}),
    byDepth: byDepth.reduce((acc, item) => {
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
  processUploadedReport,
  getReportById,
  getAllReports,
  getReportStats
};
