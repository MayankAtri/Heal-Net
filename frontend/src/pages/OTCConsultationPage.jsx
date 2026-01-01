import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOTC } from '../hooks/useOTC';
import SymptomSelector from '../components/otc/SymptomSelector';
import SymptomSeverityList from '../components/otc/SymptomSeverityList';
import CustomSymptomForm from '../components/otc/CustomSymptomForm';
import OTCResult from '../components/otc/OTCResult';
import ErrorAlert from '../components/common/ErrorAlert';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

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
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          OTC Medicine Consultation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Get AI-powered recommendations for over-the-counter medicines based on your symptoms,
          along with home remedies and guidance on when to seek professional care.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <ErrorAlert
          message={error}
          onDismiss={reset}
          className="mb-6"
        />
      )}

      {/* Main Content */}
      {!result ? (
        <form onSubmit={handleSubmit}>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="space-y-8">
              {/* Symptom Selector */}
              <SymptomSelector
                selectedSymptoms={selectedSymptoms}
                onSymptomToggle={handleSymptomToggle}
                disabled={loading}
              />

              {/* Severity List - Show for predefined symptoms */}
              {selectedSymptoms.length > 0 && !selectedSymptoms.includes('custom') && (
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <SymptomSeverityList
                    selectedSymptoms={selectedSymptoms}
                    severities={severities}
                    onSeverityChange={handleSeverityChange}
                    disabled={loading}
                  />
                </div>
              )}

              {/* Custom Symptom Form */}
              {selectedSymptoms.includes('custom') && (
                <div className="pt-6 border-t border-gray-200">
                  <CustomSymptomForm
                    onSymptomChange={handleCustomSymptomChange}
                    disabled={loading}
                  />
                </div>
              )}

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
                  className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 shadow-lg overflow-hidden relative"
                >
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="text-sm text-blue-800 dark:text-blue-200 text-center relative z-10">
                      <span className="font-semibold">Analyzing your symptoms...</span>
                      <br />
                      This may take 15-30 seconds while our AI prepares personalized recommendations.
                    </p>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 dark:via-blue-500/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              )}
            </div>
          </Card>
        </form>
      ) : (
        <OTCResult result={result} onConsultAnother={handleConsultAnother} />
      )}

      {/* Information Card */}
      {!result && !loading && (
        <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">How it works</h3>
            <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>
                  <strong>Select Symptoms:</strong> Choose one or more symptoms from common options, or describe custom symptoms in detail
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>
                  <strong>Rate Severity:</strong> Rate the severity (1-5) for each selected symptom
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>
                  <strong>Get Recommendations:</strong> AI analyzes all your symptoms and suggests appropriate OTC medicines, home remedies, and guidance
                </span>
              </li>
            </ol>

            <div className="mt-6 pt-4 border-t border-blue-300 dark:border-blue-600">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Remember:</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-medical dark:text-green-400">•</span>
                  <span>This is not a replacement for professional medical advice</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-medical dark:text-green-400">•</span>
                  <span>Always read medicine labels and follow dosage instructions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-medical dark:text-green-400">•</span>
                  <span>Consult a doctor if symptoms persist or worsen</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OTCConsultationPage;
