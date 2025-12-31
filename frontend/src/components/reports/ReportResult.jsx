import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import BloodTestResults from './BloodTestResults';
import RadiologyResults from './RadiologyResults';
import PathologyResults from './PathologyResults';
import ConditionCard from './ConditionCard';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatters';

const ReportResult = ({ result, onAnalyzeAnother }) => {
  // Extract data from the analysis object
  const {
    reportType,
    analysisDepth,
    analysis = {},
    createdAt
  } = result;

  // Map backend fields to component props
  const summary = analysis.summary;
  const bloodTestResults = analysis.bloodTestResults || [];
  const radiologyResults = analysis.radiologyFindings;
  const pathologyResults = analysis.pathologyFindings;
  const possibleConditions = analysis.possibleConditions || [];
  const warnings = analysis.warningFlags || [];
  const recommendations = analysis.generalRecommendations || [];

  const getReportTypeDisplay = (type) => {
    const types = {
      blood_test: '🩸 Blood Test',
      radiology: '🔬 Radiology',
      pathology: '🧬 Pathology'
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Report Analysis</h2>
          <div className="flex items-center space-x-3 mt-2">
            <Badge variant="primary">{getReportTypeDisplay(reportType)}</Badge>
            <Badge variant="secondary">
              {analysisDepth === 'simple' ? '🔍 Simple' : analysisDepth === 'detailed' ? '🔬 Detailed' : '📚 Educational'}
            </Badge>
            {createdAt && (
              <span className="text-sm text-gray-500">
                {formatDate(createdAt)}
              </span>
            )}
          </div>
        </div>
        <Button onClick={onAnalyzeAnother} variant="secondary">
          Analyze Another
        </Button>
      </div>

      {/* Summary */}
      {summary && (
        <Card title="Summary" className="bg-blue-50 border-blue-200">
          <p className="text-gray-800 whitespace-pre-line">{summary}</p>
        </Card>
      )}

      {/* Report-Type Specific Results */}
      {reportType === 'blood_test' && bloodTestResults && bloodTestResults.length > 0 && (
        <BloodTestResults results={bloodTestResults} />
      )}

      {reportType === 'radiology' && radiologyResults && (
        <RadiologyResults data={radiologyResults} />
      )}

      {reportType === 'pathology' && pathologyResults && (
        <PathologyResults data={pathologyResults} />
      )}

      {/* Possible Conditions */}
      {possibleConditions && possibleConditions.length > 0 && (
        <Card title="Possible Conditions" className="bg-purple-50 border-purple-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {possibleConditions.map((condition, index) => (
              <ConditionCard key={index} condition={condition} />
            ))}
          </div>
        </Card>
      )}

      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-300">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">⚠️</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">
                Important Warnings
              </h3>
              <ul className="space-y-2">
                {warnings.map((warning, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-yellow-900">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card title="Medical Recommendations" className="bg-green-50 border-green-200">
          <ul className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <span className="text-gray-800 flex-1">{recommendation}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Medical Disclaimer */}
      <Card className="bg-gray-50 border-gray-300">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">ℹ️</span>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              Medical Disclaimer
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              This analysis is AI-generated and for informational purposes only. It is not a
              substitute for professional medical advice, diagnosis, or treatment. Always consult
              your healthcare provider for interpretation of medical test results and appropriate
              medical care. Do not rely solely on this analysis for medical decisions.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportResult;
