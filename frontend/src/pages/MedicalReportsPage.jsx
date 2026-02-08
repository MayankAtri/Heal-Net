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
      console.error('Upload failed:', err);
    }
  };

  const handleAnalyzeAnother = () => {
    reset();
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3 block">Analysis</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white mb-3">
            Medical Reports
          </h1>
          <p className="text-base text-stone-500 dark:text-stone-400 max-w-lg">
            Upload your medical reports to get AI-powered analysis with customizable depth — from simple explanations to detailed educational insights.
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
              <ReportUpload onUpload={handleUpload} loading={loading} />
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ReportResult result={result} onAnalyzeAnother={handleAnalyzeAnother} />
          </motion.div>
        )}

        {/* Info Card */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <div className="p-7 rounded-2xl bg-emerald-50/40 dark:bg-emerald-900/10 border border-emerald-200/30 dark:border-emerald-800/20">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-4">How it works</h3>
              <ol className="space-y-3 text-sm text-stone-600 dark:text-stone-400 mb-6">
                {[
                  { num: '01', title: 'Choose Depth', desc: 'Select simple, detailed, or educational analysis' },
                  { num: '02', title: 'Upload Report', desc: 'Submit your blood test, radiology, or pathology report' },
                  { num: '03', title: 'Get Analysis', desc: 'AI interprets results, identifies conditions, and provides recommendations' },
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

              <div className="pt-5 border-t border-emerald-200/30 dark:border-emerald-800/20">
                <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">Supported report types</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { icon: <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" /></svg>, label: 'Blood Tests' },
                    { icon: <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>, label: 'Radiology' },
                    { icon: <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>, label: 'Pathology' },
                  ].map((type) => (
                    <div key={type.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/50 dark:bg-dark-card/50 border border-stone-200/40 dark:border-stone-800/40">
                      {type.icon}
                      <span className="text-sm text-stone-600 dark:text-stone-300 font-medium">{type.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MedicalReportsPage;
