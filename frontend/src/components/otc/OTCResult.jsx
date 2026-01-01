import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import Button from '../common/Button';
import MedicineRecommendation from './MedicineRecommendation';
import Badge from '../common/Badge';
import { formatDate, formatSymptomType } from '../../utils/formatters';

const OTCResult = ({ result, onConsultAnother }) => {
  const {
    symptomType,
    customSymptoms,
    suggestions = {},
    createdAt
  } = result;

  const {
    summary,
    medicines = [],
    homeRemedies = [],
    whenToSeeDoctor = [],
    generalAdvice
  } = suggestions;

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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">OTC Consultation Results</h2>
          <div className="flex items-center space-x-3 mt-2">
            <Badge variant="primary">
              {symptomType === 'custom' ? '📝 Custom Symptoms' : `🏥 ${formatSymptomType(symptomType)}`}
            </Badge>
            {createdAt && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(createdAt)}
              </span>
            )}
          </div>
          {customSymptoms && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">
              "{customSymptoms}"
            </p>
          )}
        </div>
        <Button onClick={onConsultAnother} variant="secondary">
          New Consultation
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

      {/* Medicine Recommendations */}
      {medicines.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card title="💊 Recommended OTC Medicines" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
              <div className="space-y-4">
                {medicines.map((medicine, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <MedicineRecommendation medicine={medicine} index={index} />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Home Remedies */}
      {homeRemedies.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card title="🏠 Home Remedies" className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700">
              <ul className="space-y-3">
                {homeRemedies.map((remedy, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <span className="text-xl mt-1">🌿</span>
                    <span className="text-gray-800 dark:text-gray-200 flex-1">{remedy}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* General Advice */}
      {generalAdvice && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card title="💡 General Advice" className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{generalAdvice}</p>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* When to See a Doctor */}
      {whenToSeeDoctor.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700">
              <div className="flex items-start space-x-3">
                <span className="text-3xl">🚨</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3">
                    Seek Medical Attention If:
                  </h3>
                  <ul className="space-y-2">
                    {whenToSeeDoctor.map((condition, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <span className="text-red-600 dark:text-red-400 mt-1 font-bold">•</span>
                        <span className="text-red-900 dark:text-red-100 font-medium">{condition}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
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
                  Important Disclaimer
                </h3>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  This OTC consultation is for informational purposes only and is not a substitute for
                  professional medical advice, diagnosis, or treatment. Always read medicine labels
                  carefully and follow dosage instructions. If symptoms persist, worsen, or you have
                  concerns about your health, please consult a healthcare professional. Do not exceed
                  recommended doses or use medicines for longer than indicated without medical supervision.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OTCResult;
