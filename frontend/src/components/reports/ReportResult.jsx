import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Button from '../common/Button';
import BloodTestResults from './BloodTestResults';
import RadiologyResults from './RadiologyResults';
import PathologyResults from './PathologyResults';
import ConditionCard from './ConditionCard';
import Badge from '../common/Badge';
import Markdown from '../common/Markdown';
import { formatDate } from '../../utils/formatters';

const ReportResult = ({ result, onAnalyzeAnother }) => {
  const {
    reportType,
    analysisDepth,
    analysis = {},
    createdAt
  } = result;

  const summary = analysis.summary;
  const bloodTestResults = analysis.bloodTestResults || [];
  const radiologyResults = analysis.radiologyFindings;
  const pathologyResults = analysis.pathologyFindings;
  const possibleConditions = analysis.possibleConditions || [];
  const warnings = analysis.warningFlags || [];
  const recommendations = analysis.generalRecommendations || [];

  const getReportTypeDisplay = (type) => {
    const types = {
      blood_test: 'Blood Test',
      radiology: 'Radiology',
      pathology: 'Pathology'
    };
    return types[type] || type;
  };

  const getDepthDisplay = (depth) => {
    const depths = {
      simple: 'Simple',
      detailed: 'Detailed',
      educational: 'Educational'
    };
    return depths[depth] || depth;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Medical Report Analysis</h2>
          <div className="flex items-center space-x-3 mt-2">
            <Badge variant="primary">{getReportTypeDisplay(reportType)}</Badge>
            <Badge variant="secondary">
              {getDepthDisplay(analysisDepth)}
            </Badge>
            {createdAt && (
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {formatDate(createdAt)}
              </span>
            )}
          </div>
        </div>
        <Button onClick={onAnalyzeAnother} variant="secondary">
          Analyze Another
        </Button>
      </motion.div>

      {/* Summary */}
      {summary && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <GlassCard padding="lg" className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 border-emerald-200/50 dark:border-emerald-700/50">
              <div className="flex items-start space-x-3">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-3">
                    Summary
                  </h3>
                  <Markdown>{summary}</Markdown>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Report-Type Specific Results */}
      {reportType === 'blood_test' && bloodTestResults && bloodTestResults.length > 0 && (
        <motion.div variants={itemVariants}>
          <BloodTestResults results={bloodTestResults} />
        </motion.div>
      )}

      {reportType === 'radiology' && radiologyResults && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <RadiologyResults data={radiologyResults} />
          </motion.div>
        </motion.div>
      )}

      {reportType === 'pathology' && pathologyResults && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <PathologyResults data={pathologyResults} />
          </motion.div>
        </motion.div>
      )}

      {/* Possible Conditions */}
      {possibleConditions && possibleConditions.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <GlassCard padding="lg" className="bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-teal-900/10 dark:to-emerald-900/10 border-teal-200/50 dark:border-teal-700/50">
              <div className="flex items-start space-x-3 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
                  className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </motion.div>
                <h3 className="text-lg font-bold text-teal-700 dark:text-teal-300">
                  Possible Conditions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {possibleConditions.map((condition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ConditionCard condition={condition} />
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <GlassCard padding="lg" className="bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-900/10 dark:to-yellow-900/10 border-amber-300/50 dark:border-amber-700/50">
              <div className="flex items-start space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 2, delay: 0.3 }}
                  className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-700 dark:text-amber-300 mb-3">
                    Important Warnings
                  </h3>
                  <ul className="space-y-2">
                    {warnings.map((warning, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="flex items-start space-x-2"
                      >
                        <span className="text-amber-600 dark:text-amber-400 mt-1 font-bold">•</span>
                        <div className="flex-1 text-amber-900 dark:text-amber-100"><Markdown>{warning}</Markdown></div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <GlassCard padding="lg" className="bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/10 dark:to-green-900/10 border-emerald-200/50 dark:border-emerald-700/50">
              <div className="flex items-start space-x-3 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
                  className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </motion.div>
                <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                  Medical Recommendations
                </h3>
              </div>
              <ul className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start space-x-3"
                  >
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <div className="flex-1"><Markdown>{recommendation}</Markdown></div>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Medical Disclaimer */}
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.01, y: -2 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <GlassCard padding="lg" className="bg-gradient-to-br from-stone-50/50 to-stone-100/50 dark:from-stone-800/30 dark:to-stone-900/30 border-stone-300/50 dark:border-stone-700/50">
            <div className="flex items-start space-x-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.5 }}
                className="w-8 h-8 rounded-lg bg-stone-200/50 dark:bg-stone-700/50 flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-4 h-4 text-stone-500 dark:text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Medical Disclaimer
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  This analysis is AI-generated and for informational purposes only. It is not a
                  substitute for professional medical advice, diagnosis, or treatment. Always consult
                  your healthcare provider for interpretation of medical test results and appropriate
                  medical care. Do not rely solely on this analysis for medical decisions.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReportResult;
