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

const ageGroups = [
  { value: 'infant', label: 'Infant (0-2 years)', short: 'Infant', range: '0-2 yrs' },
  { value: 'child', label: 'Child (3-12 years)', short: 'Child', range: '3-12 yrs' },
  { value: 'teen', label: 'Teen (13-17 years)', short: 'Teen', range: '13-17 yrs' },
  { value: 'adult', label: 'Adult (18-59 years)', short: 'Adult', range: '18-59 yrs' },
  { value: 'senior', label: 'Senior (60+ years)', short: 'Senior', range: '60+ yrs' },
];

const OTCConsultationPage = () => {
  const { consult, loading, error, result, reset } = useOTC();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severities, setSeverities] = useState({});
  const [customSymptoms, setCustomSymptoms] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  const handleSymptomToggle = (symptomValue) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomValue)) {
        const newSymptoms = prev.filter(s => s !== symptomValue);
        const newSeverities = { ...severities };
        delete newSeverities[symptomValue];
        setSeverities(newSeverities);
        return newSymptoms;
      } else {
        if (symptomValue === 'custom') {
          setSeverities({});
          return ['custom'];
        }
        const filteredSymptoms = prev.filter(s => s !== 'custom');
        return [...filteredSymptoms, symptomValue];
      }
    });
  };

  const handleSeverityChange = (symptomValue, level) => {
    setSeverities(prev => ({ ...prev, [symptomValue]: level }));
  };

  const handleCustomSymptomChange = (text) => {
    setCustomSymptoms(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAge || selectedSymptoms.length === 0) return;

    const ageLabel = ageGroups.find(a => a.value === selectedAge)?.label || selectedAge;

    if (selectedSymptoms.includes('custom')) {
      if (!customSymptoms.trim()) return;
      await consult('custom', customSymptoms, selectedAge, ageLabel);
      return;
    }

    const hasAllSeverities = selectedSymptoms.every(symptom => severities[symptom]);
    if (!hasAllSeverities) return;

    try {
      const symptomsWithSeverity = selectedSymptoms.map(symptom => {
        return `${symptom} (severity: ${severities[symptom]}/5)`;
      }).join(', ');
      await consult(selectedSymptoms[0], symptomsWithSeverity, selectedAge, ageLabel);
    } catch (err) {
      console.error('Consultation failed:', err);
    }
  };

  const handleConsultAnother = () => {
    reset();
    setSelectedSymptoms([]);
    setSeverities({});
    setCustomSymptoms('');
    setSelectedAge('');
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3 block">Consultation</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white mb-3">
            OTC Medicine Consultation
          </h1>
          <p className="text-base text-stone-500 dark:text-stone-400 max-w-lg">
            Get AI-powered recommendations for over-the-counter medicines based on your symptoms.
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
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
            <form onSubmit={handleSubmit}>
              <GlassCard padding="lg">
                <div className="space-y-8">
                  {/* Age Group Selector */}
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-1">Select Age Group</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                      Age-appropriate medicine recommendations will be provided
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {ageGroups.map((age) => (
                        <button
                          key={age.value}
                          type="button"
                          onClick={() => setSelectedAge(age.value)}
                          disabled={loading}
                          className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                            selectedAge === age.value
                              ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-900/20'
                              : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-dark-surface'
                          } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span className={`text-sm font-medium block ${
                            selectedAge === age.value
                              ? 'text-emerald-700 dark:text-emerald-300'
                              : 'text-stone-700 dark:text-stone-300'
                          }`}>
                            {age.short}
                          </span>
                          <span className="text-[10px] text-stone-400 dark:text-stone-500 block mt-0.5">
                            {age.range}
                          </span>
                        </button>
                      ))}
                    </div>
                    {!selectedAge && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                        Please select an age group for accurate recommendations
                      </p>
                    )}
                  </div>

                  {/* Symptom Selector */}
                  <div className={`pt-6 border-t border-stone-200/50 dark:border-stone-700/50 ${!selectedAge ? 'opacity-50 pointer-events-none' : ''}`}>
                    <SymptomSelector
                      selectedSymptoms={selectedSymptoms}
                      onSymptomToggle={handleSymptomToggle}
                      disabled={loading || !selectedAge}
                    />
                  </div>

                  {/* Severity List */}
                  <AnimatePresence mode="wait">
                    {selectedSymptoms.length > 0 && !selectedSymptoms.includes('custom') && (
                      <motion.div
                        key="severity-list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-6 border-t border-stone-200/50 dark:border-stone-700/50"
                      >
                        <SymptomSeverityList
                          selectedSymptoms={selectedSymptoms}
                          severities={severities}
                          onSeverityChange={handleSeverityChange}
                          disabled={loading}
                        />
                      </motion.div>
                    )}

                    {selectedSymptoms.includes('custom') && (
                      <motion.div
                        key="custom-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-6 border-t border-stone-200/50 dark:border-stone-700/50"
                      >
                        <CustomSymptomForm
                          onSymptomChange={handleCustomSymptomChange}
                          disabled={loading}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  {selectedSymptoms.length > 0 && selectedAge && (
                    <div className="pt-6 border-t border-stone-200/50 dark:border-stone-700/50">
                      <Button
                        type="submit"
                        loading={loading}
                        disabled={
                          !selectedAge ||
                          selectedSymptoms.length === 0 ||
                          (selectedSymptoms.includes('custom') && !customSymptoms.trim()) ||
                          (!selectedSymptoms.includes('custom') && !selectedSymptoms.every(s => severities[s])) ||
                          loading
                        }
                        className="w-full"
                        size="lg"
                      >
                        {loading ? 'Getting Recommendations...' : `Get OTC Recommendations for ${ageGroups.find(a => a.value === selectedAge)?.short}`}
                      </Button>

                      {selectedSymptoms.length > 0 && !selectedSymptoms.includes('custom') &&
                       !selectedSymptoms.every(s => severities[s]) && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 text-center mt-3">
                          Please rate the severity for all selected symptoms
                        </p>
                      )}
                    </div>
                  )}

                  {loading && (
                    <div className="p-6 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200/30 dark:border-emerald-800/20">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                      <p className="text-sm font-medium text-stone-900 dark:text-white text-center">
                        Analyzing your symptoms...
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 text-center mt-1">
                        This may take 15-30 seconds
                      </p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <OTCResult result={result} onConsultAnother={handleConsultAnother} />
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
                  { num: '01', title: 'Select Symptoms', desc: 'Choose symptoms or describe custom ones' },
                  { num: '02', title: 'Rate Severity', desc: 'Rate 1-5 for each selected symptom' },
                  { num: '03', title: 'Get Recommendations', desc: 'AI suggests OTC medicines, home remedies, and guidance' },
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
                <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">Remember</h4>
                <ul className="space-y-1.5 text-sm text-stone-500 dark:text-stone-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-emerald-500"></span>
                    This is not a replacement for professional medical advice
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-emerald-500"></span>
                    Always read medicine labels and follow dosage instructions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-emerald-500"></span>
                    Consult a doctor if symptoms persist or worsen
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OTCConsultationPage;
