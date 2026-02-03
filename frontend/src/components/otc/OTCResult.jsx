import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Button from '../common/Button';
import MedicineRecommendation from './MedicineRecommendation';
import Badge from '../common/Badge';
import Markdown from '../common/Markdown';
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

      {/* Medicine Recommendations */}
      {medicines.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <GlassCard padding="lg" className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 border-emerald-200/50 dark:border-emerald-700/50">
              <div className="flex items-start space-x-3 mb-4">
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
                  className="text-3xl"
                >
                  💊
                </motion.span>
                <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Recommended OTC Medicines
                </h3>
              </div>
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
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Home Remedies */}
      {homeRemedies.length > 0 && (
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
                  🏠
                </motion.span>
                <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Home Remedies
                </h3>
              </div>
              <ul className="space-y-3">
                {homeRemedies.map((remedy, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start space-x-3"
                  >
                    <motion.span
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="text-xl mt-1"
                    >
                      🌿
                    </motion.span>
                    <div className="flex-1"><Markdown>{remedy}</Markdown></div>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* General Advice */}
      {generalAdvice && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <GlassCard padding="lg" className="bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-900/10 dark:to-yellow-900/10 border-amber-200/50 dark:border-amber-700/50">
              <div className="flex items-start space-x-3">
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", delay: 0.3 }}
                  className="text-3xl"
                >
                  💡
                </motion.span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent mb-3">
                    General Advice
                  </h3>
                  <Markdown>{generalAdvice}</Markdown>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* When to See a Doctor */}
      {whenToSeeDoctor.length > 0 && (
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <GlassCard padding="lg" className="bg-gradient-to-br from-red-50/50 to-rose-50/50 dark:from-red-900/10 dark:to-rose-900/10 border-red-300/50 dark:border-red-700/50">
              <div className="flex items-start space-x-3">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 3, delay: 0.4 }}
                  className="text-3xl"
                >
                  🚨
                </motion.span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent mb-3">
                    Seek Medical Attention If:
                  </h3>
                  <ul className="space-y-2">
                    {whenToSeeDoctor.map((condition, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="flex items-start space-x-2"
                      >
                        <span className="text-red-600 dark:text-red-400 mt-1 font-bold">•</span>
                        <div className="flex-1 text-red-900 dark:text-red-100 font-medium"><Markdown>{condition}</Markdown></div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
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
          </GlassCard>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OTCResult;
