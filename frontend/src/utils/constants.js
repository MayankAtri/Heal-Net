// Symptom types for OTC consultation
export const SYMPTOM_TYPES = [
  { value: 'headache', label: 'Headache', icon: '🤕' },
  { value: 'fever', label: 'Fever', icon: '🤒' },
  { value: 'cold_flu', label: 'Cold & Flu', icon: '🤧' },
  { value: 'cough', label: 'Cough', icon: '😷' },
  { value: 'sore_throat', label: 'Sore Throat', icon: '😖' },
  { value: 'body_ache', label: 'Body Ache', icon: '💪' },
  { value: 'stomach_ache', label: 'Stomach Ache', icon: '🤢' },
  { value: 'nausea', label: 'Nausea', icon: '🤮' },
  { value: 'diarrhea', label: 'Diarrhea', icon: '🚽' },
  { value: 'allergies', label: 'Allergies', icon: '🤧' },
  { value: 'skin_rash', label: 'Skin Rash', icon: '😣' },
  { value: 'acne', label: 'Acne', icon: '😔' },
  { value: 'indigestion', label: 'Indigestion', icon: '😫' },
  { value: 'constipation', label: 'Constipation', icon: '😖' },
  { value: 'custom', label: 'Custom Symptoms', icon: '✍️' },
];

// Analysis depth options for medical reports
export const ANALYSIS_DEPTHS = [
  {
    value: 'simple',
    label: 'Simple',
    description: 'Patient-friendly summary with key findings'
  },
  {
    value: 'detailed',
    label: 'Detailed',
    description: 'Comprehensive clinical analysis with all values'
  },
  {
    value: 'educational',
    label: 'Educational',
    description: 'Learn what tests mean and how your body works'
  }
];

// Processing status labels
export const STATUS_LABELS = {
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed'
};

// Status badge colors
export const STATUS_COLORS = {
  processing: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800'
};

// Blood test status colors
export const TEST_STATUS_COLORS = {
  normal: 'text-green-600',
  high: 'text-orange-600',
  low: 'text-orange-600',
  critical: 'text-red-600',
  abnormal: 'text-red-600'
};

// Report type labels
export const REPORT_TYPE_LABELS = {
  blood_test: 'Blood Test',
  radiology: 'Radiology',
  pathology: 'Pathology',
  other: 'Other'
};
