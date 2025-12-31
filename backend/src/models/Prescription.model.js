const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  // OCR Results
  originalText: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },

  // AI Analysis
  simplifiedAnalysis: {
    medicines: [{
      name: { type: String, required: true },
      genericName: String,
      dosage: String,
      frequency: String,
      duration: String
    }],
    warnings: [String],
    instructions: String,
    contraindications: [String]
  },

  // File Information
  imageUrl: String,
  originalFilename: String,

  // Metadata
  processingStatus: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  errorMessage: String,

}, {
  timestamps: true  // Adds createdAt, updatedAt
});

// Indexes for better query performance
prescriptionSchema.index({ createdAt: -1 });
prescriptionSchema.index({ 'simplifiedAnalysis.medicines.name': 'text' });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
