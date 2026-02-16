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
    icon: '🔍',
    description: 'Patient-friendly summary with key findings'
  },
  {
    value: 'detailed',
    label: 'Detailed',
    icon: '🔬',
    description: 'Comprehensive clinical analysis with all values'
  },
  {
    value: 'educational',
    label: 'Educational',
    icon: '📚',
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
  processing: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
  completed: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
  failed: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
};

// Blood test status colors
export const TEST_STATUS_COLORS = {
  normal: 'text-emerald-600 dark:text-emerald-400',
  high: 'text-amber-600 dark:text-amber-400',
  low: 'text-amber-600 dark:text-amber-400',
  critical: 'text-red-600 dark:text-red-400',
  abnormal: 'text-red-600 dark:text-red-400',
  unknown: 'text-stone-500 dark:text-stone-400'
};

// Report type labels
export const REPORT_TYPE_LABELS = {
  blood_test: 'Blood Test',
  radiology: 'Radiology',
  pathology: 'Pathology',
  other: 'Other'
};
