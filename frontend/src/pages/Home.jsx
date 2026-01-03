import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import AppleButton from '../components/ui/AppleButton';

const Home = () => {
  const features = [
    {
      title: 'Prescription Analysis',
      description: 'Upload prescription images and get AI-powered analysis of medicines, dosages, and warnings.',
      icon: '💊',
      path: '/prescription',
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      borderGlow: 'group-hover:shadow-blue-500/50'
    },
    {
      title: 'Medical Reports',
      description: 'Analyze blood tests, X-rays, MRI scans, and pathology reports with customizable analysis depth.',
      icon: '📊',
      path: '/reports',
      gradient: 'from-emerald-500 via-green-600 to-teal-600',
      borderGlow: 'group-hover:shadow-green-500/50'
    },
    {
      title: 'OTC Consultation',
      description: 'Get over-the-counter medicine suggestions for common symptoms with safety information.',
      icon: '🏥',
      path: '/otc',
      gradient: 'from-purple-500 via-violet-600 to-purple-700',
      borderGlow: 'group-hover:shadow-purple-500/50'
    }
  ];

  const stats = [
    { number: '10k+', label: 'Analyses Completed', icon: '📈' },
    { number: '99.9%', label: 'Accuracy Rate', icon: '🎯' },
    { number: '24/7', label: 'Availability', icon: '⏰' },
    { number: '<1min', label: 'Avg Response Time', icon: '⚡' }
  ];

  const benefits = [
    { icon: '🔒', title: 'Secure & Private', description: 'Your medical data is encrypted and never shared' },
    { icon: '🤖', title: 'AI-Powered', description: 'Advanced machine learning trained on medical literature' },
    { icon: '📱', title: 'Easy to Use', description: 'Simple upload and instant results on any device' },
    { icon: '💰', title: 'Free to Use', description: 'Access all features without any hidden costs' }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-teal-950"></div>

        {/* Animated gradient blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 dark:from-emerald-600/20 dark:to-teal-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-teal-400/30 to-green-400/30 dark:from-teal-600/20 dark:to-green-600/20 rounded-full blur-3xl"
        />

        {/* Floating decorative elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-20 h-20 opacity-10 dark:opacity-5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
          </svg>
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/4 w-16 h-16 opacity-10 dark:opacity-5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-teal-600">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/3 w-24 h-24 opacity-10 dark:opacity-5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-emerald-600">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 space-y-12 pb-16">
        {/* Hero Section */}
        <div className="relative pt-8 pb-16 md:pt-12 md:pb-20 px-6">
          {/* Hero Content */}
          <div className="relative text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 dark:from-blue-500/30 dark:to-emerald-500/30 border border-blue-500/30 dark:border-emerald-500/30 rounded-full text-sm font-semibold text-blue-700 dark:text-emerald-300 backdrop-blur-sm">
              🚀 AI-Powered Medical Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-5 leading-tight"
          >
            <span className="text-gray-900 dark:text-white">Your Personal</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Medical AI Assistant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Instantly understand prescriptions, analyze medical reports, and get expert guidance on common health concerns—all powered by cutting-edge AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <Link to="/prescription">
              <AppleButton variant="primary" size="lg">
                Try Prescription Analysis →
              </AppleButton>
            </Link>
            <a href="#features">
              <AppleButton variant="secondary" size="lg">
                Learn More
              </AppleButton>
            </a>
          </motion.div>

          {/* Disclaimer Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl p-4 shadow-lg backdrop-blur-sm"
          >
            <p className="text-sm text-yellow-900 dark:text-yellow-200 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <strong>Medical Disclaimer:</strong> For informational purposes only. Always consult healthcare professionals for medical decisions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard padding="md" className="text-center hover:scale-105">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#007AFF] to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Section - Creative Asymmetric Layout */}
      <div id="features" className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-extrabold mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our AI-powered tools designed to help you understand your health better
          </p>
        </motion.div>

        {/* Large Feature Card (First) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <Link to={features[0].path} className="block group">
            <GlassCard padding="lg" className="hover:scale-[1.01] hover:shadow-3xl group">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#007AFF]/10 to-blue-500/10 border-2 border-[#007AFF]/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <div className="text-6xl md:text-7xl">
                    {features[0].icon}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-[#007AFF] to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                    {features[0].title}
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {features[0].description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#007AFF] dark:text-blue-400 font-bold group-hover:gap-4 transition-all duration-300">
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        </motion.div>

        {/* Two Smaller Cards Side by Side */}
        <div className="grid md:grid-cols-2 gap-4">
          {features.slice(1).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link to={feature.path} className="block group h-full">
                <GlassCard padding="lg" className="hover:scale-[1.02] h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-[#007AFF]/10 to-blue-500/10 border-2 border-[#007AFF]/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                      <div className="text-5xl">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-[#007AFF] to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-1 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-[#007AFF] dark:text-blue-400 font-bold text-sm group-hover:gap-4 transition-all duration-300">
                        Explore Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="px-6"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8">
          <span className="bg-gradient-to-r from-[#007AFF] to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Why Choose HealNet?
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard padding="md" className="hover:scale-105 h-full">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works - Enhanced with Connecting Lines */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mx-6"
      >
        <GlassCard padding="lg" hover={false}>
        <h2 className="text-3xl font-extrabold text-center mb-3">
          <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
            How It Works
          </span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-base mb-8 max-w-2xl mx-auto">
          Get accurate medical insights in three simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 transform translate-y-1/2 -z-0 rounded-full"></div>

          {[
            {
              step: '1',
              title: 'Upload or Describe',
              description: 'Upload medical documents or describe your symptoms in plain language',
              gradient: 'from-green-500 to-emerald-600',
              icon: '📤'
            },
            {
              step: '2',
              title: 'AI Analysis',
              description: 'Our advanced AI processes your input using medical knowledge databases',
              gradient: 'from-blue-500 to-cyan-600',
              icon: '🤖'
            },
            {
              step: '3',
              title: 'Get Insights',
              description: 'Receive clear, actionable insights and recommendations instantly',
              gradient: 'from-teal-500 to-emerald-600',
              icon: '✨'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative text-center group"
            >
              <div className={`bg-gradient-to-br ${item.gradient} text-white rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-extrabold shadow-2xl group-hover:shadow-teal-500/50 group-hover:scale-110 transition-all duration-500 relative z-10`}>
                {item.step}
              </div>
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
        </GlassCard>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 rounded-3xl shadow-2xl p-12 mx-6 text-center text-white"
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of users who trust HealNet for their medical information needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/prescription">
              <AppleButton variant="secondary" size="lg">
                Try Prescription Analysis
              </AppleButton>
            </Link>
            <Link to="/reports">
              <AppleButton variant="glass" size="lg" className="border-white/30 text-white dark:text-white hover:bg-white/20">
                Analyze Medical Reports
              </AppleButton>
            </Link>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Home;
