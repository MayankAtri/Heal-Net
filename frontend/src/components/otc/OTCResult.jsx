import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import MedicineRecommendation from './MedicineRecommendation';
import Badge from '../common/Badge';
import { formatDate, formatSymptomType } from '../../utils/formatters';

const OTCResult = ({ result, onConsultAnother }) => {
  const {
    symptomType,
    customSymptoms,
    suggestions = {},
    createdAt
  } = result;

  const {
    summary,
    medicines = [],
    homeRemedies = [],
    whenToSeeDoctor = [],
    generalAdvice
  } = suggestions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">OTC Consultation Results</h2>
          <div className="flex items-center space-x-3 mt-2">
            <Badge variant="primary">
              {symptomType === 'custom' ? '📝 Custom Symptoms' : `🏥 ${formatSymptomType(symptomType)}`}
            </Badge>
            {createdAt && (
              <span className="text-sm text-gray-500">
                {formatDate(createdAt)}
              </span>
            )}
          </div>
          {customSymptoms && (
            <p className="text-sm text-gray-600 mt-2 italic">
              "{customSymptoms}"
            </p>
          )}
        </div>
        <Button onClick={onConsultAnother} variant="secondary">
          New Consultation
        </Button>
      </div>

      {/* Summary */}
      {summary && (
        <Card title="Summary" className="bg-blue-50 border-blue-200">
          <p className="text-gray-800 whitespace-pre-line">{summary}</p>
        </Card>
      )}

      {/* Medicine Recommendations */}
      {medicines.length > 0 && (
        <Card title="💊 Recommended OTC Medicines" className="bg-green-50 border-green-200">
          <div className="space-y-4">
            {medicines.map((medicine, index) => (
              <MedicineRecommendation key={index} medicine={medicine} index={index} />
            ))}
          </div>
        </Card>
      )}

      {/* Home Remedies */}
      {homeRemedies.length > 0 && (
        <Card title="🏠 Home Remedies" className="bg-purple-50 border-purple-200">
          <ul className="space-y-3">
            {homeRemedies.map((remedy, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-xl mt-1">🌿</span>
                <span className="text-gray-800 flex-1">{remedy}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* General Advice */}
      {generalAdvice && (
        <Card title="💡 General Advice" className="bg-yellow-50 border-yellow-200">
          <p className="text-gray-800 whitespace-pre-line">{generalAdvice}</p>
        </Card>
      )}

      {/* When to See a Doctor */}
      {whenToSeeDoctor.length > 0 && (
        <Card className="bg-red-50 border-red-300">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">🚨</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-3">
                Seek Medical Attention If:
              </h3>
              <ul className="space-y-2">
                {whenToSeeDoctor.map((condition, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-600 mt-1 font-bold">•</span>
                    <span className="text-red-900 font-medium">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Medical Disclaimer */}
      <Card className="bg-gray-50 border-gray-300">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">ℹ️</span>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              Important Disclaimer
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              This OTC consultation is for informational purposes only and is not a substitute for
              professional medical advice, diagnosis, or treatment. Always read medicine labels
              carefully and follow dosage instructions. If symptoms persist, worsen, or you have
              concerns about your health, please consult a healthcare professional. Do not exceed
              recommended doses or use medicines for longer than indicated without medical supervision.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OTCResult;
