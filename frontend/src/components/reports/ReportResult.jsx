import React from 'react';
import { motion } from 'framer-motion';
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
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card title="Summary" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{summary}</p>
            </Card>
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
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card title="Possible Conditions" className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700">
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
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700">
              <div className="flex items-start space-x-3">
                <span className="text-3xl">⚠️</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-3">
                    Important Warnings
                  </h3>
                  <ul className="space-y-2">
                    {warnings.map((warning, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                        <span className="text-yellow-900 dark:text-yellow-100">{warning}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card title="Medical Recommendations" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
              <ul className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <span className="text-2xl">✓</span>
                    <span className="text-gray-800 dark:text-gray-200 flex-1">{recommendation}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Medical Disclaimer */}
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">ℹ️</span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
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
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReportResult;
