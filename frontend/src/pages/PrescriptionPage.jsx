import React from 'react';
import { motion } from 'framer-motion';
import { usePrescription } from '../hooks/usePrescription';
import PrescriptionUpload from '../components/prescription/PrescriptionUpload';
import PrescriptionResult from '../components/prescription/PrescriptionResult';
import ErrorAlert from '../components/common/ErrorAlert';
import GlassCard from '../components/ui/GlassCard';

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
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-teal-950"></div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-600/10 dark:to-teal-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Prescription Analysis
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload your prescription image to get AI-powered analysis of medicines,
            dosages, warnings, and instructions.
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ErrorAlert
              message={error}
              onDismiss={reset}
              className="mb-6"
            />
          </motion.div>
        )}

        {/* Main Content */}
        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard padding="lg">
              <PrescriptionUpload onUpload={handleUpload} loading={loading} />
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PrescriptionResult result={result} onAnalyzeAnother={handleAnalyzeAnother} />
          </motion.div>
        )}

        {/* Information Card */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <GlassCard padding="lg" className="bg-gradient-to-br from-blue-50/50 to-emerald-50/50 dark:from-blue-900/10 dark:to-emerald-900/10">
              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  How it works
                </h3>
                <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      1
                    </span>
                    <span>
                      <strong>Upload:</strong> Take a clear photo of your prescription or upload an existing image
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      2
                    </span>
                    <span>
                      <strong>Analyze:</strong> Our AI extracts medicine names, dosages, and instructions
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      3
                    </span>
                    <span>
                      <strong>Understand:</strong> Get clear information about your medications with warnings and contraindications
                    </span>
                  </li>
                </ol>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionPage;
