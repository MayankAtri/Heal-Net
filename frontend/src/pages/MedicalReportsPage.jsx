import React from 'react';
import { useMedicalReport } from '../hooks/useMedicalReport';
import ReportUpload from '../components/reports/ReportUpload';
import ReportResult from '../components/reports/ReportResult';
import ErrorAlert from '../components/common/ErrorAlert';
import Card from '../components/common/Card';

const MedicalReportsPage = () => {
  const { analyze, loading, error, result, reset } = useMedicalReport();

  const handleUpload = async (file, depth) => {
    try {
      await analyze(file, depth);
    } catch (err) {
      // Error is already handled by the hook
      console.error('Upload failed:', err);
    }
  };

  const handleAnalyzeAnother = () => {
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Medical Reports Analysis
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Upload your medical reports (blood tests, radiology, pathology) to get AI-powered
          analysis with customizable depth - from simple explanations to detailed educational insights.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <ErrorAlert
          message={error}
          onDismiss={reset}
          className="mb-6"
        />
      )}

      {/* Main Content */}
      {!result ? (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <ReportUpload onUpload={handleUpload} loading={loading} />
        </Card>
      ) : (
        <ReportResult result={result} onAnalyzeAnother={handleAnalyzeAnother} />
      )}

      {/* Information Card */}
      {!result && !loading && (
        <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">How it works</h3>
            <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>
                  <strong>Choose Analysis Depth:</strong> Select simple for quick summaries, detailed for comprehensive analysis, or educational for learning-focused explanations
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>
                  <strong>Upload Report:</strong> Submit your blood test, radiology, or pathology report (supports images and PDFs)
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>
                  <strong>Get Analysis:</strong> AI extracts data, interprets results, identifies possible conditions, and provides recommendations
                </span>
              </li>
            </ol>

            <div className="mt-6 pt-4 border-t border-blue-300 dark:border-blue-600">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Supported Report Types:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🩸</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Blood Tests (CBC, lipid panel, etc.)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔬</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Radiology (X-ray, MRI, CT scans)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🧬</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Pathology (biopsy results)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MedicalReportsPage;
