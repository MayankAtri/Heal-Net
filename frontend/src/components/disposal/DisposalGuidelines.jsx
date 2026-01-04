import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

export default function DisposalGuidelines({ medicines = [] }) {
  const generalGuidelines = [
    {
      icon: '🚫',
      title: 'Never Flush Medicines',
      description: 'Do not flush medications down the toilet or pour them down the drain unless specifically instructed on the label.',
      color: 'from-red-50/50 to-rose-50/50 dark:from-red-900/10 dark:to-rose-900/10'
    },
    {
      icon: '🗑️',
      title: 'Remove Personal Information',
      description: 'Scratch out all personal information on the prescription label before disposal to protect your privacy.',
      color: 'from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10'
    },
    {
      icon: '💊',
      title: 'Drug Take-Back Programs',
      description: 'The safest way to dispose of medicines is through authorized drug take-back programs at pharmacies or hospitals.',
      color: 'from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10'
    },
    {
      icon: '🏠',
      title: 'Household Disposal (Last Resort)',
      description: 'If no take-back program is available, mix medicines with undesirable substances (coffee grounds, dirt), seal in a container, and dispose in household trash.',
      color: 'from-amber-50/50 to-yellow-50/50 dark:from-amber-900/10 dark:to-yellow-900/10'
    }
  ];

  const specificTypes = [
    {
      type: 'Controlled Substances',
      icon: '⚠️',
      examples: 'Opioids, Sedatives, Stimulants',
      disposal: 'MUST be disposed through authorized take-back programs. Never throw in regular trash.',
      urgent: true
    },
    {
      type: 'Antibiotics',
      icon: '💉',
      examples: 'Penicillin, Amoxicillin, Ciprofloxacin',
      disposal: 'Return unused antibiotics to pharmacies. Do not keep partial courses.',
      urgent: false
    },
    {
      type: 'Liquid Medications',
      icon: '🧪',
      examples: 'Syrups, Suspensions, Eye/Ear Drops',
      disposal: 'Mix with absorbent material before sealing in a container. Do not pour down drain.',
      urgent: false
    },
    {
      type: 'Inhalers',
      icon: '💨',
      examples: 'Asthma inhalers, Nebulizers',
      disposal: 'Check with pharmacy for recycling programs. Some inhalers contain pressurized gas.',
      urgent: false
    },
    {
      type: 'Sharps & Needles',
      icon: '💉',
      examples: 'Insulin syringes, EpiPens, Lancets',
      disposal: 'Use FDA-approved sharps disposal containers. Never throw loose in trash.',
      urgent: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* General Guidelines */}
      <div>
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
          General Disposal Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {generalGuidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <GlassCard padding="lg" className={`bg-gradient-to-br ${guideline.color} h-full`}>
                <div className="flex items-start space-x-3">
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-3xl"
                  >
                    {guideline.icon}
                  </motion.span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {guideline.title}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {guideline.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Medicine-Specific Guidelines */}
      <div>
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
          Medicine-Specific Disposal Methods
        </h3>
        <div className="space-y-3">
          {specificTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, x: 4 }}
            >
              <GlassCard padding="md" className={`${
                type.urgent
                  ? 'border-2 border-red-500 dark:border-red-400'
                  : ''
              }`}>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {type.type}
                      </h4>
                      {type.urgent && (
                        <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full font-semibold">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Examples: {type.examples}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {type.disposal}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Environmental Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard padding="lg" className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">🌍</span>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Why Proper Disposal Matters
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>Prevents environmental contamination of water sources and soil</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>Protects children and pets from accidental poisoning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>Reduces risk of medicine misuse and addiction</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>Helps combat antibiotic resistance by preventing improper use</span>
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Medicine-Specific Recommendations (if medicines provided) */}
      {medicines && medicines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard padding="lg" className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10">
            <div className="flex items-start space-x-3">
              <span className="text-3xl">📋</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                  Your Prescribed Medicines
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Based on your prescription, here are the medicines you should dispose of properly:
                </p>
                <ul className="space-y-2">
                  {medicines.map((medicine, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>{medicine.name || medicine}</strong> - Take to pharmacy or authorized take-back location
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
