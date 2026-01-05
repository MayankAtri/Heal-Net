import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOTC } from '../hooks/useOTC';
import SymptomSelector from '../components/otc/SymptomSelector';
import SymptomSeverityList from '../components/otc/SymptomSeverityList';
import CustomSymptomForm from '../components/otc/CustomSymptomForm';
import OTCResult from '../components/otc/OTCResult';
import ErrorAlert from '../components/common/ErrorAlert';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/common/Button';
import AnimatedBackground from '../components/common/AnimatedBackground';

const OTCConsultationPage = () => {
  const { consult, loading, error, result, reset } = useOTC();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severities, setSeverities] = useState({});
  const [customSymptoms, setCustomSymptoms] = useState('');

  const handleSymptomToggle = (symptomValue) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomValue)) {
        // Remove symptom and its severity
        const newSymptoms = prev.filter(s => s !== symptomValue);
        const newSeverities = { ...severities };
        delete newSeverities[symptomValue];
        setSeverities(newSeverities);
        return newSymptoms;
      } else {
        // Add symptom
        // If custom is selected, clear other symptoms
        if (symptomValue === 'custom') {
          setSeverities({});
          return ['custom'];
        }
        // If other symptoms exist and custom is being added, clear custom
        const filteredSymptoms = prev.filter(s => s !== 'custom');
        return [...filteredSymptoms, symptomValue];
      }
    });
  };

  const handleSeverityChange = (symptomValue, level) => {
    setSeverities(prev => ({
      ...prev,
      [symptomValue]: level
    }));
  };

  const handleCustomSymptomChange = (text) => {
    setCustomSymptoms(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (selectedSymptoms.length === 0) {
      return;
    }

    // Check if custom symptoms
    if (selectedSymptoms.includes('custom')) {
      if (!customSymptoms.trim()) {
        return;
      }
      await consult('custom', customSymptoms);
      return;
    }

    // Check all symptoms have severity
    const hasAllSeverities = selectedSymptoms.every(symptom => severities[symptom]);
    if (!hasAllSeverities) {
      return;
    }

    try {
      // Build symptoms description with severities
      const symptomsWithSeverity = selectedSymptoms.map(symptom => {
        return `${symptom} (severity: ${severities[symptom]}/5)`;
      }).join(', ');

      // Use the first symptom as the primary symptom type
      await consult(selectedSymptoms[0], symptomsWithSeverity);
    } catch (err) {
      // Error is already handled by the hook
      console.error('Consultation failed:', err);
    }
  };

  const handleConsultAnother = () => {
    reset();
    setSelectedSymptoms([]);
    setSeverities({});
    setCustomSymptoms('');
  };

  return (
    <div className="relative min-h-screen">
      {/* Optimized Animated Background */}
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
              OTC Medicine Consultation
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get AI-powered recommendations for over-the-counter medicines based on your symptoms,
            along with home remedies and guidance on when to seek professional care.
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
            <form onSubmit={handleSubmit}>
              <GlassCard padding="lg">
            <div className="space-y-8">
              {/* Symptom Selector */}
              <SymptomSelector
                selectedSymptoms={selectedSymptoms}
                onSymptomToggle={handleSymptomToggle}
                disabled={loading}
              />

              {/* Severity List - Show for predefined symptoms */}
              <AnimatePresence mode="wait">
                {selectedSymptoms.length > 0 && !selectedSymptoms.includes('custom') && (
                  <motion.div
                    key="severity-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                  >
                    <SymptomSeverityList
                      selectedSymptoms={selectedSymptoms}
                      severities={severities}
                      onSeverityChange={handleSeverityChange}
                      disabled={loading}
                    />
                  </motion.div>
                )}

                {/* Custom Symptom Form */}
                {selectedSymptoms.includes('custom') && (
                  <motion.div
                    key="custom-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                  >
                    <CustomSymptomForm
                      onSymptomChange={handleCustomSymptomChange}
                      disabled={loading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              {selectedSymptoms.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={
                      selectedSymptoms.length === 0 ||
                      (selectedSymptoms.includes('custom') && !customSymptoms.trim()) ||
                      (!selectedSymptoms.includes('custom') && !selectedSymptoms.every(s => severities[s])) ||
                      loading
                    }
                    className="w-full"
                    size="lg"
                  >
                    {loading ? 'Getting Recommendations...' : 'Get OTC Recommendations'}
                  </Button>

                  {selectedSymptoms.length > 0 && !selectedSymptoms.includes('custom') &&
                   !selectedSymptoms.every(s => severities[s]) && (
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 text-center mt-3">
                      Please rate the severity for all selected symptoms
                    </p>
                  )}
                </div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border-2 border-blue-200 dark:border-emerald-700 rounded-2xl p-6 shadow-2xl overflow-hidden relative"
                >
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.01, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-3 border-blue-500 border-t-emerald-500 rounded-full"
                      />
                      <div className="text-3xl animate-pulse">
                        💊
                      </div>
                    </div>
                    <p className="text-sm font-bold bg-gradient-to-r from-blue-700 to-emerald-700 dark:from-blue-300 dark:to-emerald-300 bg-clip-text text-transparent text-center">
                      Analyzing your symptoms...
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
                      This may take 15-30 seconds while our AI prepares personalized recommendations
                    </p>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/30 dark:via-emerald-500/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              )}
            </div>
          </GlassCard>
        </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <OTCResult result={result} onConsultAnother={handleConsultAnother} />
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
                      <strong>Select Symptoms:</strong> Choose one or more symptoms from common options, or describe custom symptoms in detail
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      2
                    </span>
                    <span>
                      <strong>Rate Severity:</strong> Rate the severity (1-5) for each selected symptom
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      3
                    </span>
                    <span>
                      <strong>Get Recommendations:</strong> AI analyzes all your symptoms and suggests appropriate OTC medicines, home remedies, and guidance
                    </span>
                  </li>
                </ol>

                <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Remember:</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                      <span>This is not a replacement for professional medical advice</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                      <span>Always read medicine labels and follow dosage instructions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                      <span>Consult a doctor if symptoms persist or worsen</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OTCConsultationPage;
