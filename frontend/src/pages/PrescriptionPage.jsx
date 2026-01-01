import React from 'react';
import { usePrescription } from '../hooks/usePrescription';
import PrescriptionUpload from '../components/prescription/PrescriptionUpload';
import PrescriptionResult from '../components/prescription/PrescriptionResult';
import ErrorAlert from '../components/common/ErrorAlert';
import Card from '../components/common/Card';

const PrescriptionPage = () => {
  const { upload, loading, error, result, reset } = usePrescription();

  const handleUpload = async (file) => {
    try {
      await upload(file);
    } catch (err) {
      // Error is already handled by the hook
      console.error('Upload failed:', err);
    }
  };

  const handleAnalyzeAnother = () => {
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Prescription Analysis
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Upload your prescription image to get AI-powered analysis of medicines,
          dosages, warnings, and instructions.
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
          <PrescriptionUpload onUpload={handleUpload} loading={loading} />
        </Card>
      ) : (
        <PrescriptionResult result={result} onAnalyzeAnother={handleAnalyzeAnother} />
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
                  <strong>Upload:</strong> Take a clear photo of your prescription or upload an existing image
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>
                  <strong>Analyze:</strong> Our AI extracts medicine names, dosages, and instructions
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>
                  <strong>Understand:</strong> Get clear information about your medications with warnings and contraindications
                </span>
              </li>
            </ol>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PrescriptionPage;
