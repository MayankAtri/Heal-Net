import React from 'react';
import { motion } from 'framer-motion';
import { usePrescription } from '../hooks/usePrescription';
import PrescriptionUpload from '../components/prescription/PrescriptionUpload';
import PrescriptionResult from '../components/prescription/PrescriptionResult';
import ErrorAlert from '../components/common/ErrorAlert';
import GlassCard from '../components/ui/GlassCard';
import AnimatedBackground from '../components/common/AnimatedBackground';

const PrescriptionPage = () => {
  const { upload, loading, error, result, reset } = usePrescription();

  const handleUpload = async (file) => {
    try {
      await upload(file);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleAnalyzeAnother = () => {
    reset();
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3 block">Analysis</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white mb-3">
            Prescription Analysis
          </h1>
          <p className="text-base text-stone-500 dark:text-stone-400 max-w-lg">
            Upload your prescription image to get AI-powered analysis of medicines,
            dosages, warnings, and instructions.
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ErrorAlert message={error} onDismiss={reset} className="mb-6" />
          </motion.div>
        )}

        {/* Main Content */}
        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <GlassCard padding="lg">
              <PrescriptionUpload onUpload={handleUpload} loading={loading} />
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PrescriptionResult result={result} onAnalyzeAnother={handleAnalyzeAnother} />
          </motion.div>
        )}

        {/* How it works */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <div className="p-7 rounded-2xl bg-emerald-50/40 dark:bg-emerald-900/10 border border-emerald-200/30 dark:border-emerald-800/20">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-4">How it works</h3>
              <ol className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                {[
                  { num: '01', title: 'Upload', desc: 'Take a clear photo of your prescription or upload an existing image' },
                  { num: '02', title: 'Analyze', desc: 'Our AI extracts medicine names, dosages, and instructions' },
                  { num: '03', title: 'Understand', desc: 'Get clear information about your medications with warnings and contraindications' },
                ].map((step) => (
                  <li key={step.num} className="flex items-start gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mt-0.5 w-6 flex-shrink-0">
                      {step.num}
                    </span>
                    <span>
                      <strong className="text-stone-900 dark:text-white">{step.title}:</strong> {step.desc}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionPage;
