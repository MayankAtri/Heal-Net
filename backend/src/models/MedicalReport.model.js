const mongoose = require('mongoose');

const medicalReportSchema = new mongoose.Schema({
  // Report Classification
  reportType: {
    type: String,
    enum: ['blood_test', 'radiology', 'pathology', 'other'],
    required: true,
    index: true
  },

  reportSubtype: {
    type: String,  // e.g., "CBC", "X-Ray", "MRI", "CT Scan", "Biopsy"
    trim: true
  },

  analysisDepth: {
    type: String,
    enum: ['simple', 'detailed', 'educational'],
    default: 'simple',
    required: true
  },

  // AI Analysis Results (polymorphic based on reportType)
  analysis: {
    summary: String,
    medicalDisclaimer: String,

    // For Blood Tests
    bloodTestResults: [{
      testName: String,
      value: String,
      unit: String,
      referenceRange: String,
      status: { type: String, enum: ['normal', 'high', 'low', 'critical', 'abnormal'] },
      interpretation: String
    }],

    // For Radiology Reports (X-Ray, MRI, CT, Ultrasound)
    radiologyFindings: {
      technique: String,
      findings: [String],
      impressions: String,
      recommendations: [String]
    },

    // For Pathology Reports (Biopsy, etc.)
    pathologyFindings: {
      specimenType: String,
      macroscopicDescription: String,
      microscopicDescription: String,
      diagnosis: String,
      comments: String,
      recommendations: [String]
    },

    // Common fields for all types
    generalRecommendations: [String],
    warningFlags: [String],
    educationalNotes: [String],  // Only populated for 'educational' depth

    // Possible conditions/diseases based on test patterns
    possibleConditions: [{
      conditionName: String,
      likelihood: String,  // "possible", "likely", "needs further testing"
      reasoning: String,   // Why this condition is suggested
      nextSteps: String    // What tests/actions to take
    }]
  },

  // File Information
  imageUrl: String,
  originalFilename: String,

  // User Reference (optional for guest users)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },

  // Metadata
  processingStatus: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },

  errorMessage: String

}, {
  timestamps: true  // Adds createdAt, updatedAt
});

// Indexes for better query performance
medicalReportSchema.index({ createdAt: -1 });
medicalReportSchema.index({ reportType: 1, createdAt: -1 });
medicalReportSchema.index({ processingStatus: 1 });

const MedicalReport = mongoose.model('MedicalReport', medicalReportSchema);

module.exports = MedicalReport;
