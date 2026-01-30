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
      form: String,           // tablet, capsule, syrup, injection, cream, drops
      strength: String,       // 500mg, 250mg/5ml, etc.
      dosage: String,         // Practical: "1 tablet", "2 capsules", "5ml"
      frequency: String,      // twice daily, every 8 hours
      duration: String,       // 7 days, 2 weeks
      timing: String          // after meals, before bed, with food
    }],
    warnings: [String],
    instructions: String,
    contraindications: [String]
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
  errorMessage: String,

}, {
  timestamps: true  // Adds createdAt, updatedAt
});

// Indexes for better query performance
prescriptionSchema.index({ createdAt: -1 });
prescriptionSchema.index({ 'simplifiedAnalysis.medicines.name': 'text' });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
