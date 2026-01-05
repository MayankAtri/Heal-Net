import React from 'react';
import { motion } from 'framer-motion';
import { useMedicalReport } from '../hooks/useMedicalReport';
import ReportUpload from '../components/reports/ReportUpload';
import ReportResult from '../components/reports/ReportResult';
import ErrorAlert from '../components/common/ErrorAlert';
import GlassCard from '../components/ui/GlassCard';
import AnimatedBackground from '../components/common/AnimatedBackground';

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
    <div className="relative min-h-screen">
      {/* Optimized Animated Background */}
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Medical Reports Analysis
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload your medical reports (blood tests, radiology, pathology) to get AI-powered
            analysis with customizable depth - from simple explanations to detailed educational insights.
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
              <ReportUpload onUpload={handleUpload} loading={loading} />
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ReportResult result={result} onAnalyzeAnother={handleAnalyzeAnother} />
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
                      <strong>Choose Analysis Depth:</strong> Select simple for quick summaries, detailed for comprehensive analysis, or educational for learning-focused explanations
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      2
                    </span>
                    <span>
                      <strong>Upload Report:</strong> Submit your blood test, radiology, or pathology report (supports images and PDFs)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      3
                    </span>
                    <span>
                      <strong>Get Analysis:</strong> AI extracts data, interprets results, identifies possible conditions, and provides recommendations
                    </span>
                  </li>
                </ol>

                <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Supported Report Types:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <span className="text-2xl">🩸</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Blood Tests</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <span className="text-2xl">🔬</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Radiology</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <span className="text-2xl">🧬</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Pathology</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MedicalReportsPage;
