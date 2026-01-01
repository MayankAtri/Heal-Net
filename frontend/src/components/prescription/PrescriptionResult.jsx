import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import MedicineCard from './MedicineCard';
import { formatDate } from '../../utils/formatters';

const PrescriptionResult = ({ result, onAnalyzeAnother }) => {
  const { simplifiedAnalysis, createdAt } = result;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prescription Analysis</h2>
          {createdAt && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Analyzed on {formatDate(createdAt)}
            </p>
          )}
        </div>
        <Button onClick={onAnalyzeAnother} variant="secondary">
          Analyze Another
        </Button>
      </div>

      {/* Medicines */}
      {simplifiedAnalysis?.medicines && simplifiedAnalysis.medicines.length > 0 && (
        <Card title="Prescribed Medicines" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {simplifiedAnalysis.medicines.map((medicine, index) => (
              <MedicineCard key={index} medicine={medicine} />
            ))}
          </div>
        </Card>
      )}

      {/* Warnings */}
      {simplifiedAnalysis?.warnings && simplifiedAnalysis.warnings.length > 0 && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">⚠️</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-3">
                Important Warnings
              </h3>
              <ul className="space-y-2">
                {simplifiedAnalysis.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                    <span className="text-yellow-900 dark:text-yellow-100">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Instructions */}
      {simplifiedAnalysis?.instructions && (
        <Card title="Instructions" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">📋</span>
            <div className="flex-1">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                {simplifiedAnalysis.instructions}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Contraindications */}
      {simplifiedAnalysis?.contraindications && simplifiedAnalysis.contraindications.length > 0 && (
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">🚫</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3">
                Contraindications & Drug Interactions
              </h3>
              <ul className="space-y-2">
                {simplifiedAnalysis.contraindications.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                    <span className="text-red-900 dark:text-red-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Medical Disclaimer */}
      <Card className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">ℹ️</span>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
              Medical Disclaimer
            </h3>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              This analysis is for informational purposes only and is not a substitute for
              professional medical advice, diagnosis, or treatment. Always follow your
              doctor's instructions and consult your healthcare provider or pharmacist if
              you have any questions about your prescription.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionResult;
