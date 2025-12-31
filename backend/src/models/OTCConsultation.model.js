const mongoose = require('mongoose');

const otcConsultationSchema = new mongoose.Schema({
  // Symptom Information
  symptomType: {
    type: String,
    enum: [
      'headache',
      'fever',
      'cold_flu',
      'cough',
      'sore_throat',
      'body_ache',
      'stomach_ache',
      'nausea',
      'diarrhea',
      'allergies',
      'skin_rash',
      'acne',
      'indigestion',
      'constipation',
      'custom'
    ],
    required: true
  },

  customSymptoms: {
    type: String,
    default: ''
  },

  // AI-Generated Suggestions
  suggestions: {
    summary: String,  // Brief overview of the condition

    // Recommended OTC medicines
    medicines: [{
      name: String,              // Medicine name (generic or brand)
      activeIngredient: String,  // e.g., "Acetaminophen", "Ibuprofen"
      dosage: String,            // e.g., "500mg every 6 hours"
      frequency: String,         // e.g., "3 times daily"
      duration: String,          // e.g., "3-5 days", "Until symptoms improve"
      instructions: String,      // Which symptoms this medicine helps
      warnings: [String],        // Important warnings
      sideEffects: [String]      // Common side effects
    }],

    // Home remedies and self-care
    homeRemedies: [String],

    // When to see a doctor (red flags)
    whenToSeeDoctor: [String],

    // General recommendations
    generalAdvice: [String],

    // Strong medical disclaimer
    medicalDisclaimer: String
  },

  // Metadata
  processingStatus: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },

  errorMessage: String

}, {
  timestamps: true
});

// Index for faster queries
otcConsultationSchema.index({ symptomType: 1 });
otcConsultationSchema.index({ createdAt: -1 });
otcConsultationSchema.index({ processingStatus: 1 });

module.exports = mongoose.model('OTCConsultation', otcConsultationSchema);
