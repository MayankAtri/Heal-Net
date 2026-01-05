import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import DisposalGuidelines from '../components/disposal/DisposalGuidelines';
import DisposalLocations from '../components/disposal/DisposalLocations';
import AnimatedBackground from '../components/common/AnimatedBackground';

export default function DisposalPage() {
  const { darkMode } = useDarkMode();

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Optimized Animated Background */}
      <AnimatedBackground variant="emerald" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">♻️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Medicine Disposal Guide
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Safely dispose of unused or expired medications to protect the environment
            and prevent misuse. Find nearby disposal locations and learn proper disposal methods.
          </p>
        </motion.div>

        {/* Disposal Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12"
        >
          <DisposalGuidelines />
        </motion.div>

        {/* Nearby Disposal Locations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Find Nearby Disposal Locations
          </h2>
          <DisposalLocations />
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
            <p className="text-2xl mb-2">🚨</p>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              In Case of Poisoning Emergency
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Call your local poison control center or emergency services immediately
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
