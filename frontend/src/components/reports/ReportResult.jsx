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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Report Analysis</h2>
          <div className="flex items-center space-x-3 mt-2">
            <Badge variant="primary">{getReportTypeDisplay(reportType)}</Badge>
            <Badge variant="secondary">
              {analysisDepth === 'simple' ? '🔍 Simple' : analysisDepth === 'detailed' ? '🔬 Detailed' : '📚 Educational'}
            </Badge>
            {createdAt && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
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
            <GlassCard padding="lg" className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 border-blue-200/50 dark:border-blue-700/50">
              <div className="flex items-start space-x-3">
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-3xl"
                >
                  📋
                </motion.span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-3">
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
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
                  className="text-3xl"
                >
                  🔍
                </motion.span>
                <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
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
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 2, delay: 0.3 }}
                  className="text-3xl"
                >
                  ⚠️
                </motion.span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent mb-3">
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
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
                  className="text-3xl"
                >
                  💡
                </motion.span>
                <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
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
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl text-emerald-600 dark:text-emerald-400"
                    >
                      ✓
                    </motion.span>
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
          <GlassCard padding="lg" className="bg-gradient-to-br from-gray-50/50 to-slate-50/50 dark:from-gray-800/50 dark:to-slate-800/50 border-gray-300/50 dark:border-gray-600/50">
            <div className="flex items-start space-x-3">
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.5 }}
                className="text-2xl"
              >
                ℹ️
              </motion.span>
              <div className="flex-1">
                <h3 className="text-sm font-bold bg-gradient-to-r from-gray-700 to-slate-700 dark:from-gray-300 dark:to-slate-300 bg-clip-text text-transparent mb-2">
                  Medical Disclaimer
                </h3>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
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
