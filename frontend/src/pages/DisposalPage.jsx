import React from 'react';
import { motion } from 'framer-motion';
import DisposalGuidelines from '../components/disposal/DisposalGuidelines';
import DisposalLocations from '../components/disposal/DisposalLocations';
import AnimatedBackground from '../components/common/AnimatedBackground';

export default function DisposalPage() {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3 block">Safety</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white mb-4">
            Medicine Disposal Guide
          </h1>
          <p className="text-base text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            Safely dispose of unused or expired medications to protect the environment
            and prevent misuse.
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
          <h2 className="text-2xl font-display font-bold text-stone-900 dark:text-white mb-6">
            Find Nearby Locations
          </h2>
          <DisposalLocations />
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12"
        >
          <div className="p-6 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-200/30 dark:border-red-800/20 text-center">
            <svg className="w-6 h-6 text-red-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <h3 className="font-semibold text-stone-900 dark:text-white mb-1 text-sm">
              In Case of Poisoning Emergency
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Call your local poison control center or emergency services immediately
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
